  import React, { useState, useEffect, useMemo } from 'react';
  import './App.css';

  function App() {
    const [FetchedCurrency, FetchCurrencies] = useState([])
    const [Exchanged, SetExchanged] = useState()
    let time = new Date().toLocaleString('pl-PL');
    let condition = false;
    const [date, setDate] = useState(time)
    const CalcCurrency = [];  

    const url = "http://api.nbp.pl/api/exchangerates/tables/a/?format=json"
    
    const fetchData = async () => {
      return await fetch(url)
                  .then((res) => res.json())
                  .then((d) => FetchCurrencies(d[0].rates));
    }

    FetchedCurrency.forEach((e) => CalcCurrency[e.code] = e.mid);
    CalcCurrency['PLN'] = 1;


    function Calculate(e){
        e.preventDefault();
        const FromCode = document.querySelector("#FromCurrency").value;
        const ToCode = document.querySelector("#ToCurrency").value;
        const amount = document.querySelector("#amount").value;
        const result = (amount*CalcCurrency[FromCode])/CalcCurrency[ToCode];
        SetExchanged(amount + ' ' + FromCode + ' = ' + result.toFixed(2) + ' ' + ToCode)
    }

    function Swap(){
      let pom = document.querySelector('#FromCurrency').value;
      document.querySelector('#FromCurrency').value = document.querySelector("#ToCurrency").value;
      document.querySelector("#ToCurrency").value = pom;
    }

    useEffect ( () => {
      setTimeout(() => { 
        time = new Date().toLocaleString('pl-PL')
      setDate(time)},1000)
    },[date])

    useEffect (() => {
      if(!condition)
      {
        fetchData();
      }
      return () => {condition = true}
    }, [])

    return (
      <>
        <main>
          <form action="#" onSubmit={Calculate}>
            <h1>Currency Exchanger</h1>
            <label htmlFor="FromCurrency">From: </label>
            <select id="FromCurrency" name="FromCurrency" >
              {FetchedCurrency.map((data, index) => {return(<option key={data.code} value={data.code}>{data.currency + " (" + data.code +")"}</option>)})}
              <option value='PLN'> złoty (PLN)</option>
            </select>
            <label htmlFor="ToCurrency">To: </label>
            <select id="ToCurrency" name="ToCurrency" >
              {FetchedCurrency.map((data, index) => {return(<option key={data.code} value={data.code}>{data.currency + " (" + data.code +")"}</option>)})}
              <option value='PLN'> złoty (PLN)</option>
            </select>
            <input type="number" step='.01' placeholder="Amount" min='1' id="amount" required></input>
            <input type="submit" value='Calculate'></input>
            <input type="submit" value="Swap" onClick={Swap}></input>
            <p>{Exchanged}</p>
            <p>{date}</p>
          </form>
        </main>
      </>
    ) 
  }

  export default App
