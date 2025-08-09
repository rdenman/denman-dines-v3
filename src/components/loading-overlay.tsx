export function LoadingOverlay(
  { text }: { text?: string } = { text: "Loading..." }
) {
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm"
      aria-label="Loading"
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="size-8 animate-spin rounded-full border-2 border-border border-t-primary" />
        </div>
        <div className="text-sm text-muted-foreground">{text}</div>
      </div>
    </div>
  );
}
