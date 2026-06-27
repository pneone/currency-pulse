import { useState } from "react";
import "currency-flags/dist/currency-flags.css";
import { useCurrencies } from "../../hooks/useCurrencies";
import { useRates } from "../../hooks/useRates";
import { ChevronDown, FastForward } from "lucide-react";
import { ExchangeItem } from "../ExchangeItem/ExchangeItem";

export function ExchangeWidget() {
  const [baseCurrency, setBaseCurrency] = useState("AUD");
  const [baseCurrencySymbol, setBaseCurrencySymbol] = useState("$");
  const [quoteCurrency, setQuoteCurrency] = useState("USD");
  const [quoteCurrencySymbol, setQuoteCurrencySymbol] = useState("$");
  const [amount, setAmount] = useState(1000);

  const [isOpenBaseSelect, setIsOpenBaseSelect] = useState(false);
  const [isOpenQuoteSelect, setIsOpenQuoteSelect] = useState(false);

  //   const { rate, isRateLoading, isRateError } = useRates(
  //     baseCurrency,
  //     quoteCurrency,
  //   );

  const { data, isLoading } = useCurrencies();
  console.log(data);

  return (
    <div className="exchange-widget card">
      <h2 className="exchange-widget__title">Sell {baseCurrency}</h2>
      <p className="exchange-widget__info">
        1 {baseCurrency} = {quoteCurrency}
      </p>

      <ExchangeItem
        amount={amount}
        setAmount={setAmount}
        isOpenSelect={isOpenBaseSelect}
        setIsOpenSelect={setIsOpenBaseSelect}
        data={data}
        currency={baseCurrency}
        setCurrency={setBaseCurrency}
        isLoading={isLoading}
        currencySymbol={baseCurrencySymbol}
        setCurrencySymbol={setBaseCurrencySymbol}
      />

      <ExchangeItem
        amount={amount}
        setAmount={setAmount}
        isOpenSelect={isOpenQuoteSelect}
        setIsOpenSelect={setIsOpenQuoteSelect}
        data={data}
        currency={quoteCurrency}
        setCurrency={setQuoteCurrency}
        isLoading={isLoading}
        currencySymbol={quoteCurrencySymbol}
        setCurrencySymbol={setQuoteCurrencySymbol}
      />
    </div>
  );
}
