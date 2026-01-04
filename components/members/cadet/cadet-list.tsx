"use client";

import { useEffect, useState, useTransition } from "react";
import { getCadetsByYear, getYears } from "@/db/queries/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Skeleton } from "@/components//ui/skeleton";
import { CadetCard, MemberCardSkeleton } from "../cards";
import { getOrganizedCadetsByYear, OrganizedCadets } from "@/lib/transforms";
import { parseAsInteger, useQueryState } from "nuqs";
import SelectBatch from "./select-batch";

const CadetList = () => {
  const [isLoading, startTransition] = useTransition();
  const currentYear = new Date().getFullYear();
  const [years, setYears] = useState<number[]>([]);
  const [batch, setBatch] = useQueryState(
    "batch",
    parseAsInteger
      .withDefault(currentYear)
      .withOptions({ startTransition, history: "push" }),
  );

  const { isPending: isYearsPending, mutate: fetchYears } = useMutation({
    mutationKey: ["getYears"],
    mutationFn: getYears,
    onSuccess: (data) => {
      setYears(data);
    },
    onError: (error) => {
      toast.error("Failed to get years", {
        description: error.message,
      });
    },
  });

  const { data: cadets = [], isLoading: isPending } = useQuery({
    queryKey: ["cadets", batch],
    queryFn: () => getCadetsByYear(batch || currentYear),
  });

  useEffect(() => {
    fetchYears();
  }, [fetchYears]);

  if (isPending || isLoading || isYearsPending) {
    return <CadetListSkeleton />;
  }

  const organizedCadets: OrganizedCadets = getOrganizedCadetsByYear(cadets);

  return (
    <div className="relative">
      <div className="-top-[4.4rem] right-2 mb-4 flex items-center justify-center gap-4 sm:absolute sm:mb-0">
        <SelectBatch onSelect={setBatch} selectedYear={batch} years={years} />
      </div>
      <div className="space-y-12">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="mx-auto flex w-fit flex-col gap-6">
            {organizedCadets.csuo.map((cadet) => {
              return <CadetCard key={cadet.id} cadet={cadet} />;
            })}
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex flex-col gap-6">
              {organizedCadets.eng_cuo.map((cadet) => {
                return <CadetCard key={cadet.id} cadet={cadet} />;
              })}
            </div>
            <div className="flex flex-col gap-6">
              {organizedCadets.eme_cuo.map((cadet) => {
                return <CadetCard key={cadet.id} cadet={cadet} />;
              })}
            </div>
            <div className="flex flex-col gap-6">
              {organizedCadets.sig_cuo.map((cadet) => {
                return <CadetCard key={cadet.id} cadet={cadet} />;
              })}
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex flex-col gap-6">
              {organizedCadets.csm.map((cadet) => {
                return <CadetCard key={cadet.id} cadet={cadet} />;
              })}
            </div>
            <div className="flex flex-col gap-6">
              {organizedCadets.cqms.map((cadet) => {
                return <CadetCard key={cadet.id} cadet={cadet} />;
              })}
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {organizedCadets.others.map((cadet) => {
              return <CadetCard key={cadet.id} cadet={cadet} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadetList;

const CadetListSkeleton = () => {
  return (
    <div className="relative">
      <div className="-top-[4.4rem] right-2 mb-4 flex items-center justify-center gap-4 sm:absolute sm:mb-0">
        <Skeleton className="h-[38px] w-[120px] rounded-lg" />
      </div>

      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex justify-center">
          <MemberCardSkeleton />
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
            <MemberCardSkeleton key={i} />
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {Array.from({ length: 2 }, (_, i) => i).map((_, i) => (
            <MemberCardSkeleton key={i} />
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {Array.from({ length: 12 }, (_, i) => i).map((_, i) => (
            <MemberCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
