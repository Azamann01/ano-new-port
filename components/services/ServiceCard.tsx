import Image from "next/image";
import { TrendingUp } from "lucide-react";
import type { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="surface-container flex flex-1 flex-col gap-1.5 p-5">
        <h3 className="text-base font-semibold">{service.title}</h3>
        <p className="text-sm text-[var(--container-muted)]">{service.description}</p>
        <p className="mt-1 flex items-start gap-1.5 text-sm font-medium text-[var(--container-foreground)]">
          <TrendingUp aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {service.outcome}
        </p>
      </div>
    </div>
  );
}
