"use client";
import { Content, Section } from "@/components/section";
import { useLabs } from "@/hooks/useLabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Page() {
  const { labs, loading: loadingLabs, error: errorLabs } = useLabs();

  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <h1 className="text-2xl font-medium">Lista de Laboratórios</h1>
        </div>

        {loadingLabs && <p>Carregando laboratórios...</p>}
        {errorLabs && <p className="text-red-500">{errorLabs}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {!loadingLabs &&
            !errorLabs &&
            labs.map((lab: any) => (
              <Card key={lab.id} className="border rounded-lg shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{lab.nome}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-3 -mt-4">
                    <p>
                      <strong className="block">Curso Associado:</strong>{" "}
                      {lab.curso_associado}
                    </p>
                  </div>
                  <div className="mb-3">
                    <p>
                      <strong>Equipamentos:</strong>
                    </p>

                    <ul>
                      {Object.keys(lab.equipamentos).map((equip) => (
                        <li key={equip}>
                          {equip}: {lab.equipamentos[equip]}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p>
                    <strong>Horário:</strong>
                  </p>
                  <ul>
                    {lab.horario.map((hora: any, index: number) => (
                      <li key={index}>
                        {hora.dia}: {hora.inicio} - {hora.fim}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
        </div>
      </Content>
    </Section>
  );
}
