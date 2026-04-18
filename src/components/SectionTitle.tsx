import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  centered?: boolean;
  className?: string;
  id?: string;
}

const SectionTitle = ({
  title,
  subtitle,
  eyebrow,
  centered = true,
  className,
  id,
}: SectionTitleProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={[
        "space-y-4 opacity-0",
        isVisible ? "animate-fade-in" : "",
        centered ? "text-center" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow ? (
        <div className={centered ? "flex justify-center" : ""}>
          <div className="section-eyebrow">{eyebrow}</div>
        </div>
      ) : null}
      <div className="space-y-3">
        <h2
          id={id}
          className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={`text-base leading-7 text-muted-foreground md:text-[17px] ${
              centered ? "mx-auto max-w-2xl" : "max-w-xl"
            }`}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
      <div
        aria-hidden="true"
        className={`h-1 w-16 rounded-full bg-gradient-to-r from-primary via-chart-2 to-chart-3 ${
          centered ? "mx-auto" : ""
        }`}
      />
    </div>
  );
};

export default SectionTitle;
