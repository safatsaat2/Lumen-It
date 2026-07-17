import { ClientLogo } from "@/components/layout/client-logo";
import type { Client } from "@/data/clients";

type ClientsMarqueeProps = {
  label: string;
  clients: Client[];
};

export function ClientsMarquee({ label, clients }: ClientsMarqueeProps) {
  const items = [...clients, ...clients];

  return (
    <section className="border-y border-border/60 bg-muted/30 py-10" aria-label={label}>
      <div className="container mb-6">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
      </div>
      <div className="mask-fade-x overflow-hidden">
        <ul className="flex w-max animate-marquee items-center gap-12 px-6">
          {items.map((client, i) => (
            <li
              key={`${client.logo}-${i}`}
              className="flex shrink-0 items-center gap-3 font-display text-lg font-semibold tracking-tight text-muted-foreground transition-colors hover:text-foreground"
            >
              <ClientLogo id={client.logo} />
              <span>{client.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
