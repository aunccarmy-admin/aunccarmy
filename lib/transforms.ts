import { SelectCadet, SelectAno } from "@/db/schema";

const platoonOrder = ["Engineers", "EME", "Signals"];
const rankOrder = [
  "CSUO",
  "CUO",
  "CSM",
  "CQMS",
  "Sgt.",
  "Cpl.",
  "LCpl.",
  "Cdt.",
];

export type OrganizedCadets = {
  csuo: SelectCadet[];
  eme_cuo: SelectCadet[];
  sig_cuo: SelectCadet[];
  eng_cuo: SelectCadet[];
  csm: SelectCadet[];
  cqms: SelectCadet[];
  eme: {
    sergeants: SelectCadet[];
    corporals: SelectCadet[];
    lance_corporals: SelectCadet[];
    cadets: SelectCadet[];
  };
  sig: {
    sergeants: SelectCadet[];
    corporals: SelectCadet[];
    lance_corporals: SelectCadet[];
    cadets: SelectCadet[];
  };
  eng: {
    sergeants: SelectCadet[];
    corporals: SelectCadet[];
    lance_corporals: SelectCadet[];
    cadets: SelectCadet[];
  };
  others: SelectCadet[];
};

export const getOrganizedCadetsByYear = (
  cadets: SelectCadet[],
): OrganizedCadets => {
  return {
    csuo: cadets.filter((c) => c.rank === "CSUO"),
    eng_cuo: cadets.filter(
      (c) => c.rank === "CUO" && c.platoon === "Engineers",
    ),
    eme_cuo: cadets.filter((c) => c.rank === "CUO" && c.platoon === "EME"),
    sig_cuo: cadets.filter((c) => c.rank === "CUO" && c.platoon === "Signals"),
    csm: cadets.filter((c) => c.rank === "CSM"),
    cqms: cadets.filter((c) => c.rank === "CQMS"),
    eng: {
      sergeants: cadets.filter(
        (c) => c.rank === "Sgt." && c.platoon === "Engineers",
      ),
      corporals: cadets.filter(
        (c) => c.rank === "Cpl." && c.platoon === "Engineers",
      ),
      lance_corporals: cadets.filter(
        (c) => c.rank === "Lcpl." && c.platoon === "Engineers",
      ),
      cadets: cadets.filter(
        (c) => c.rank === "Cdt." && c.platoon === "Engineers",
      ),
    },
    eme: {
      sergeants: cadets.filter((c) => c.rank === "Sgt." && c.platoon === "EME"),
      corporals: cadets.filter((c) => c.rank === "Cpl." && c.platoon === "EME"),
      lance_corporals: cadets.filter(
        (c) => c.rank === "Lcpl." && c.platoon === "EME",
      ),
      cadets: cadets.filter((c) => c.rank === "Cdt." && c.platoon === "EME"),
    },
    sig: {
      sergeants: cadets.filter(
        (c) => c.rank === "Sgt." && c.platoon === "Signals",
      ),
      corporals: cadets.filter(
        (c) => c.rank === "Cpl." && c.platoon === "Signals",
      ),
      lance_corporals: cadets.filter(
        (c) => c.rank === "Lcpl." && c.platoon === "Signals",
      ),
      cadets: cadets.filter(
        (c) => c.rank === "Cdt." && c.platoon === "Signals",
      ),
    },
    others: cadets
      .filter(
        (c) =>
          c.rank !== "CSUO" &&
          c.rank !== "CUO" &&
          c.rank !== "CSM" &&
          c.rank !== "CQMS",
      )
      .sort(
        (a, b) =>
          platoonOrder.indexOf(a.platoon) - platoonOrder.indexOf(b.platoon),
      )
      .sort((a, b) => rankOrder.indexOf(a.rank) - rankOrder.indexOf(b.rank)),
  };
};

export const getOrganizedAnos = (anos: SelectAno[]) => {
  const activeAnos = anos
    .filter((ano) => ano.end_date == null)
    .sort(
      (a, b) =>
        platoonOrder.indexOf(a.platoon) - platoonOrder.indexOf(b.platoon),
    );

  const alumniAnos = anos.filter((ano) => ano.end_date != null);

  return {
    active: activeAnos,
    alumni: alumniAnos,
  };
};

export const ensurePrefix = (value: string, prefix: string): string => {
  if (!value) return value;
  if (value.toLowerCase().startsWith(prefix.toLowerCase())) {
    return prefix + value.slice(prefix.length);
  }
  return `${prefix}${value}`;
};

export const transformPasteForPublicId = (
  e: React.ClipboardEvent<HTMLInputElement>,
  prefix: string = "",
  onChange?: (value: string) => void,
) => {
  const value = e.clipboardData.getData("text");
  e.preventDefault();

  const hasPrefix = value.toLowerCase().startsWith(prefix.toLowerCase());
  const valueWithoutPrefix = hasPrefix ? value.slice(prefix.length) : value;

  const transformed = valueWithoutPrefix
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const finalValue = hasPrefix
    ? `${prefix}${transformed}`
    : ensurePrefix(transformed, prefix);
  e.currentTarget.value = finalValue;
  onChange?.(finalValue);
};
