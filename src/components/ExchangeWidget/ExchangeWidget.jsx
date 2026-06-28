import { useState } from "react";
import "currency-flags/dist/currency-flags.css";
import { useRates } from "../../hooks/useRates";
import { ArrowUpDown, Loader } from "lucide-react";
import { ExchangeItem } from "../ExchangeItem/ExchangeItem";

export function ExchangeWidget({ currencies, isLoadingCurrencies }) {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [baseCurrencySymbol, setBaseCurrencySymbol] = useState("$");
  const [quoteCurrency, setQuoteCurrency] = useState("UAH");
  const [quoteCurrencySymbol, setQuoteCurrencySymbol] = useState("₴");
  const [amount, setAmount] = useState(1000);

  const [isOpenBaseSelect, setIsOpenBaseSelect] = useState(false);
  const [isOpenQuoteSelect, setIsOpenQuoteSelect] = useState(false);

  const { data: ratesData, isLoading: isRatesLoading } = useRates(
    baseCurrency,
    quoteCurrency,
  );

  const rate = ratesData?.[0]?.rate ?? null;
  const convertedAmount = rate ? (amount * rate).toFixed(2) : "";

  return (
    <div className="exchange-widget card">
      <h2 className="exchange-widget__title">Sell {baseCurrency}</h2>
      <p className="exchange-widget__info">
        1 {baseCurrency} ={" "}
        {isRatesLoading ? <Loader size={16} className="loader" /> : rate}{" "}
        {quoteCurrency}
      </p>

      <div className="exchange-widget__items">
        <ExchangeItem
          amount={amount}
          setAmount={setAmount}
          isOpenSelect={isOpenBaseSelect}
          setIsOpenSelect={setIsOpenBaseSelect}
          data={currencies}
          currency={baseCurrency}
          setCurrency={setBaseCurrency}
          isLoading={isLoadingCurrencies}
          isRatesLoading={isRatesLoading}
          currencySymbol={baseCurrencySymbol}
          setCurrencySymbol={setBaseCurrencySymbol}
        />

        <div className="exchange-widget__direction">
          <button
            className="button"
            onClick={() => {
              setBaseCurrency(quoteCurrency);
              setQuoteCurrency(baseCurrency);
            }}
          >
            <ArrowUpDown size={20} />
          </button>
        </div>

        <ExchangeItem
          amount={convertedAmount}
          readOnly={true}
          isOpenSelect={isOpenQuoteSelect}
          setIsOpenSelect={setIsOpenQuoteSelect}
          data={currencies}
          currency={quoteCurrency}
          setCurrency={setQuoteCurrency}
          isLoading={isLoadingCurrencies}
          isRatesLoading={isRatesLoading}
          currencySymbol={quoteCurrencySymbol}
          setCurrencySymbol={setQuoteCurrencySymbol}
        />
      </div>
    </div>
  );
}
