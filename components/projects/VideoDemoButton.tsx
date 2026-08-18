"use client";

import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

type VideoDemoButtonProps = {
  video: string;
  videoPoster?: string;
  label?: string;
};

export function VideoDemoButton({ video, videoPoster, label = "Watch demo video" }: VideoDemoButtonProps) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Play aria-hidden className="h-4 w-4" />
        {label}
      </Button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="surface-container relative w-full max-w-3xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-1.5 text-white transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-white"
            >
              <X className="h-5 w-5" />
            </button>
            <video src={video} poster={videoPoster} controls autoPlay className="w-full" />
          </div>
        </div>
      )}
    </>
  );
}
