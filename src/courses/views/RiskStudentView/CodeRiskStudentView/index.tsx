//import { Button } from "@/components/ui/button";
//import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
//import { useParams } from "@tanstack/react-router"
import { Angry, Frown, Meh, Smile, Laugh }  from 'lucide-react';

//import { ArrowLeft, Settings, User } from 'lucide-react'
//import { useState } from "react";
//import { number, string } from "zod";

export default function CodeRiskStudent() {
    /*
    const mock ={
        id: 1,
        codigo: "20195903",
        nombres: "Ricardo Alonso",
        apellidos: "Alvarez Esparza ",
        curso: "Lenguaje de Programación 2",
        motivo: "Tercera", 
        ultimaPuntuacion: 12
    } */
    return (
        <div className="flex h-screen">
        {/* Sidebar */}
            <div className="w-64 border-r">               
                <div className="p-4">
                <div className="rounded-lg p-4 mb-4">
                    <div className="font-bold">1INF002</div>
                    <div className="text-sm">15 de septiembre del 2024</div>
                </div>
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="border-b py-4">
                    <div className="font-bold">1INF376</div>
                    <div className="text-sm">10 de agosto del 2024</div>
                    </div>
                ))}
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-8">
                <div className="max-w-3xl mx-auto rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Reporte de estado</h1>
                    <div className="text-sm text-gray-500">Actualizado al 15 de septiembre del 2024</div>
                </div>

                <div className="space-y-4">
                    <div>
                    <h2 className="text-lg font-semibold mb-2">Alumno</h2>
                    <div className="flex space-x-2">
                        <input className="border rounded px-2 py-1 w-24" value="20241246" readOnly />
                        <input className="border rounded px-2 py-1 flex-grow" value="Torres García, Ana María" readOnly />
                    </div>
                    </div>

                    <div>
                    <h2 className="text-lg font-semibold mb-2">Curso</h2>
                    <input className="border rounded px-2 py-1 w-full" value="Programación 3" readOnly />
                    </div>

                    <div>
                    <h2 className="text-lg font-semibold mb-2">Docente</h2>
                    <input className="border rounded px-2 py-1 w-full" value="López Hernández, Juan Manuel" readOnly />
                    </div>

                    <div className="flex justify-center space-x-4 my-6">
                        <Angry size={40} color="red" />
                        <Frown size={40}/>
                        <Meh size={40}/>
                        <Smile size={40}/>
                        <Laugh size={40}/>
                    </div>

                    <div>
                    <h2 className="text-lg font-semibold mb-2">Comentario</h2>
                    <textarea
                        className="border rounded px-2 py-1 w-full h-32"
                        value="La alumna presta atención y participa activamente en clase. Respecto a notas, ha mejorado en relación al ciclo anterior."
                        readOnly
                    />
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
  }