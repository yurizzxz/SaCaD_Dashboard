"use client";

import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/": "Olá, seja bem-vindo! 👋",
  "/alunos": "Alunos",
  "/teachers": "Professores",
  "/courses": "Cursos",
  "/disciplinas": "Componentes",
  "/rooms": "Salas",
  "/labs": "Laboratórios",
  "/horarios": "Horários",
};

export function HeadingTitle() {
  const pathname = usePathname();
  const title = titles[pathname] || "Página Não Encontrada";
  return (
    <div className="pt-4 px-4 lg:px-5.5">
      <h1 className="text-2xl font-medium">{title}</h1>
    </div>
  );
}
