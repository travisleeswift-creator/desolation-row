import { lazy, Suspense, useEffect, useState } from "react";

const ListenBarInner = lazy(() => import("./listen-bar").then((m) => ({ default: m.ListenBar })));

export function ListenBarLazy(props: {
  parts: string[];
  disabled?: boolean;
  disabledReason?: string;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <ListenBarInner {...props} />
    </Suspense>
  );
}
