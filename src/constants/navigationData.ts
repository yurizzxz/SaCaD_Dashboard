import {
  IconBook,
  IconUser,
  IconChalkboard,
  IconFlask,
  IconBolt,
  IconClock,
  IconTools,
  IconHierarchy,
} from "@tabler/icons-react";

export const data = {
  logo: {
    url: "/",
    alt: "SaCaD Logo",
    title: "SaCaD",
  },
  menu: [
    { title: "Home", url: "/", description: "Página inicial do sistema" },
    {
      title: "Entidades",
      url: "#",
      items: [
        {
          title: "Alunos",
          description: "Gerencie informações e dados dos alunos",
          icon: IconUser,
          url: "/entities/alunos",
        },
        {
          title: "Professores",
          description: "Administre o cadastro e detalhes dos professores",
          icon: IconBook,
          url: "/entities/teachers",
        },
        {
          title: "Técnicos",
          description: "Controle os dados e funções dos técnicos de t.i",
          icon: IconTools,
          url: "/entities/tecnicos",
        },
        {
          title: "Coordenadores",
          description: "Gerencie os coordenadores dos cursos e áreas",
          icon: IconHierarchy,
          url: "/entities/coordenadores",
        },
        {
          title: "Auxiliares Docentes",
          description: "Gerencie dados e atribuições dos auxiliares docentes",
          icon: IconChalkboard,
          url: "/entities/auxiliares-docentes",
        },
      ],
    },

    {
      title: "Salas",
      url: "#",
      items: [
        {
          title: "Salas de Aula",
          description: "Visualize e organize as salas de aula disponíveis",
          icon: IconChalkboard,
          url: "/class/rooms",
        },
        {
          title: "Laboratórios",
          description: "Controle e agende o uso dos laboratórios",
          icon: IconFlask,
          url: "/class/labs",
        },
      ],
    },
    {
      title: "Acadêmico",
      url: "#",
      items: [
        {
          title: "Cursos",
          description: "Explore os cursos oferecidos e suas informações",
          icon: IconBolt,
          url: "/academic/courses",
        },
        {
          title: "Disciplinas",
          description: "Confira as disciplinas disponíveis por curso",
          icon: IconBook,
          url: "/academic/disciplinas",
        },
        {
          title: "Horários",
          description: "Consulte os horários de aulas e eventos acadêmicos",
          icon: IconClock,
          url: "/academic/horarios",
        },
      ],
    },
  ],
};
