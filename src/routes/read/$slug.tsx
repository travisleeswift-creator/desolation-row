import { createFileRoute, notFound } from "@tanstack/react-router";
import { loadOwnedPiece, loadPiece } from "@/lib/edition/access";
import { Reader } from "@/components/edition/reader";

export const Route = createFileRoute("/read/$slug")({
  loader: async ({ params }) => {
    const data = { slug: params.slug };
    const piece =
      (await loadOwnedPiece({ data }).catch(() => null)) ?? (await loadPiece({ data }));
    if (!piece || piece.kind !== "chapter") throw notFound();
    return piece;
  },
  component: ReadPage,
  notFoundComponent: () => (
    <p className="font-serif text-muted">That chapter is not in this edition.</p>
  ),
});

function ReadPage() {
  const piece = Route.useLoaderData();
  return <Reader piece={piece} />;
}
