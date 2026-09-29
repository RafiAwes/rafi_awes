import { Hero } from "@/components/hero/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { FinalCta } from "@/components/sections/FinalCta";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { Problems } from "@/components/sections/Problems";
import { Process } from "@/components/sections/Process";
import { SolutionsPreview } from "@/components/sections/SolutionsPreview";
import { TechStack } from "@/components/sections/TechStack";
import { WhatIBuild } from "@/components/sections/WhatIBuild";
import { JsonLd } from "@/components/ui/JsonLd";
import { personSchema, websiteSchema } from "@/lib/metadata/structured-data";

export default function HomePage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <JsonLd data={websiteSchema()} />
      <Hero />
      <WhatIBuild />
      <Problems />
      <FeaturedWork />
      <SolutionsPreview />
      <Process />
      <AboutPreview />
      <TechStack />
      <InsightsPreview />
      <BlogPreview />
      <FinalCta />
    </>
  );
}
