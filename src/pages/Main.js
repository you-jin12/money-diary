import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../css/Main.module.css"
import Button from "../components/Button";
import Header from "../components/Header";
import Calendar from "../components/Calendar";

const mockData = [
    3000, 2500, 1500, 7000, 4500, 2000, 3300, 1200, 8000, 5000,
    2700, 6000, 3100, 1800, 9000, 2200, 3400, 2800, 1500, 7500,
    2600, 1700, 6400, 2900, 3700, 4300, 3900, 5100, 5800, 6600
];
function Main() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentDate, setCurrentDate] = useState(new Date().getDate());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentDay, setCurrentDay] = useState(new Date().getDay(`{currentYear}-{currentMonth}-{currentDate}`)); //현재 요일


    async function authUser() {
        try {
            const response = await fetch(`localhost:8080/calendar?year=${currentYear}&month=${currentMonth}`, {
                method: "GET",
                header: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("accessToken")
                },
            });
        } catch (err) {
            alert("다시 로그인 해주세요!");
            navigate("/login");
        }
    }

    function onClickPrevMonth() {
        if (currentMonth <= 1) {
            setCurrentYear(prev => prev - 1);
            setCurrentMonth(12);
        } else {
            setCurrentMonth(prev => prev - 1);
        }
    }
    function onClickNextMonth() {
        if (currentMonth >= 12) {
            setCurrentYear(prev => prev + 1);
            setCurrentMonth(1);
        } else {
            setCurrentMonth(prev => prev + 1);
        }
    }

    useEffect(() => {
        // authUser();
        setLoading(true);
    }, [currentMonth, currentYear])


    return (
        <div className={style.root}>
            <Header />
            {loading ?
                <div className={style.wrapper_root}>
                    <div className={style.header}>
                        <Button text="<"
                            type="button"
                            onClick={onClickPrevMonth} />
                        <div className={style.date}>
                            <h2 className={style.year}>{currentYear}년</h2>
                            <h1 className={style.month}>{currentMonth}월</h1>
                        </div>
                        <Button text=">"
                            type="button"
                            onClick={onClickNextMonth} />
                    </div>
                    <Calendar currentYear={currentYear} currentMonth={currentMonth} />
                </div>
                : null}
        </div>
    );
}

export default Main;