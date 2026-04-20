import logo from "@/assets-optimized/logo.webp";
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
          decoding="async"
          width={compact ? 44 : 56}
          height={compact ? 44 : 56}
          src={logo}
        />
      </div>

      <div className="flex flex-col justify-center min-w-0 leading-tight">
        <p
          className={`truncate font-serif font-semibold tracking-tight ${
            compact ? "text-lg md:text-xl" : "text-2xl"
          } ${titleClass}`}
        >
          {siteConfig.brandDisplayName}
        </p>
        {showSubtitle ? (
          <p
            className={`truncate uppercase font-medium tracking-[0.24em] ${
              compact ? "text-[9px] md:text-[10px]" : "text-[11px]"
            } ${subtitleClass} mt-0.5`}
          >
            {siteConfig.brandSubtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default BrandMark;
