import { useState, useEffect } from 'react';

function ExchangeRates() {
    const [rates, setRates] = useState(null);
    const [base, setBase] = useState("usd");
    const [target, setTarget] = useState("eur");
    const [currencies, setCurrencies] = useState({}); //set to empty object
    const [amount, setAmount] = useState(1);


    //Get list of currencies names
    useEffect(() => {//useEffect to run the code after component renders to avoid infinite useState loop
        fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json") //currencies.json to pull currency names
            .then((response) => response.json())
            .then((data) => setCurrencies(data)) //update useState with data
            .catch((error) => { error.message })
    }, []);//[] to run only once


    //Get rates for base currency
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.json`) //{base}.json to pull rates of original currency
            .then((response) => response.json())
            .then((data) => setRates(data[base])) //to get rates for original currency (shows all conversion rates from base to every other currency)
            .catch((error) => { error.message })
    }, [base]); //rerun when useState {base} changes


    if (!rates) { //handle no rates or loading page
        return <div>Loading rates...</div>;
    }

    const convertedValue = rates[target] ? (amount * rates[target]).toFixed(2) : "No Rates"; //toFixed(2) for 2 decimal places
    //amount in base currency * rate from base to target (rate base to target saved in api as an object)

    return (
        <div className='exchange-rates-box'>
            <h1 className='exchange-rates-text'>Exchange Rates</h1>

            <div className='base-target-currency-container'>
                <label className='base-currency-box'>
                    <p> Starting Currency:</p>
                    <select value={base} onChange={(event) => setBase(event.target.value)}>
                        {Object.keys(currencies).map((name) => ( //currencies useState is an empty object so use Object.keys to map
                            <option value={name} key={name}>
                                {name} - {currencies[name]}
                            </option>
                        ))}
                    </select>
                </label>

                <label className='target-currency-box'>
                    <p> Target Currency:</p>
                    <select value={target} onChange={(event) => setTarget(event.target.value)}>
                        {Object.keys(currencies).map((name) => ( //map(name) for name of currency acronym
                            <option value={name} key={name}>
                                {name} - {currencies[name]}
                            </option>
                        ))}
                    </select>
                </label>

                <div className='amount-input'>
                    <label>
                        <p>Amount of ({base.toUpperCase()}):</p>
                        <input
                            type="number"
                            value={amount}
                            onChange={event => setAmount(Number(event.target.value))} //updates amount state to a number value that is input
                        />
                    </label>
                </div>
            </div>

            <div className='show-exchange'>
                <h1 className='show-exchange-text'>
                    {amount} {base.toUpperCase()} = {convertedValue} {target.toUpperCase()}
                </h1>
            </div>
        </div>
    )
}

export default ExchangeRates;