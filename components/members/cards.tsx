import CldImage from "@/components/common/cld-image";
import { SelectAno, SelectCadet } from "@/db/schema";
import { SquareUser, HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import RTooltip from "../common/tooltip";

export const MemberCard = (props: any) => {
  let { name, alt, platoon, desig, dept } = props;
  const { public_id } = props;
  name = name?.length > 0 ? name : "<Name with Rank>";
  alt = alt?.length > 0 ? `Picture of ${name}` : "";
  platoon = platoon?.length > 0 ? `${platoon}  platoon` : "<Platoon>";
  desig = desig?.length > 0 ? desig : "<Designation>";
  dept = dept?.length > 0 ? dept : "<Department>";
  return (
    <div className="flex aspect-[2/1] max-w-96 overflow-clip border bg-gradient-to-t from-muted/80 to-muted/40 shadow-md backdrop-blur-sm xs:rounded-md">
      {public_id != null ? (
        <CldImage
          className="aspect-[250/188] max-w-[38%] select-none border-r bg-background"
          width={250}
          height={187.5}
          src={public_id}
          alt={alt}
        />
      ) : (
        <div className="grid w-[200px] select-none place-items-center border-r bg-background xs:w-[250px]">
          <SquareUser className="mx-auto my-auto h-24 w-24 text-muted" />
        </div>
      )}
      <div className="flex w-full grow flex-col items-center justify-between py-3 sm:py-4">
        <div>
          <div className="mx-auto mb-2 w-fit rounded-full border border-foreground/10 bg-muted px-4 py-1">
            <p className="text-xs font-semibold tracking-wider text-foreground/70 dark:text-muted-foreground">
              {platoon}
            </p>
          </div>
          <h3 className="max-w-44 text-center text-sm font-bold">{name}</h3>
        </div>
        <div className="self-start pl-3 text-left text-xs font-medium dark:text-muted-foreground xs:pl-4">
          <p className="mb-1 font-semibold text-foreground">{desig}</p>
          <p>{dept}</p>
          <span>Anna University</span>
        </div>
      </div>
    </div>
  );
};

export const AnoCard: React.FC<{ ano: SelectAno }> = ({ ano }) => {
  const isAlumni = ano.end_date != null;
  return (
    <div
      className={cn(
        "group relative xs:rounded-md",
        !isAlumni ? "shadow-2xl shadow-primary/20 ring-1 ring-muted" : "",
      )}
    >
      <MemberCard
        key={ano.id}
        name={ano.name}
        public_id={ano.public_id}
        alt={ano.alt}
        platoon={ano.platoon}
        desig={ano.desig}
        dept={ano.dept}
      />

      {isAlumni && <AlumniIndicator />}
    </div>
  );
};

export const CadetCard: React.FC<{ cadet: SelectCadet }> = ({ cadet }) => {
  const isLeader =
    cadet.rank === "CSUO" ||
    cadet.rank === "CUO" ||
    cadet.rank === "CSM" ||
    cadet.rank === "CQMS";

  const isAlumni = cadet.end_date.getFullYear() < new Date().getFullYear();

  return (
    <div
      className={cn(
        "group relative xs:rounded-md",
        isLeader ? "shadow-2xl shadow-primary/20 ring-1 ring-muted" : "",
      )}
    >
      <MemberCard
        key={cadet.id}
        name={cadet.name}
        public_id={cadet.public_id}
        alt={cadet.alt}
        platoon={cadet.platoon}
        desig={cadet.desig}
        dept={cadet.dept}
      />

      {isAlumni && <AlumniIndicator />}
    </div>
  );
};

export const MemberCardSkeleton = () => {
  return (
    <div className="flex aspect-[17/8] w-full max-w-96 overflow-clip border bg-gradient-to-t from-muted/80 to-muted/40 shadow-md backdrop-blur-sm xs:rounded-md">
      <Skeleton className="grid w-60 place-items-center rounded-none border-r bg-background">
        <SquareUser className="mx-auto my-auto h-24 w-24 text-muted" />
      </Skeleton>
      <div className="flex w-full flex-col items-center py-3 sm:py-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="mt-3 h-3 w-40" />
        <div className="mt-auto flex w-full flex-col gap-2 px-3">
          <Skeleton className="h-2.5 w-20" />
          <Skeleton className="h-2.5 w-full opacity-30" />
          <Skeleton className="h-2.5 w-24 opacity-30" />
        </div>
      </div>
    </div>
  );
};

const AlumniIndicator = () => {
  return (
    <div className="absolute bottom-0 right-0 flex select-none items-center rounded-tl-sm border-b border-r bg-background p-1 px-2 text-primary xs:rounded-br-md">
      <HeartHandshake className="mr-1 h-3.5 w-3.5" />
      <div className="text-xs font-semibold">Alumni</div>
    </div>
    // <RTooltip
    //   content={
    //     <span className="font-semibold tracking-wide text-primary">Alumni</span>
    //   }
    //   side="bottom"
    //   className="bg-background"
    // >
    //   <div className="absolute bottom-0 right-0 flex select-none items-center rounded-tl-sm border-b border-r bg-background p-1 px-2 text-primary xs:rounded-br-md">
    //     <HeartHandshake className="h-3.5 w-3.5 mr-2" />
    //   </div>
    // </RTooltip>
  );
};
