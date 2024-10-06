'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Pencil, Save, Trash, X } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import FAQCategoryService from '@/faq/services/faqCategory.service'
import { FAQCategory } from '@/faq/interfaces/FAQCategory'
import { QueryKeys } from '@/constants/queryKeys'
import useQueryStore from '@/hooks/useQueryStore'

export default function FAQCategoriesManagement() {
  const queryClient = useQueryClient()
  const { setQueryStore } = useQueryStore<FAQCategory[]>(
    QueryKeys.faq.FAQ_CATEGORIES
  )

  const [newCategoryField, setNewCategoryField] = useState('')

  // Queries
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QueryKeys.faq.FAQ_CATEGORIES],
    queryFn: FAQCategoryService.getFAQCategories,
  })

  // Mutations
  const createMutation = useMutation({
    mutationFn: FAQCategoryService.createFAQCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.faq.FAQ_CATEGORIES],
      }),
  })

  const updateMutation = useMutation({
    mutationFn: FAQCategoryService.updateFAQCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.faq.FAQ_CATEGORIES],
      }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => FAQCategoryService.deleteFAQCategory(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.faq.FAQ_CATEGORIES],
      }),
  })

  const handleAdd = () => {
    if (newCategoryField.trim()) {
      setQueryStore((prev) => [
        ...(prev || []),
        { id: 0, name: newCategoryField },
      ])
      createMutation.mutate(newCategoryField)
      setNewCategoryField('')
    }
  }

  const handleSave = (id: number, updatedName: string) => {
    if (updatedName.trim()) {
      setQueryStore((prev) =>
        prev?.map((category) =>
          category.id === id ? { ...category, name: updatedName } : category
        )
      )
      const updatedCategory = categories?.find((category) => category.id === id)
      if (updatedCategory) {
        updateMutation.mutate({
          ...updatedCategory,
          name: updatedName,
        })
      }
    }
  }

  const handleDelete = (id: number) => {
    setQueryStore((prev) => prev?.filter((category) => category.id !== id))
    deleteMutation.mutate(id)
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading categories.</p>

  return (
    <div className="container mx-auto p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead className="w-[70px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.length ? (
            categories?.map((category) => (
              <EditableCategoryRow
                key={category.id}
                category={category}
                onSave={handleSave}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                No se encontraron categorias
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="mt-4">
        <div className="flex space-x-2">
          <div className="flex-grow">
            <Label htmlFor="name">Nueva categoría</Label>
            <Input
              id="name"
              value={newCategoryField}
              onChange={(e) => setNewCategoryField(e.target.value)}
              placeholder="Ingrese el nombre de la categoría"
            />
          </div>
          <Button onClick={handleAdd} className="mt-6">
            Agregar
          </Button>
        </div>
      </div>
    </div>
  )
}

function EditableCategoryRow({
  category,
  onSave,
  onDelete,
}: {
  category: FAQCategory
  onSave: (id: number, name: string) => void
  onDelete: (id: number) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [categoryField, setCategoryField] = useState(category.name)

  const handleSave = () => {
    onSave(category.id, categoryField)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setCategoryField(category.name)
  }

  return (
    <TableRow key={category.id}>
      <TableCell>
        {isEditing ? (
          <Input
            value={categoryField}
            onChange={(e) => setCategoryField(e.target.value)}
          />
        ) : (
          category.name
        )}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isEditing ? (
              <>
                <DropdownMenuItem onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCancel}>
                  <X className="mr-2 h-4 w-4" />
                  Cancelar
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Trash className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Eliminar categoría
                      </DialogTitle>
                      <DialogDescription className="text-center">
                        Esta seguro de eliminar la categoría? Si lo hace, las
                        preguntas asociadas a esta categoría pasarán a{' '}
                        <span className="font-semibold">General</span>.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => {}}>
                        Cancelar
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => onDelete(category.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
