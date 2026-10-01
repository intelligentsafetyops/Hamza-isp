import type { Metadata } from "next";
import { StubNotice, SubPage } from "@/components/site/sub-page";

export const metadata: Metadata = { title: "Pricing | Sajjeel Labs", alternates: { canonical: "/pricing" } };

export default function Page() {
  return (
    <SubPage
      title="Pricing"
      intro="Pricing depends on sites, users and modules. Talk to us for a quote."
    >
      <StubNotice what="The pricing page" />
    </SubPage>
  );
}
