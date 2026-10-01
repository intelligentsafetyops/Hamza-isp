import { CapabilityList, CapabilityStrip } from "@/components/landing/capability-strip";
import { FaqAccordion, FaqColumns } from "@/components/landing/faq";
import { FinalCtaCard, FinalCtaInline } from "@/components/landing/final-cta";
import { HeroCentered, HeroSplit, HeroStacked } from "@/components/landing/hero";
import { HeroShowcase } from "@/components/landing/hero-showcase";
import { LifecycleInteractive, LifecycleTimeline } from "@/components/landing/lifecycle";
import { MaturityList, MaturityStepped } from "@/components/landing/maturity";
import { PlatformShowcase } from "@/components/landing/platform-showcase";
import { PlatformTabs } from "@/components/landing/platform-tabs";
import { PlatformDetailed, PlatformMinimal } from "@/components/landing/platform-wall";
import { ProofFeatured, ProofGrid, ProofSingle } from "@/components/landing/proof";
import { RealityMinimal, RealityScene, RealitySplit } from "@/components/landing/reality";
import { StandardsCards, StandardsRegister } from "@/components/landing/standards";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Variant } from "@/components/variants/variant";

// Each section offers 2–3 layouts (lib/sections.ts). The first is the default; the prototype
// dropdowns switch between them. The 3D RopeBand (components/landing/rope-3d) is not mounted.
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Variant
          section="hero"
          options={{
            split: <HeroSplit />,
            centered: <HeroCentered />,
            stacked: <HeroStacked />,
            showcase: <HeroShowcase />
          }}
        />
        <Variant
          section="capabilities"
          options={{ marquee: <CapabilityStrip />, grid: <CapabilityList /> }}
        />
        <Variant
          section="reality"
          options={{
            scene: <RealityScene />,
            split: <RealitySplit />,
            minimal: <RealityMinimal />
          }}
        />
        <Variant
          section="lifecycle"
          options={{ interactive: <LifecycleInteractive />, timeline: <LifecycleTimeline /> }}
        />
        <Variant
          section="platform"
          options={{
            minimal: <PlatformMinimal />,
            tabs: <PlatformTabs />,
            detailed: <PlatformDetailed />,
            showcase: <PlatformShowcase />
          }}
        />
        <Variant
          section="standards"
          options={{ register: <StandardsRegister />, cards: <StandardsCards /> }}
        />
        <Variant
          section="maturity"
          options={{ stepped: <MaturityStepped />, list: <MaturityList /> }}
        />
        <Variant
          section="proof"
          options={{ featured: <ProofFeatured />, grid: <ProofGrid />, single: <ProofSingle /> }}
        />
        <Variant section="faq" options={{ accordion: <FaqAccordion />, columns: <FaqColumns /> }} />
        <Variant section="cta" options={{ card: <FinalCtaCard />, inline: <FinalCtaInline /> }} />
      </main>
      <Footer />
    </>
  );
}
