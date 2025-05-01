import { ChartBarInteractive } from "@/components/dashboard/chart-bar";
import { SectionCards } from "@/components/dashboard/section-cards";
import { Section, Content } from "@/components/section";


export default function Page() {
  return (
    <Section>
      <h1 className="text-2xl pl-6 mt-1 font-semibold">Olá! Seja bem-vindo!👋</h1>
      <SectionCards />
      <Content className="grid grid-cols-1 gap-4 ">
        <ChartBarInteractive />
      </Content>

    </Section>
  );
}
