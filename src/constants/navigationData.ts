import {
  IconBook,
  IconUser,
  IconChalkboard,
  IconFlask,
  IconBolt,
  IconClock,
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
          url: "/alunos",
        },
        {
          title: "Professores",
          description: "Administre o cadastro e detalhes dos professores",
          icon: IconBook,
          url: "/teachers",
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
          url: "/rooms",
        },
        {
          title: "Laboratórios",
          description: "Controle e agende o uso dos laboratórios",
          icon: IconFlask,
          url: "/labs",
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
          url: "/courses",
        },
        {
          title: "Disciplinas",
          description: "Confira as disciplinas disponíveis por curso",
          icon: IconBook,
          url: "/disciplinas",
        },
        {
          title: "Horários",
          description: "Consulte os horários de aulas e eventos acadêmicos",
          icon: IconClock,
          url: "/horarios",
        },
      ],
    },
  ],
};
