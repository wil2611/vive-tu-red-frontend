export interface EpisodeSection {
  heading: string;
  content: string;
}

export interface Episode {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  sections: EpisodeSection[];
}

export const episodes: Episode[] = [
  {
    id: 1,
    title: "Episodio 1 - El comienzo",
    subtitle: "Descubriendo las redes invisibles",
    color: "#C96A4A",
    sections: [
      {
        heading: "Capítulo 1: La llegada",
        content:
          "El contenido del primer capítulo se cargará aquí. Este espacio esta reservado para el texto narrativo del cuento de ficción #ViveTuRed, diseñado para sensibilizar a la comunidad universitaria sobre la importancia de las redes de apoyo.",
      },
      {
        heading: "Capítulo 2: Primeros lazos",
        content:
          "El contenido del segundo capítulo se cargará aquí. A través de la narrativa, se exploran las primeras conexiones y vínculos que se forman en el entorno universitario.",
      },
    ],
  },
  {
    id: 2,
    title: "Episodio 2 - La red",
    subtitle: "Tejiendo vínculos de protección",
    color: "#00555A",
    sections: [
      {
        heading: "Capítulo 3: Hilos que conectan",
        content:
          "Contenido del tercer capítulo. Se profundiza en la importancia de reconocer las redes de apoyo y cómo estas pueden activarse en momentos de necesidad.",
      },
      {
        heading: "Capítulo 4: Nudos y fortalezas",
        content:
          "Contenido del cuarto capítulo. Se exploran los desafíos y la resiliencia que surge al fortalecer los vínculos personales e institucionales.",
      },
    ],
  },
  {
    id: 3,
    title: "Episodio 3 - La acción",
    subtitle: "Activando las redes de apoyo",
    color: "#DCA15D",
    sections: [
      {
        heading: "Capítulo 5: Voces que acompañan",
        content:
          "Contenido del quinto capítulo. La narrativa se enfoca en las voces de apoyo y las instituciones que acompañan los procesos de prevención y atención.",
      },
      {
        heading: "Capítulo 6: Vivir la red",
        content:
          "Contenido del sexto y último capítulo. Se cierra el cuento con un mensaje de esperanza y acción colectiva para vivir y sostener las redes de apoyo.",
      },
    ],
  },
];
