import { useCallback, useEffect, useState } from 'react'
import  InputBox  from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'


function App() {
    const [amount, setAmount] = useState(null)
    const [from, setFrom] = useState('usd')
    const [to, setTo] = useState('inr')
    const [convertedAmount, setConvertedAmount] = useState(null)

    const currencyInfo = useCurrencyInfo(from)

    const options = Object.keys(currencyInfo)

    const convert = useCallback(() => {
        setConvertedAmount(amount * currencyInfo[to]);
    },[amount, currencyInfo, to])
    const swap = () => {
        setFrom(to)
        setTo(from)
    }

    useEffect(() => {
        convert();
    }, [from, to, amount, convert]);

    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://img.freepik.com/free-vector/hand-drawn-flat-design-stock-market-concept_23-2149167961.jpg')`,
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
                                onCurrencyChange={(currency) =>  setFrom(currency) } // setTrom(currency) to set the currency from other the input box
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
                                label="to"
                                amount={convertedAmount || null}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setTo(currency)} // setTo(currency) to set the currency from other the input box
                                selectCurrency={to} // selectCurrency={from} to select the currency from the input box    
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

export default App
