"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { course: "Análise e Desenvolvimento de Sistemas (AMS)", alunos: 186 },
  { course: "Processos Gerais (AMS)", alunos: 305 },
  { course: "Mecatrônica Industrial", alunos: 237 },
  { course: "Eventos", alunos: 73 },
  { course: "Gestão da Tecnologia da Informação", alunos: 209 },
  { course: "Gestão Empresarial", alunos: 214 },
];

const chartConfig = {
  alunos: {
    label: "Alunos",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChartBarInteractive() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alunos por Curso</CardTitle>
        <CardDescription>
          Informações coletadas no ultimo ano
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="aspect-auto h-[400px] w-full" config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="course"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => {
                const ignoredWords = ["de", "da", "do", "e", "dos"];
                const matchSigla = value.match(/\(([^)]+)\)$/);
                const suffix = matchSigla ? ` ${matchSigla[0]}` : "";
                const withoutSuffix = value.replace(/\s*\([^)]+\)$/, "");
                const words = withoutSuffix.split(" ");
                const significantWords = words.filter(
                  (word) => !ignoredWords.includes(word.toLowerCase())
                );

                const totalLength = withoutSuffix.length;

                if (totalLength > 7) {
                  const sigla = significantWords
                    .map((word) => word[0]?.toUpperCase())
                    .join(".");
                  return `${sigla}${suffix}`;
                }

                return value;
              }}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="alunos" fill="var(--color-primary)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
