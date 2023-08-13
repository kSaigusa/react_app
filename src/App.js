import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(new Date());
  const [timer, setTimer] = useState({ hour: 0, min: 0, sec: 0 });
  const [money, setMoney] = useState({ noonMoney: 0, nightMoney: 0, totalMoney: 0 });
  // const [totalMoney, setTotalMoney] = useState(0);
  // const [noonMoney, setNoonMoney] = useState(0);
  // const [nightMoney, setNightMoney] = useState(0);
  const [previousMinutes, setPreviousMinutes] = useState(null);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (isStarted) {
      const intervalId = setInterval(() => {
        countUp();
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isStarted, timer, money]);

  const countUp = () => {
    let { hour, min, sec } = timer;
    let { noonMoney, nightMoney, totalMoney } = money;

    sec++;

    if (sec === 60) {
      min++;
      sec = 0;
    }
    if (min === 60) {
      hour++;
      min = 0;
    }
    if (hour === 24) {
      hour = 0;
    }

    // money logic
    const currentHours = time.getHours();
    if (8 <= currentHours && currentHours <= 19) {
      if (min !== previousMinutes && min === 0 && noonMoney !== 700) {
        nightMoney = 0;
        setPreviousMinutes(min);
        noonMoney += 100;
        totalMoney = noonMoney;
      }
    } else {
      if (min !== previousMinutes && min === 0 && nightMoney !== 200) {
        noonMoney = 0;
        setPreviousMinutes(min);
        noonMoney += 100;
        totalMoney = noonMoney;
      }
    }

    setTimer({ hour, min, sec });
    setMoney({ noonMoney, nightMoney, totalMoney});
  };

  return (
    <div className="App">
      <p>{time.toLocaleTimeString()}</p>
      <p>
        {String(timer.hour).padStart(2, '0')}:
        {String(timer.min).padStart(2, '0')}:
        {String(timer.sec).padStart(2, '0')}
      </p>
      <p>{money.totalMoney}円</p>
      <button onClick={() => setIsStarted(true)} disabled={isStarted}>
        スタート
      </button>
      <button onClick={() => window.location.reload()}>リセット</button>
    </div>
  );
}

export default App;
