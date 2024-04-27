import { useState } from "react";
import CurrencyDropdown from "./dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const convertAmount = (amount, fromCurrency, toCurrency) => {
  const forexRateZWL = 33903;
  const forexRateZiG = 0.10;

  let convertedAmount;
  if (fromCurrency === "ZWL" && toCurrency === "ZiG") {
    convertedAmount = amount * (1 / forexRateZiG);
  } else if (fromCurrency === "ZiG" && toCurrency === "ZWL") {
    convertedAmount = amount * forexRateZiG;
  } else if (fromCurrency === "ZWL" && toCurrency === "USD") {
    convertedAmount = amount / forexRateZWL;
  } else if (fromCurrency === "USD" && toCurrency === "ZWL") {
    convertedAmount = amount * forexRateZWL;
  } else if (fromCurrency === "ZiG" && toCurrency === "USD") {
    convertedAmount = amount / (forexRateZWL * forexRateZiG);
  } else if (fromCurrency === "USD" && toCurrency === "ZiG") {
    convertedAmount = amount * (forexRateZWL * forexRateZiG);
  } else {
    // Invalid conversion
    return null;
  }

  return convertedAmount.toFixed(2);
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("ZiG");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);

  const convertCurrency = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const convertedAmount = convertAmount(amount, fromCurrency, toCurrency);
      setConvertedAmount(convertedAmount);
    } catch (error) {
      console.error("Error Fetching", error);
    } finally {
      setConverting(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        ZiG Converter
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropdown
          title="From:"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
        />
        {/* swap currency button */}
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>
        <CurrencyDropdown
          title="To:"
          currency={toCurrency}
          setCurrency={setToCurrency}
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount:
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={convertCurrency}
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          ${converting ? "animate-pulse" : ""}`}
        >
          Convert
        </button>
      </div>

      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-green-600">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;