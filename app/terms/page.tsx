import type { Metadata } from "next";
import { StubNotice, SubPage } from "@/components/site/sub-page";

export const metadata: Metadata = {
  title: "Terms of service | Sajjeel Labs",
  alternates: { canonical: "/terms" }
};

export default function Page() {
  return (
    <SubPage title="Terms of service">
      <StubNotice what="The terms of service" />
    </SubPage>
  );
}
