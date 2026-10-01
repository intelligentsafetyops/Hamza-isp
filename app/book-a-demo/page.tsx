import type { Metadata } from "next";
import { StubNotice, SubPage } from "@/components/site/sub-page";

export const metadata: Metadata = {
  title: "Book a demo | Sajjeel Labs",
  alternates: { canonical: "/book-a-demo" }
};

export default function Page() {
  return (
    <SubPage
      title="Book a demo"
      intro="A 30-minute walkthrough of Sajjeel Labs with your own processes in mind."
    >
      <StubNotice what="The demo booking form" />
    </SubPage>
  );
}
