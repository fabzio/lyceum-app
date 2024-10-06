export const mails = [
  {
    id: '6c84fba0-12c4-11e1-840d-7b25c5ee775a',
    name: 'Estudio del agua de las localidades amazonicas afectadas por la minería ilegal',
    email: 'williamsmith@example.com',
    subject: 'N° 97345298',
    text: " Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
    date: '2023-10-22T09:00:00',
    read: true,
    labels: ['Esperando propuesta de jurados'],
  },
  {
    id: '110e840b-e29b-11d4-a716-446655440000',
    name: 'Algoritmo de busqueda de rutas optimas para el transporte publico',
    email: 'alicesmith@example.com',
    subject: 'N° 97345298',
    text: "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.\n\nI have a few minor suggestions that I'll include in the attached document.\n\nLet's discuss these during our next meeting. Keep up the excellent work!\n\nBest regards, Alice",
    date: '2023-10-22T10:30:00',
    read: true,
    labels: ['Esperando confirmacion de jurados'],
  },
  {
    id: '3e7c3f6d-bdfc-46ae-8d90-171300f27ae2',
    name: 'Implicaciones de la funcion de onda en la teoria cuantica',
    email: 'bobjohnson@example.com',
    subject: 'N° 97345298',
    text: "Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun.\n\nIf you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature.\n\nLooking forward to your response!\n\nBest, Bob",
    date: '2023-04-10T11:45:00',
    read: true,
    labels: ['Esperando confirmacion de jurados'],
  },
  {
    id: '61c35085-72d7-42bd-8d62-738f700d4b92',
    name: 'Creacion de un sistema de recomendacion de peliculas para cineastas aficionados',
    email: 'emilydavis@example.com',
    subject: 'N° 97345298',
    text: "I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources.\n\nI've reviewed the budget report and identified a few areas where we might be able to optimize our spending without compromising the project's quality.\n\nI've attached a detailed analysis for your reference. Let's discuss this further in our next meeting.\n\nThanks, Emily",
    date: '2023-03-25T13:15:00',
    read: false,
    labels: ['Aprobado'],
  },
]

export type Mail = (typeof mails)[number]
