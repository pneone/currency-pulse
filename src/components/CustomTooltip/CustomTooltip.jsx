export function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="currency-card__tooltip">
      <p className="currency-card__tooltip-date">{label}</p>
      <p className="currency-card__tooltip-rate">{payload[0].value} ₴</p>
    </div>
  );
}
