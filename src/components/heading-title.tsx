"use client";

import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/": "Olá, seja bem-vindo! 👋",
  "/entities/alunos": "Alunos",
  "/entities/teachers": "Professores",
  "/entities/tecnicos": "Técnicos",
  "/entities/coordenadores": "Coordenadores",
  "/academic/courses": "Cursos",
  "/academic/horarios": "Horários",
  "/academic/disciplinas": "Componentes",
  "/class/rooms": "Salas",
  "/class/labs": "Laboratórios",
};

export function HeadingTitle() {
  const pathname = usePathname();
  const title = titles[pathname] || "Página Não Encontrada";
  return (
    <div className="pt-6 px-4 lg:px-5.5">
      <h1 className="text-2xl font-medium">{title}</h1>
    </div>
  );
}
