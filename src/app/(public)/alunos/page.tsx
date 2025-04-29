'use client'
import { Content, Section } from "@/components/section";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAlunos } from "@/hooks/useAlunos"; 

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
    ra: aluno.ra,
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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-medium">Lista de Alunos</h1>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filtrar por Curso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Engenharia da Computação">Engenharia</SelectItem>
                <SelectItem value="Administração de Empresas">Administração</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filtrar por Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Suspenso">Suspenso</SelectItem>
              </SelectContent>
            </Select>
            <Button>Adicionar Aluno</Button>
          </div>
        </div>

        {loading && <p>Carregando alunos...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <DataTable columns={columns} data={data} />}
      </Content>
    </Section>
  );
}
