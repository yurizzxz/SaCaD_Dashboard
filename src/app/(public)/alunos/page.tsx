"use client";
import { Content, Section } from "@/components/section";
import { FiltroAlunos } from "./filter";
import { useAlunos } from "@/hooks/useAlunos";
import { DataTable } from "@/components/table/data-table";
import { DialogAdicionarAluno } from "./dialog-add";

export default function Page() {
  const { alunos, loading, error } = useAlunos();

  const columns = [
    { key: "ra", label: "RA" },
    { key: "nome", label: "Nome" },
    { key: "cpf", label: "CPF" },
    { key: "curso", label: "Curso" },
    { key: "status", label: "Status" },
    { key: "semestre", label: "Semestre" },
    { key: "email", label: "Email" },
  ];

  const data = alunos.map((aluno) => ({
    ra: aluno.id,
    nome: aluno.nome,
    cpf: aluno.cpf,
    curso: aluno.curso,
    status: aluno.status,
    semestre: aluno.semestre,
    email: aluno.email,
  }));

  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <h1 className="text-2xl font-medium">Lista de Alunos</h1>
          <div className="flex gap-3 flex-wrap">
            <FiltroAlunos />
            <DialogAdicionarAluno />
          </div>
        </div>

        {loading && <p>Carregando alunos...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <DataTable columns={columns} data={data} />}
      </Content>
    </Section>
  );
}
