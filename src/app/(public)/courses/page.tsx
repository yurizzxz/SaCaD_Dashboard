'use client';
import { Content, Section } from "@/components/section";
import { useCursos } from "@/hooks/useCourses";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";

export default function Page() {
  const { cursos, loading, error } = useCursos();

  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <h1 className="text-2xl font-medium">Lista de Cursos</h1>
        </div>

        {loading && <p>Carregando cursos...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {!loading && !error && cursos.map((curso: any) => (
            <Card key={curso.id} className="border rounded-lg shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{curso.nome}</CardTitle>
                <CardDescription>{curso.duracao_em_semestres} semestres</CardDescription>
              </CardHeader>
                <CardContent>
                  <p><strong>Disciplinas:</strong> {curso.disciplinas?.length > 0 
                    ? `${curso.disciplinas.length} disciplina(s): ${curso.disciplinas.map((d: any) => d.nome).join(", ")}`
                    : "Sem disciplinas"}</p>
                  <p><strong>Status:</strong> {curso.status || "Ativo"}</p>
                  <p><strong>Email do Coordenador:</strong> {curso.email_coordenador || "Não informado"}</p>
                </CardContent>
            </Card>
          ))}
        </div>
      </Content>
    </Section>
  );
}
