export function EmptyState({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card px-5 py-8">
      <p className="font-heading text-lg font-semibold">{title}</p>
      {lead ? <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{lead}</p> : null}
    </div>
  );
}
