import React, { useCallback } from 'react';

function InputBox({
  label,                
  amount,               
  onAmountChange,       
  onCurrencyChange,     
  currencyOptions = [], 
  selectCurrency = "usd", 
  amountDisabled = false,  
  currencyDisable = false, 
  className = "",       
}) {
  const amountInputId = React.useId();

  // Memoized onChange handler for amount input
  const handleAmountChange = useCallback((e) => {
    const value = e.target.value;
    if (onAmountChange) {
      onAmountChange(value); 
    }
  }, [onAmountChange]);

  // Memoized onChange handler for currency select
  const handleCurrencyChange = useCallback((e) => {
    if (onCurrencyChange) {
      onCurrencyChange(e.target.value);
    }
  }, [onCurrencyChange]);

  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
      <div className="w-1/2">
        <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
          {label}
        </label>
        {/* Input box for amount */}
        <input
          id={amountInputId}
          className="outline-none w-full bg-transparent py-1.5"
          type="number"
          placeholder="Amount"
          disabled={amountDisabled}
          value={amount || ""} 
          onChange={handleAmountChange}
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        {/* Currency dropdown */}
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectCurrency}
          onChange={handleCurrencyChange}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default React.memo(InputBox);
