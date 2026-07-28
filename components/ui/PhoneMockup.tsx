import { Wifi, Signal, BatteryFull } from "lucide-react";
import { cn } from "@/lib/cn";

type PhoneMockupProps = {
  children: React.ReactNode;
  className?: string;
};

/** A pure-CSS iPhone frame — status bar, dynamic island, home indicator. */
export function PhoneMockup({ children, className }: PhoneMockupProps) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.25rem] bg-black p-2 shadow-2xl ring-1 ring-black/10",
        className
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-[var(--phone-bg,#0a0a0a)]">
        {/* Status bar */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 pt-2.5 text-[10px] font-semibold text-white">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <Signal className="h-2.5 w-2.5" />
            <Wifi className="h-2.5 w-2.5" />
            <BatteryFull className="h-3 w-3" />
          </div>
        </div>

        {/* Dynamic island */}
        <div className="absolute left-1/2 top-1.5 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />

        {/* Screen content */}
        <div className="h-full w-full pt-8">{children}</div>

        {/* Home indicator */}
        <div className="absolute inset-x-0 bottom-1.5 z-20 flex justify-center">
          <div className="h-1 w-24 rounded-full bg-white/60" />
        </div>
      </div>
    </div>
  );
}
