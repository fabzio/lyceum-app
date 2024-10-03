import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useParams } from "@tanstack/react-router"
import { Angry, Frown, Meh, Smile, Laugh }  from 'lucide-react';
import { useState } from "react";

export default function CodeRiskStudent() {

    const { codigoAlumnoRiesgo } = useParams({strict: false});
    const [comentario, setComentario] = useState<string>('');
    //Acá se debería llamar a la API por la información
    //los cards deberían obtenerse dinámicamente y actualizar el contenido de la página
    return (
        <div className="flex flex-row justify-between my-6 p-2">
            <div className="w-1/3 ml-4 pr-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Fecha</CardTitle>
                        <CardDescription>9 de octubre</CardDescription>
                    </CardHeader>
                    <CardContent>
                        Puntaje 1
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Fecha</CardTitle>
                        <CardDescription>20 de agosto</CardDescription>
                    </CardHeader>
                    <CardContent>
                        Puntaje 5
                    </CardContent>
                </Card>
            </div>
            <div className="w-2/3">
                <h2 className="text-3xl font-bold">Reporte de estado</h2>
                <div className="border p-4 rounded shadow mt-4">
                    <h3 className="text-2xl font-semibold">Alumno</h3>
                    <p><strong>Código:</strong> {codigoAlumnoRiesgo}</p>
                    <p><strong>Nombre:</strong> nombre </p>

                    <h3 className="text-2xl font-semibold mt-4">Curso</h3>
                    <p>curso</p>

                    <h3 className="text-2xl font-semibold mt-4">Docente</h3>
                    <p>docente</p>

                    <h3 className="text-2xl font-semibold mt-4">Calificación</h3>
                    <div className = "flex justify-center">
                        <Angry size={50} color="red" />
                        <Frown size={50}/>
                        <Meh size={50}/>
                        <Smile size={50}/>
                        <Laugh size={50}/>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-semibold">Comentarios</h3>
                        <textarea
                            className="w-full h-24 p-2 border rounded shadow"
                            placeholder="Escribe tus comentarios aquí..."
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button className="mt-4">Solicitar actualización</Button>
                    </div>
                </div>
            </div>
        </div>
    );
  }