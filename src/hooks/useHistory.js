import { useQuery } from "@tanstack/react-query";
import { getHistory } from "../services/frankfurter";

export const useHistory = (baseCurrency) => {
  return useQuery({
    queryKey: ["history", baseCurrency],
    queryFn: () => getHistory(baseCurrency),
    staleTime: 1000 * 60 * 60,
  });
};
