import { Content, Section } from "@/components/section";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-medium">Alunos</h1>
          <Button>Adicionar Aluno</Button>
        </div>
        <DataTable />
      </Content>
    </Section>
  );
}
