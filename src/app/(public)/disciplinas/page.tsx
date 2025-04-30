'use client';
import { Content, Section } from "@/components/section";
import { useDisciplinas } from "@/hooks/useDisciplina"; 
import { DataTable } from "@/components/table/data-table";

export default function Page() {
  const { disciplinas, loading, error } = useDisciplinas();  

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome", label: "Nome da Disciplina" },
    { key: "aulas_teoricas", label: "Aulas Teóricas" },
    { key: "aulas_praticas", label: "Aulas Práticas" },
  ];

  const data = disciplinas.map((disciplina: any) => ({
    id: disciplina.id,
    nome: disciplina.nome,
    aulas_teoricas: disciplina.aulas_teoricas,
    aulas_praticas: disciplina.aulas_praticas,
  }));

  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <h1 className="text-2xl font-medium">Lista de Disciplinas</h1>
          <div className="flex gap-3 flex-wrap">
            {/* <FiltroDisciplinas /> */}
            {/* <DialogAdicionarDisciplina /> */}
          </div>
        </div>

        {loading && <p>Carregando disciplinas...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <DataTable columns={columns} data={data} />}
      </Content>
    </Section>
  );
}
