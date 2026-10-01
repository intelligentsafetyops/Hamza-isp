import type { Metadata } from "next";
import { StubNotice, SubPage } from "@/components/site/sub-page";

export const metadata: Metadata = {
  title: "Security | Sajjeel Labs",
  alternates: { canonical: "/security" }
};

export default function Page() {
  return (
    <SubPage
      title="Security at Sajjeel Labs"
      intro="How Sajjeel Labs protects safety records, personal data and your organisation’s information."
    >
      <StubNotice what="The security overview" />
    </SubPage>
  );
}
