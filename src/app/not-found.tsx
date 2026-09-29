import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title="This page doesn't exist — yet."
      description="The link may be old, or the page may have moved. Everything worth seeing is a click away."
    >
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/">Back home</ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          View work
        </ButtonLink>
      </div>
    </PageHero>
  );
}
