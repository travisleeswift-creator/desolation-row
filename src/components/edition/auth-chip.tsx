import { Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function AuthChip() {
  const { isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="h-8 w-24 animate-pulse rounded-sm bg-paper-3" />;
  }
  return (
    <div className="flex items-center gap-3 font-sans text-xs tracking-wide">
      <SignedOut>
        <Link
          to="/login"
          className="border-b border-transparent text-ink hover:border-crimson"
        >
          Sign in
        </Link>
      </SignedOut>
      <SignedIn>
        <div className="[&_button]:border [&_button]:border-rule [&_button]:bg-paper [&_button]:px-2 [&_button]:py-1 [&_button]:font-sans [&_button]:text-xs [&_button]:text-ink [&_img]:size-6">
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}
