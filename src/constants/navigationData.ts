import {
  IconBuilding,
  IconDashboard,
  IconFileAi,
  IconFolder,
  IconReportAnalytics,
  IconSchool,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Alunos",
      url: "/alunos",
      icon: IconUsers,
    },
    {
      title: "Professores",
      url: "/teachers",
      icon: IconSchool,
    },
    {
      title: "Cursos",
      url: "/courses",
      icon: IconFolder,
    },
    {
      title: "Salas",
      url: "/rooms",
      icon: IconBuilding,
    },
    {
      title: "Laboratórios",
      url: "/labs",
      icon: IconFileAi,
    },
    {
      title: "Relatórios",
      url: "/reports",
      icon: IconReportAnalytics,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
  ],
};
