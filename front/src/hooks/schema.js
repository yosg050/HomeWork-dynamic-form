import { useQuery } from "@tanstack/react-query";
import { getSchema } from "@/api/schema";

export function useSchema() {
  return useQuery({
    queryKey: ["schema"],
    queryFn: getSchema,
    staleTime: 60_000,
  });
}
