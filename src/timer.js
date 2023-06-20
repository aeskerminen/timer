import { clear } from "@testing-library/user-event/dist/clear"
import { useState, useEffect } from "react"

function Timer() {

    let [totalSeconds, setTotalSeconds] = useState(5)

    let [seconds, setSeconds] = useState(0)
    let [minutes, setMinutes] = useState(0)
    let [hours, setHours] = useState(0)

    let [inputH, setInputH] = useState(0)
    let [inputM, setInputM] = useState(0)
    let [inputS, setInputS] = useState(0)


    let [intervalRef, setIntervalRef] = useState(null)


    const stopHandler = () => {
        clearInterval(intervalRef)
    }

    const startHandler = () => {
        stopHandler()

        if (totalSeconds > 0) {
            const sec = setInterval(() => {
                setTotalSeconds((prev) => prev - 1)
            }, 1000);

            setIntervalRef(sec)

            return () => clearInterval(sec)
        }
    }

    useEffect(() => {
        let sum = (isNaN(inputH) ? 0 : parseInt(inputH)) * 3600 + (isNaN(inputM) ? 0 : parseInt(inputM)) * 60 + (isNaN(inputS) ? 0 : parseInt(inputS))
        console.log(sum)
        setTotalSeconds(sum)
    }, [inputH, inputM, inputS])

    useEffect(() => {
        let h = Math.floor(totalSeconds / 3600)
        let m = Math.floor((totalSeconds - h * 3600) / 60)
        let s = Math.floor((totalSeconds - h * 3600 - m * 60))

        setHours(h)
        setMinutes(m)
        setSeconds(s)

        if (totalSeconds <= 0) {
            stopHandler()
        }
    }, [totalSeconds])

    return (
        <div>
            <div>
                <input onChange={(e) => { setInputH(e.target.value) }}></input>
                <input onChange={(e) => { setInputM(e.target.value) }}></input>
                <input onChange={(e) => { setInputS(e.target.value) }}></input>
            </div>
            <h1>{`Hours: ${hours} Minutes: ${minutes} Seconds: ${seconds}`}</h1>
            <button onClick={startHandler}>START</button>
        </div>
    )
}

export default Timer