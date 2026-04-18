import logo from "@/assets/logo.png";
import { siteConfig } from "@/content/site";

interface BrandMarkProps {
  compact?: boolean;
  dark?: boolean;
  showSubtitle?: boolean;
  className?: string;
}

const BrandMark = ({
  compact = false,
  dark = false,
  showSubtitle = true,
  className,
}: BrandMarkProps) => {
  const titleClass = dark ? "text-white" : "text-foreground";
  const subtitleClass = dark ? "text-white/60" : "text-slate-500";

  return (
    <div className={["flex items-center gap-3", className].filter(Boolean).join(" ")}>
      <div
        className={`flex items-center justify-center overflow-hidden rounded-2xl bg-white/85 shadow-sm ring-1 ring-slate-900/8 ${
          compact ? "h-11 w-11 p-1" : "h-14 w-14 p-1.5"
        }`}
      >
        <img
          alt={`${siteConfig.brandDisplayName} logo`}
          className="h-full w-full object-contain"
          loading="eager"
          src={logo}
        />
      </div>

      <div className="min-w-0">
        <p
          className={`truncate font-serif font-semibold tracking-tight ${
            compact ? "text-lg" : "text-2xl"
          } ${titleClass}`}
        >
          {siteConfig.brandDisplayName}
        </p>
        {showSubtitle ? (
          <p
            className={`truncate uppercase tracking-[0.22em] ${
              compact ? "text-[10px]" : "text-[11px]"
            } ${subtitleClass}`}
          >
            {siteConfig.brandSubtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default BrandMark;
