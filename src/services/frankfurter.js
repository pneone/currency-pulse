const BASE_URL = "https://api.frankfurter.dev/v2";

export const getCurrencies = async () => {
  const response = await fetch(`${BASE_URL}/currencies`);

  if (!response.ok) {
    throw new Error("Не вдалось отримати список валют");
  }

  return response.json();
};

export const getRates = async (baseCurrency, quoteCurrency) => {
  const response = await fetch(
    `${BASE_URL}/rates?base=${baseCurrency}&quotes=${quoteCurrency}`,
  );

  if (!response.ok) {
    throw new Error("Не вдалось отримати курси валют");
  }

  return response.json();
};

export const getHistory = async (baseCurrency, days = 7) => {
  const from = new Date();
  from.setDate(from.getDate() - days);
  const fromDate = from.toISOString().split("T")[0];

  const response = await fetch(
    `${BASE_URL}/rates?base=${baseCurrency}&from=${fromDate}&quotes=UAH`,
  );

  if (!response.ok) {
    throw new Error("Не вдалось отримати історію курсів");
  }

  return response.json();
};
