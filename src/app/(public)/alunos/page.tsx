import { Content, Section } from "@/components/section";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const columns = [
  { key: "invoice", label: "RA" },
  { key: "paymentStatus", label: "Status" },
  { key: "paymentMethod", label: "Método" },
  { key: "totalAmount", label: "Total", alignRight: true },
]

const data = [
  {
    invoice: "INV001",
    paymentStatus: "Pago",
    totalAmount: "R$250,00",
    paymentMethod: "Cartão de Crédito",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pendente",
    totalAmount: "R$150,00",
    paymentMethod: "Pix",
  },
]

export default function Page() {
  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-medium">Lista de Alunos</h1>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filtrar por Curso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="turma">Todos</SelectItem>
                <SelectItem value="turma1">Curso 1</SelectItem>
                <SelectItem value="turma2">Curso 2</SelectItem>
                <SelectItem value="turma3">Curso 3</SelectItem>
              </SelectContent>
            </Select>
            <Select>
            <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filtrar por Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="turma">Todos</SelectItem>
                <SelectItem value="turma1">Ativo</SelectItem>
                <SelectItem value="turma2">Inativo</SelectItem>
              </SelectContent>
            </Select>
            <Button>Adicionar Aluno</Button>
          </div>
        </div>
        <DataTable columns={columns} data={data} />
      </Content>
    </Section>
  );
}
