import { useQuery } from "@tanstack/react-query";
import { getCurrencies } from "../services/frankfurter";

export const useCurrencies = () => {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
    staleTime: 1000 * 60 * 60,
  });
};
