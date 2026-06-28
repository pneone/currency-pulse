import { useState } from "react";
import "currency-flags/dist/currency-flags.css";
import { ChevronDown } from "lucide-react";
import { useHistory } from "../../hooks/useHistory";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "../CustomTooltip/CustomTooltip";

export function CurrencyCard({ currencies, isLoadingCurrencies }) {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const { data, isLoading } = useHistory(selectedCurrency);

  const chartData = data?.map((item) => ({
    day: new Date(item.date).toLocaleDateString("eng-US", {
      day: "numeric",
      month: "short",
    }),
    rate: item.rate,
  }));

  const currentRate = data?.at(-1)?.rate;

  return (
    <div className="currency-card card">
      <div className="currency-card__head">
        <div
          className={`currency-card__select ${isSelectOpen ? "currency-card__select--open" : ""}`}
        >
          <button
            className="currency-card__selected"
            onClick={() => setIsSelectOpen(!isSelectOpen)}
          >
            <span
              className={`currency-flag currency-flag-${selectedCurrency.toLowerCase()}`}
            />
            <span className="currency-card__selected-title">
              {selectedCurrency}
            </span>
            <ChevronDown size={35} className="currency-card__selected-arrow" />
          </button>

          <div className="currency-card__options">
            {currencies &&
              currencies
                .filter((item) => item.iso_code != selectedCurrency)
                .map((item) => (
                  <button
                    className="currency-card__option"
                    key={item.iso_code}
                    value={item.iso_code}
                    onClick={() => {
                      setSelectedCurrency(item.iso_code);
                      setIsSelectOpen(!isSelectOpen);
                    }}
                  >
                    <span
                      className={`currency-flag currency-flag-${item.iso_code.toLowerCase()}`}
                    />
                    <span>{item.iso_code}</span>
                  </button>
                ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <>
          <div className="animate-pulse w-1/2 h-15 bg-grey rounded-[20px] border border-grey mb-4"></div>
          <div className="animate-pulse w-full h-60 bg-grey rounded-[20px] border border-grey"></div>
        </>
      ) : (
        <>
          <div className="currency-card__price">{currentRate} ₴</div>
          <div className="currency-card__chart">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ace700" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ace700" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  hide
                />
                <YAxis
                  domain={["auto", "auto"]}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={60}
                  hide
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#ace700"
                  strokeWidth={2}
                  fill="url(#rateGradient)"
                  dot={{ fill: "#ace700", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
