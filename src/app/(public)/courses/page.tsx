"use client";
import { Content, Section } from "@/components/section";
// import { DialogAdicionarCurso } from "./dialog-add";
import { useCursos } from "@/hooks/useCourses";
import { DataTable } from "@/components/table/data-table";

export default function Page() {
  const { cursos, loading, error } = useCursos();

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome_curso", label: "Nome do Curso" },
    { key: "disciplinas", label: "Disciplinas" },
    { key: "duracao", label: "Duração (semestres)" },
    { key: "status", label: "Status" },
    { key: "email_coordenador", label: "Email do Coordenador" },
  ];

  const data = cursos.map((curso: any) => ({
    id: curso.id,
    nome_curso: curso.nome,
    disciplinas: curso.disciplinas && curso.disciplinas.length > 0
      ? `${curso.disciplinas.length} disciplina(s): ${curso.disciplinas.map((d: any) => d.nome).join(", ")}`
      : "Sem disciplinas",
    duracao: curso.duracao_em_semestres,
    status: curso.status || "Ativo",
    email_coordenador: curso.email_coordenador || "Não informado",
  }));
  
  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <h1 className="text-2xl font-medium">Lista de Cursos</h1>
          <div className="flex gap-3 flex-wrap">
            {/* <FiltroCursos /> */}
            {/* <DialogAdicionarCurso /> */}
          </div>
        </div>

        {loading && <p>Carregando cursos...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <DataTable columns={columns} data={data} />}
      </Content>
    </Section>
  );
}
