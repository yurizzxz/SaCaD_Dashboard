"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Curso, Disciplina, Professor } from "@/lib/types";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

// ---------- CURSO ----------
interface CursoSelectProps {
  cursoSelecionado: string;
  onCursoChange: (cursoId: string) => void;
  className?: string;
}

export function FormCursoSelect({
  cursoSelecionado,
  onCursoChange,
  className,
}: CursoSelectProps) {
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    fetch("http://localhost:99/cursos")
      .then((res) => res.json())
      .then((data: Curso[]) => setCursos(data))
      .catch((err) => console.error("Erro ao buscar cursos:", err));
  }, []);

  const cursoAtual = cursos.find(
    (curso) => curso.id.toString() === cursoSelecionado
  );

  return (
    <Select value={cursoSelecionado} onValueChange={onCursoChange}>
      <SelectTrigger className={twMerge("w-[230px]", className)}>
        <SelectValue placeholder="Selecione um curso">
          {cursoAtual ? cursoAtual.nome_curso : "Selecione um curso"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="todos">Todos os cursos</SelectItem>
        {cursos.map((curso) => (
          <SelectItem key={curso.id} value={curso.id.toString()}>
            {curso.nome_curso}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// ---------- PROFESSOR ----------
interface ProfessorSelectProps {
  professorSelecionado: string;
  onProfessorChange: (professorId: string) => void;
  className?: string;
}

export function FormProfessorSelect({
  professorSelecionado,
  onProfessorChange,
  className,
}: ProfessorSelectProps) {
  const [professores, setProfessores] = useState<Professor[]>([]);

  useEffect(() => {
    fetch("http://localhost:99/professores")
      .then((res) => res.json())
      .then((data: Professor[]) => setProfessores(data))
      .catch((err) => console.error("Erro ao buscar professores:", err));
  }, []);

  const professorAtual = professores.find(
    (prof) => prof.id.toString() === professorSelecionado
  );

  return (
    <Select value={professorSelecionado} onValueChange={onProfessorChange}>
      <SelectTrigger className={twMerge("w-[230px]", className)}>
        <SelectValue placeholder="Selecione um professor">
          {professorAtual ? professorAtual.nome : "Selecione um professor"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="todos">Todos os professores</SelectItem>
        {professores.map((prof) => (
          <SelectItem key={prof.id} value={prof.id.toString()}>
            {prof.nome}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// ---------- DISCIPLINA ----------
interface DisciplinaSelectProps {
  disciplinaSelecionada: string;
  onDisciplinaChange: (disciplinaId: string) => void;
  className?: string;
}

export function FormDisciplinaSelect({
  disciplinaSelecionada,
  onDisciplinaChange,
  className,
}: DisciplinaSelectProps) {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

  useEffect(() => {
    fetch("http://localhost:99/disciplinas")
      .then((res) => res.json())
      .then((data: Disciplina[]) => setDisciplinas(data))
      .catch((err) => console.error("Erro ao buscar cursos:", err));
  }, []);

  const disciplinaAtual = disciplinas.find(
    (disciplina) => disciplina.id.toString() === disciplinaSelecionada
  );

  return (
    <Select value={disciplinaSelecionada} onValueChange={onDisciplinaChange}>
      <SelectTrigger className={twMerge("w-[230px]", className)}>
        <SelectValue placeholder="Selecione uma disciplina">
          {disciplinaAtual ? disciplinaAtual.nome : "Selecione uma disciplina"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="todos">Todos as disciplinas</SelectItem>
        {disciplinas.map((disciplina) => (
          <SelectItem key={disciplina.id} value={disciplina.id.toString()}>
            {disciplina.nome}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
