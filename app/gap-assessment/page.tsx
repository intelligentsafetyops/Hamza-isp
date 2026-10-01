import type { Metadata } from "next";
import { StubNotice, SubPage } from "@/components/site/sub-page";

export const metadata: Metadata = {
  title: "Free gap assessment | Sajjeel Labs",
  alternates: { canonical: "/gap-assessment" }
};

export default function Page() {
  return (
    <SubPage
      title="Free gap assessment"
      intro="See where your compliance process is exposed. Ten minutes, no signup."
    >
      <StubNotice what="The gap assessment flow" />
    </SubPage>
  );
}
