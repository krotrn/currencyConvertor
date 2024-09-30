import { useCallback, useEffect, useState, useMemo } from 'react';
import InputBox from './components/InputBox';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
    const [amount, setAmount] = useState(0); // State to store the amount to be converted
    const [from, setFrom] = useState('usd'); // State to store the currency to convert from
    const [to, setTo] = useState('inr'); // State to store the currency to convert to
    const [convertedAmount, setConvertedAmount] = useState(0); // State to store the converted amount

    const currencyInfo = useCurrencyInfo(from); // Hook to get currency information based on the 'from' currency

    const options = useMemo(() => Object.keys(currencyInfo), [currencyInfo]); // Get the list of available currency options

    const convert = useCallback(() => {

        setConvertedAmount(amount * currencyInfo[to]); // Convert the amount based on the selected currencies

    }, [amount, currencyInfo, to]);

    const swap = () => {
        setFrom(to); // Swap the 'from' currency with the 'to' currency
        setTo(from); // Swap the 'to' currency with the 'from' currency
    };

    useEffect(() => {
        convert(); // Convert the amount whenever 'from', 'to', or 'amount' changes
    }, [from, to, amount, convert]);

    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://img.freepik.com/free-vector/business-risk-analysis_53876-90454.jpg?t=st=1726342224~exp=1726345824~hmac=2ffb339c3d84667b6db169a69701127c3424ed65c823b53fd6f75824eef0fc53&w=996')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert();
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setFrom(currency)} // setFrom(currency) to set the currency from the input box
                                selectCurrency={from} // selectCurrency={from} to select the currency from the input box    
                                amountDisabled={false}
                                onAmountChange={(amount) => setAmount(amount || null)}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                SWAP
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount || null}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setTo(currency)} // setTo(currency) to set the currency from the input box
                                selectCurrency={to} // selectCurrency={to} to select the currency from the input box    
                                amountDisabled={true}
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
