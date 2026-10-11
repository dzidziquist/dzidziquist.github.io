import { useState } from "react";
import { Check, Copy, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const EMAIL = "maureendzifa.awumeequist@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/maureendzifaquist";

/** "Let's talk" button: opens a small card with her email (open or copy) and LinkedIn. The card's pills use the
 * site's pop hover (accent fill, lift and tilt), like the buttons and the footer pill. */
export const ContactButton = ({ className = "" }: { className?: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the address is still shown as selectable text */
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="lg" className={className}>
          <Mail className="hidden sm:inline mr-2 h-4 w-4" aria-hidden />
          Let's talk
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" sideOffset={10} collisionPadding={24} className="brutal-card w-[min(calc(100vw-3rem),380px)] p-4 space-y-3 hover:transform-none">
        <p className="font-display font-bold text-base" style={{ textTransform: "none" }}>
          Say hi 👋
        </p>
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${EMAIL}`}
            className="min-w-0 flex-1 truncate rounded-full border border-foreground px-3 py-1.5 text-[11px] sm:text-xs font-mono pop-hover pop-sm pop-wide select-all"
            style={{ textTransform: "none" }}
          >
            {EMAIL}
          </a>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Email copied" : "Copy email"}
            className="h-9 w-9 shrink-0 flex items-center justify-center rounded-full border border-foreground pop-hover pop-sm"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        <a
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-foreground px-3 py-1.5 text-xs font-semibold pop-hover pop-sm pop-wide"
          style={{ textTransform: "none" }}
        >
          <Linkedin className="h-3.5 w-3.5" aria-hidden />
          Message me on LinkedIn
        </a>
        <span aria-live="polite" className="sr-only">
          {copied ? "Email copied" : ""}
        </span>
      </PopoverContent>
    </Popover>
  );
};
