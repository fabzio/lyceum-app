import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import useCourseStore from '@/study-plans/store/courseManagement/course.store';
import { Course } from '../interfaces/Course';

export default function CourseModal() {
  const { openModal, toggleModal, addCourse, updateCourse, editingCourse, setEditingCourse } = useCourseStore();
  const [courseData, setCourseData] = useState<Course>({
    id: '',
    code: '',
    name: '',
    credits: 0,
  });

  useEffect(() => {
    if (editingCourse) {
      setCourseData(editingCourse);
    } else {
      setCourseData({ id: '', code: '', name: '', credits: 0 });
    }
  }, [editingCourse]);

  const handleSave = () => {
    if (courseData.id) {
      updateCourse(courseData);
    } else {
      addCourse({ ...courseData, id: Date.now().toString() });
    }
    toggleModal();
    setEditingCourse(null);
  };

  return (
    <Dialog open={openModal} onOpenChange={toggleModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editingCourse ? 'Editar curso' : 'Agregar curso'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">Código</Label>
            <Input id="code" value={courseData.code} onChange={(e) => setCourseData({ ...courseData, code: e.target.value })} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Nombre</Label>
            <Input id="name" value={courseData.name} onChange={(e) => setCourseData({ ...courseData, name: e.target.value })} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="credits" className="text-right">Créditos</Label>
            <Input id="credits" type="number" value={courseData.credits.toString()} onChange={(e) => setCourseData({ ...courseData, credits: parseFloat(e.target.value) })} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
