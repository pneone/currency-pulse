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
  currencySymbol,
  setCurrencySymbol,
}) {
  return (
    <div className="exchange-widget__curency">
      <div className="exchange-widget__curency-wrapper">
        <div className="exchange-widget__input">
          <div className="exchange-widget__symbol">{currencySymbol}</div>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>

        {isLoading ? (
          <Loader className="exchange-widget__loader" />
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
