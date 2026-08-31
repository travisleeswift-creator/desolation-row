import { createFileRoute } from "@tanstack/react-router";
import { loadBook } from "@/lib/edition/access";
import { Volume } from "@/components/edition/volume";

export const Route = createFileRoute("/")({
  loader: async () => loadBook(),
  component: FrontPage,
});

function FrontPage() {
  const { chapters } = Route.useLoaderData();
  return (
    <main className="grid gap-12">
      <Volume chapters={chapters} />
    </main>
  );
}
