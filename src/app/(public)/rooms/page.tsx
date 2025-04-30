"use client";
import { Content, Section } from "@/components/section";
// import { DialogAdicionarCurso } from "./dialog-add";
import { useSalas } from "@/hooks/useSalas"; 
import { DataTable } from "@/components/table/data-table";

export default function Page() {
  const { salas, loading, error } = useSalas();

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome_sala", label: "Nome da Sala" },
    { key: "capacidade", label: "Capacidade" },
    { key: "equipamentos", label: "Equipamentos" },
  ];

  const data = salas.map((sala: any) => ({
    id: sala.id,
    nome_sala: sala.nome_sala,
    capacidade: sala.capacidade,
    equipamentos: Object.entries(sala.equipamentos)
      .map(([equipamento, quantidade]) => `${equipamento}: ${quantidade}`)
      .join(", "),
  }));

  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <h1 className="text-2xl font-medium">Lista de Salas</h1>
          <div className="flex gap-3 flex-wrap">
            {/* <FiltroSalas /> */}
            {/* <DialogAdicionarSala /> */}
          </div>
        </div>

        {loading && <p>Carregando salas...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <DataTable columns={columns} data={data} />}
      </Content>
    </Section>
  );
}
