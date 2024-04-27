import { useState } from "react";
import "./timePicker.css";
const timesOfDay = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
];
// const todayObj = dayjs();

export default function Calendar({ dayObj }) {
    // const handleDaySelect = (e) => {
    //     e.preventDefault();
    //     const s = document.querySelectorAll(".selected");
    //     for (const d of s) d.classList.remove("selected");
    //     e.target.classList.add("selected");
    //     setDayObj(dayObj.set("date", e.target.textContent));
    // };

    const handleTimeSelect = (e) => {
        e.preventDefault();
        const s = document.querySelectorAll(".time-selected");
        for (const d of s) d.classList.remove("time-selected");
        e.target.classList.add("time-selected");
        dayObj
            .set("hour", e.target.textContent.substring(0, 2))
            .set("minute", e.target.textContent.substring(3));
    };

    return (
        <>
            <div className="timePicker">
                {timesOfDay.map((t) => (
                    <div
                        className="time-cell"
                        key={t}
                        onClick={handleTimeSelect}
                    >
                        {t}
                    </div>
                ))}
            </div>
        </>
    );
}
