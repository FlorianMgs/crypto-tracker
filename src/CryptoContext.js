import React, { createContext, useEffect, useState } from 'react'


const CryptoContext = createContext()


export function CryptoPovider({children}) {
    const [currentCurrency, setCurrentCurrency] = useState('USD');
    const [symbol, setSymbol] = useState('$');

    useEffect(() => {
        if (currentCurrency === 'USD') {
            setSymbol('$')
        } else {
            setSymbol('€')
        }
    }, [currentCurrency])

    return (
        <CryptoContext.Provider value={{currentCurrency, symbol, setCurrentCurrency}}>
            {children}
        </CryptoContext.Provider>
    )
}


export default CryptoContext;