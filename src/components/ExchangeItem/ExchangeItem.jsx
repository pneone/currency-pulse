import { ChevronDown, Loader } from "lucide-react";

export function ExchangeItem({
  amount,
  setAmount,
  isOpenSelect,
  setIsOpenSelect,
  data,
  currency,
  setCurrency,
  isLoading = true,
  isRatesLoading = true,
  readOnly = false,
  currencySymbol,
  setCurrencySymbol,
}) {
  return (
    <div className="exchange-widget__curency">
      <div className="exchange-widget__curency-wrapper">
        {isRatesLoading ? (
          <Loader className="loader" />
        ) : (
          <div className="exchange-widget__input">
            <div className="exchange-widget__symbol">{currencySymbol}</div>
            <input
              type="number"
              min="0"
              max="1000000"
              placeholder="0.00"
              value={amount}
              readOnly={readOnly}
              onKeyDown={(e) => {
                if (["-", "+", "e", "E"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={
                readOnly
                  ? undefined
                  : (e) => {
                      const value = e.target.value;
                      if (value < 0) return;
                      if (value > 1_000_000) return;
                      setAmount(value);
                    }
              }
            />
          </div>
        )}

        {isLoading ? (
          <Loader className="loader" />
        ) : (
          <div className="exchange-widget__select">
            <button
              className="exchange-widget__select-btn"
              onClick={() => {
                setIsOpenSelect(!isOpenSelect);
              }}
            >
              <span
                className={`currency-flag currency-flag-${currency.toLowerCase()}`}
              />
              <span className="exchange-widget__selected">{currency}</span>
              <ChevronDown size={20} />
            </button>

            {isOpenSelect && (
              <div className="exchange-widget__options">
                {data &&
                  data
                    .filter((item) => item.iso_code != currency)
                    .map((item) => (
                      <button
                        className="exchange-widget__option"
                        key={item.iso_code}
                        value={item.iso_code}
                        onClick={() => {
                          setCurrency(item.iso_code);
                          setIsOpenSelect(!isOpenSelect);
                          setCurrencySymbol(item.symbol);
                        }}
                      >
                        <span
                          className={`currency-flag currency-flag-${item.iso_code.toLowerCase()}`}
                        />
                        <span>{item.iso_code}</span>
                      </button>
                    ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
