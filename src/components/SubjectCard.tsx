import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SubjectCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  grades: string;
  outcomes?: string[];
  delay?: number;
}

const SubjectCard = ({
  title,
  description,
  icon: Icon,
  accent,
  grades,
  outcomes = [],
  delay = 0,
}: SubjectCardProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`opacity-0 ${isVisible ? "animate-fade-in" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <Card className="mesh-border group flex h-full flex-col overflow-hidden rounded-[24px] border-white/50 bg-white/85 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Accent bar */}
        <div className={`h-1 flex-shrink-0 bg-gradient-to-r ${accent}`} aria-hidden="true" />

        <CardContent className="flex flex-1 flex-col gap-4 p-5">
          {/* Icon + grade badge */}
          <div className="flex items-start justify-between gap-3">
            <div
              aria-hidden="true"
              className={`inline-flex rounded-xl bg-gradient-to-br ${accent} p-2.5 text-slate-950 shadow-sm`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-slate-900/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              {grades}
            </span>
          </div>

          {/* Title + description */}
          <div className="flex-1 space-y-2">
            <h3 className="font-serif text-xl font-semibold text-foreground transition-colors group-hover:text-secondary">
              {title}
            </h3>
            <p className="text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>

          {/* Outcome tags */}
          {outcomes.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5" aria-label={`${title} learning outcomes`}>
              {outcomes.map((item) => (
                <li
                  className="rounded-full bg-slate-900/5 px-3 py-1 text-[11px] font-medium text-slate-600"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          {/* CTA */}
          <Button
            className="mt-auto w-full rounded-xl"
            size="sm"
            variant="outline"
            asChild
          >
            <Link to="/subjects">See subject details</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubjectCard;
