import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import dayjs from "dayjs";
import range from "lodash-es/range";
import "./calendar.css";
import Navbar from "../../components/navbar/Navbar"; import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';
import { BsCalendarCheck } from "react-icons/bs";
const toArray = require("dayjs/plugin/toArray");
dayjs.extend(toArray);

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
const todayObj = dayjs();
export default function Calendar() {
    const viewusername = useParams().username;
    const [viewuser, setViewuser] = useState();
    const { user: currentUser } = useContext(AuthContext);

    const [appsDoctor, setAppsDoctor] = useState([]);
    const [busyTimesOfDay, setBusyTimesOfDay] = useState([]);

    const [dayObj, setDayObj] = useState(dayjs());
    const [dummyDay, setDummyDay] = useState(dayjs());
    const thisYear = dayObj.year();
    const thisMonth = dayObj.month();
    const daysInMonth = dayObj.daysInMonth();
    const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`);
    const weekDayOf1 = dayObjOf1.day();
    const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`);
    const weekDayOfLast = dayObjOfLast.day();

    const handlePrev = () => {
        setDayObj(dayObj.subtract(1, "month"));
        setDummyDay(dummyDay.subtract(1, "month"));
    };

    const handleNext = () => {
        setDayObj(dayObj.add(1, "month"));
        setDummyDay(dummyDay.add(1, "month"));
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        const dayArr = dayObj.toArray(); // [year, month, day, minute, second]
        console.log(dayArr);
        // const bookingStartDate = new Date(dayArr[0], dayArr[1], dayArr[2], dayArr[3], dayArr[4]);
        const bookingStartDate =
            (dayArr[1] + 1).toString() +
            "-" +
            dayArr[2].toString() +
            "-" +
            dayArr[0].toString() +
            " " +
            dayArr[3].toString() +
            ":" +
            dayArr[4].toString();
        console.log(bookingStartDate);
        if (dayArr[4] === 30) {
            // dayArr[3]++;
            dayArr[4] = 59;
        }
        const bookingEndDate =
            (dayArr[1] + 1).toString() +
            "-" +
            dayArr[2].toString() +
            "-" +
            dayArr[0].toString() +
            " " +
            dayArr[3].toString() +
            ":" +
            dayArr[4].toString();
        const newAppointment = {
            doctorId: viewuser._id,
            customerId: currentUser._id,
            bookingStartDate: bookingStartDate,
            bookingEndDate: bookingEndDate,
        };
        try {
            await axios.post("/api/appointments/booking", newAppointment);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchViewuser = async () => {
            const user = await axios.get(`/api/doctors?doctorname=${viewusername}`);
            console.log(user.data);
            setViewuser(user.data);
        };
        fetchViewuser();
    }, [viewusername]);

    useEffect(() => {
        const fetchAppsDoctor = async () => {
            const appsForDoctor = await axios.get(
                `/api/appointments/${viewuser._id}`
            );
            setAppsDoctor(appsForDoctor.data);
        };
        fetchAppsDoctor();
    }, [viewuser]);

    const handleDaySelect = (e) => {
        e.preventDefault();
        const s = document.querySelectorAll(".selected");
        for (const d of s) d.classList.remove("selected");
        e.target.classList.add("selected");
        setDayObj(dayObj.set("date", e.target.textContent));
        setDummyDay(dummyDay.set("date", e.target.textContent));
    };

    const handleTimeSelect = (e) => {
        e.preventDefault();
        if (!busyTimesOfDay.includes(e.target.textContent)) {
            const s = document.querySelectorAll(".time-selected");
            for (const d of s) d.classList.remove("time-selected");
            e.target.classList.add("time-selected");
            setDayObj(
                dayObj
                    .set("hour", e.target.textContent.substring(0, 2))
                    .set("minute", e.target.textContent.substring(3))
            );
        } else {
            alert(
                "Very sorry, the Doctor is busy for this time! Please choose another time"
            );
        }
    };

    const checkBusyTimesInDay = (day, apps) => {
        const busyTimes = [];
        for (const app of apps) {
            const temp = dayjs(app.bookingStartDate);
            if (day.isSame(temp, "day")) {
                for (const time of timesOfDay) {
                    if (
                        parseInt(time.substring(0, 2)) === temp.get("hour") &&
                        parseInt(time.substring(3)) === temp.get("minute")
                    )
                        busyTimes.push(time);
                }
            }
        }
        console.log(busyTimes);
        return busyTimes;
    };

    useEffect(() => {
        setBusyTimesOfDay(checkBusyTimesInDay(dummyDay, appsDoctor));
    }, [dummyDay]);

    return (
        <>
            <Navbar />
            <div className="calendarWrapper">
                <div className="header">
                
                    {/* <button
                        type="button"
                        className="header--button"
                        onClick={handlePrev}
                    >
                        <HiArrowNarrowLeft/>&nbsp;Previous Month
                    </button> */}
                    <div className="btn btn-lg btn-secondary d-flex align-items-center" onClick={handlePrev}>
                        <HiArrowNarrowLeft/>&nbsp;Previous Month
                    </div>
                    <span className="header--selected-title">Selected Time</span>
                    <div className="header--selected-time">
                        {dayObj.format("MMM DD YYYY HH:mm")}
                    </div>
                    {/* <button
                        type="button"
                        className="header--button"
                        onClick={handleNext}
                    >
                        Next Month&nbsp;<HiArrowNarrowRight/>
                    </button> */}
                    <div className="btn btn-lg btn-secondary d-flex align-items-center" onClick={handleNext}>
                        Next Month&nbsp;<HiArrowNarrowRight/>
                    </div>
                </div>
                <div className="calendar">
                    <div className="week-container">
                        {weekDays.map((d) => (
                            <div className="week-cell" key={d}>
                                {d}
                            </div>
                        ))}
                    </div>
                    <div className="day-container">
                        {range(weekDayOf1).map((i) => (
                            <div className="day-cell day-cell--faded" key={i}>
                                {dayObjOf1
                                    .subtract(weekDayOf1 - i, "day")
                                    .date()}
                            </div>
                        ))}

                        {range(daysInMonth).map((i) => (
                            <div
                                className={`day-cell day-cell--in-month${
                                    i + 1 === todayObj.date() &&
                                    thisMonth === todayObj.month() &&
                                    thisYear === todayObj.year()
                                        ? " day-cell--today"
                                        : ""
                                }`}
                                key={i}
                                onClick={handleDaySelect}
                            >
                                {i + 1}
                            </div>
                        ))}

                        {range(6 - weekDayOfLast).map((i) => (
                            <div className="day-cell day-cell--faded" key={i}>
                                {dayObjOfLast.add(i + 1, "day").date()}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="timePicker">
                    {timesOfDay.map((t) => {
                        if (busyTimesOfDay.includes(t))
                            return (
                                <div
                                    className="time-cell busyTime"
                                    key={t}
                                    onClick={handleTimeSelect}
                                >
                                    {t}
                                </div>
                            );
                        else
                            return (
                                <div
                                    className="time-cell"
                                    key={t}
                                    onClick={handleTimeSelect}
                                >
                                    {t}
                                </div>
                            );
                    })}
                </div>
                <div className="bottom-container justify-content-center">
                    {/* <button className="bottom-container--button" onClick={handleBooking}>
                        <span className="bottom-container--button--text">Book an Appointment&nbsp;<BsCalendarCheck/></span>
                    </button> */}
                    <div className="btn btn-lg btn-success d-flex align-items-center" onClick={handleBooking}>
                        Book an Appointment&nbsp;<BsCalendarCheck/>
                    </div>
                </div>
            </div>
        </>
    );
}
