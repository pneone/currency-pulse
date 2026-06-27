import { useQuery } from "@tanstack/react-query";
import { getRates } from "../services/frankfurter";

export const useRates = (baseCurrency, quoteCurrency) => {
  return useQuery({
    queryKey: ["rates", baseCurrency, quoteCurrency],
    queryFn: () => getRates(baseCurrency, quoteCurrency),
    staleTime: 1000 * 60 * 5,
  });
};
