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
        heading: "Capitulo 1: La llegada",
        content:
          "El contenido del primer capitulo se cargara aqui. Este espacio esta reservado para el texto narrativo del cuento de ficcion #ViveTuRed, disenado para sensibilizar a la comunidad universitaria sobre la importancia de las redes de apoyo.",
      },
      {
        heading: "Capitulo 2: Primeros lazos",
        content:
          "El contenido del segundo capitulo se cargara aqui. A traves de la narrativa, se exploran las primeras conexiones y vinculos que se forman en el entorno universitario.",
      },
    ],
  },
  {
    id: 2,
    title: "Episodio 2 - La red",
    subtitle: "Tejiendo vinculos de proteccion",
    color: "#00555A",
    sections: [
      {
        heading: "Capitulo 3: Hilos que conectan",
        content:
          "Contenido del tercer capitulo. Se profundiza en la importancia de reconocer las redes de apoyo y como estas pueden activarse en momentos de necesidad.",
      },
      {
        heading: "Capitulo 4: Nudos y fortalezas",
        content:
          "Contenido del cuarto capitulo. Se exploran los desafios y la resiliencia que surge al fortalecer los vinculos personales e institucionales.",
      },
    ],
  },
  {
    id: 3,
    title: "Episodio 3 - La accion",
    subtitle: "Activando las redes de apoyo",
    color: "#DCA15D",
    sections: [
      {
        heading: "Capitulo 5: Voces que acompanan",
        content:
          "Contenido del quinto capitulo. La narrativa se enfoca en las voces de apoyo y las instituciones que acompanan los procesos de prevencion y atencion.",
      },
      {
        heading: "Capitulo 6: Vivir la red",
        content:
          "Contenido del sexto y ultimo capitulo. Se cierra el cuento con un mensaje de esperanza y accion colectiva para vivir y sostener las redes de apoyo.",
      },
    ],
  },
];
