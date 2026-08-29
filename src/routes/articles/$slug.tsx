import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadOwnedPiece, loadPiece } from "@/lib/edition/access";
import { Reader } from "@/components/edition/reader";

export const Route = createFileRoute("/articles/$slug")({
  loader: async ({ params }) => {
    const data = { slug: params.slug };
    const piece =
      (await loadOwnedPiece({ data }).catch(() => null)) ?? (await loadPiece({ data }));
    if (!piece || piece.kind !== "article") throw notFound();
    return piece;
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <p className="font-serif text-muted">That dispatch is not in this edition.</p>
  ),
});

function ArticlePage() {
  const piece = Route.useLoaderData();
  return <Reader piece={piece} />;
}
