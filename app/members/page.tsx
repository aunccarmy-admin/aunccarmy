import Officers from "@/components/members/ano/officers";
import Cadets from "@/components/members/cadet/cadets";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

export default function Members() {
  return (
    <main className="mx-auto min-h-[85lvh] max-w-8xl">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "fixed -z-10 stroke-foreground/10 [mask-image:radial-gradient(300px_circle_at_center,transparent,white,transparent)] lg:[mask-image:radial-gradient(600px_circle_at_center,transparent,transparent,white,white,transparent)]",
        )}
      />
      <Officers />
      <Cadets />
    </main>
  );
}
