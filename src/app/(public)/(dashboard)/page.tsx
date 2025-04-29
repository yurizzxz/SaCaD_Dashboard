import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import { SectionCards } from "@/components/dashboard/section-cards";
import { Section, Content } from "@/components/section";


export default function Page() {
  return (
    <Section>
      <SectionCards />
      <Content>
        <ChartAreaInteractive />
      </Content>

    </Section>
  );
}
