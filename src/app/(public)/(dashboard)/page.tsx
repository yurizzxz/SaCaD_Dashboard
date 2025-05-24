import { ChartBarInteractive } from "@/components/dashboard/chart-bar";
import { SectionCards } from "@/components/dashboard/section-cards";
import { Section, Content } from "@/components/section";
import { ChartPieInteractive } from "@/components/dashboard/chart-pie";

export default function Page() {
  return (
    <Section>
      <SectionCards />
      <Content className="grid grid-cols-1 gap-4 ">
        <ChartBarInteractive /> 
        {/* <ChartPieInteractive /> */}
      </Content>
    </Section>
  );
}
