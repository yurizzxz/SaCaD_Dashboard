"use client";
import { Content, Section } from "@/components/section";
import { DialogAdicionarProfessor } from "./dialog-add";
import { useTeachers } from "@/hooks/useTeachers";
import { DataTable } from "@/components/table/data-table";

export default function Page() {
  const { teachers, loading, error } = useTeachers();

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome", label: "Nome" },
    { key: "disciplina", label: "Disciplina" },
    { key: "cursos", label: "Cursos" },
    { key: "data_admissao", label: "Data de Admissão" },
    { key: "status", label: "Status" },
    { key: "email", label: "Email" },
  ];
  
  const data = teachers.map((professor) => ({
    id: professor.id,
    nome: professor.nome,
    disciplina: professor.disciplina,
    cursos: professor.cursos
    .map((curso) => `${curso.nome_curso} - Semestre ${curso.semestre}`)
    .join(", "),
    data_admissao: professor.data_admissao,
    status: professor.status,
    email: professor.email,
  }));
  

  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <h1 className="text-2xl font-medium">Lista de Professores</h1>
          <div className="flex gap-3 flex-wrap">
            {/* <FiltroProfessores /> */}
            <DialogAdicionarProfessor />
          </div>
        </div>

        {loading && <p>Carregando professores...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <DataTable columns={columns} data={data} />}
      </Content>
    </Section>
  );
}
