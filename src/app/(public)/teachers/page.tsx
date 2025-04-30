"use client";
import { Content, Section } from "@/components/section";
import { DialogAdicionar } from "./dialog-add";
import { useTeachers } from "@/hooks/useTeachers";
import { DataTable } from "@/components/table/data-table";

export default function Page() {
  const { teachers, loading, error } = useTeachers();

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome", label: "Nome" },
    { key: "disciplina", label: "Disciplina" },
    { key: "data_admissao", label: "Data de Admissão" },
    { key: "status", label: "Status" },
    { key: "email", label: "Email" },
    { key: "telefone", label: "Telefone" },
  ];

  const data = teachers.map((professor) => ({
    id: professor.id,
    nome: professor.nome,
    disciplina: professor.disciplina,
    data_admissao: professor.data_admissao,
    status: professor.status,
    email: professor.email,
    telefone: professor.telefone,
  }));

  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <h1 className="text-2xl font-medium">Lista de Professores</h1>
          <div className="flex gap-3 flex-wrap">
            {/* <FiltroProfessores /> */}
            <DialogAdicionar />
          </div>
        </div>

        {loading && <p>Carregando professores...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <DataTable columns={columns} data={data} />}
      </Content>
    </Section>
  );
}
