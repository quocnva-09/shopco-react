import { useMatches } from "react-router-dom";
import { type BreadcrumbItem } from "@/components/molecules/Breadcrumb";

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const matches = useMatches();

  const crumbs = matches
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((match: any) => Boolean(match.handle?.crumb))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((match: any) => match.handle.crumb(match.data))
    .flat();

  return crumbs;
};
