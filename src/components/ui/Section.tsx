import type { ReactNode } from 'react';

export function Section({ title, children, aside }: { title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="space-y-3.5">
      <div className="flex items-center justify-between gap-3 border-b line-accent pb-2">
        <h2 className="section-title">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}
