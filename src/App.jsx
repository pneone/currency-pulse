import { CurrencyCard } from "./components/CurrencyCard/CurrencyCard";
import { ExchangeWidget } from "./components/ExchangeWidget/ExchangeWidget";
import { useCurrencies } from "./hooks/useCurrencies";

function App() {
  const { data, isLoading } = useCurrencies();

  return (
    <div className="container mx-auto min-h-screen flex items-center">
      <div className="wrapper">
        <CurrencyCard currencies={data} isLoadingCurrencies={isLoading} />
        <ExchangeWidget currencies={data} isLoadingCurrencies={isLoading} />
      </div>
    </div>
  );
}

export default App;
