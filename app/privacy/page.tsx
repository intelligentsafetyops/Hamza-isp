import type { Metadata } from "next";
import { StubNotice, SubPage } from "@/components/site/sub-page";

export const metadata: Metadata = {
  title: "Privacy policy | Sajjeel Labs",
  alternates: { canonical: "/privacy" }
};

export default function Page() {
  return (
    <SubPage title="Privacy policy">
      <StubNotice what="The privacy policy" />
    </SubPage>
  );
}
