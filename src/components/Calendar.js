import style from "../css/Calendar.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Calendar({ currentYear, currentMonth }) {

    const navigate = useNavigate();
    const [calendarArr, setCalendarArr] = useState([[]]);
    const [isChangeCalendar, setIsChangeCalendar] = useState(false);

    const firstDay = new Date(`${currentYear}-${currentMonth}-1`).getDay(); //현재 월의 첫번째 요일(6)

    const dayArr = ['일', '월', '화', '수', '목', '금', '토'];
    const lastDateArr = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    async function getTotalExpenseMoney() { //동기로 할지 생각해봄 
        try {
            const response = await fetch(`/response?year=${currentYear}&month=${currentMonth}`, {
                method: "GET",
                mode: "cors"
            }); //배열로 값 들어옴 
            //이거 전에 응답 성공 여부 확인하는 로직 필요? 
            setTotalMoeny(await response.json());
        } catch (err) {
            console.log(err);
            //에러페이지 이동
        };
    }

    function setTotalMoeny(response) {
        response = response[0].data;
        const calendarArr2 = JSON.parse(JSON.stringify(calendarArr));
        var index = 1;
        calendarArr2.map(row => {
            row.map(obj => {
                if (obj.date === index) {
                    obj.totalMoney = response[index - 1].totalMoney;
                    index++;
                }
            })
        })
        setCalendarArr(calendarArr2);
    }

    // [1000,2000,3000,30004,5000] 서버에서 이렇게 보내주면 안되나?
    function makeCalendar() {

        var dateArr = [new Array(7).fill(null).map(() => ({ date: null, totalMoney: 0 }))];
        var dayCounter = 1;
        for (var i = firstDay; i < 7; i++) {
            dateArr[0][i] = { date: dayCounter++, totalMoney: 0 };
        }
        while (dayCounter < lastDateArr[currentMonth]) {
            var row = new Array(7).fill(null).map(() => ({ date: null, totalMoney: 0 }))
            for (var i = 0; i < 7; i++) {
                if (dayCounter > lastDateArr[currentMonth]) {
                    break;
                }
                row[i] = { date: dayCounter++, totalMoney: 0 };
            }
            dateArr.push(row);
        }

        setCalendarArr(dateArr);
        setIsChangeCalendar(true);
    }


    function onClickMoneyDetail(event) {
        const query = dateFormat(currentMonth, event.currentTarget.id);
        navigate(`/detail?date=${query}`, { state: { year: currentYear, month: currentMonth, date: event.currentTarget.id } });
    }

    function dateFormat(month, date) {
        var formatDate = "";
        if (month < 10) {
            month = "0" + month;
        }
        if (date < 10) {
            date = "0" + date;
        }

        return `${currentYear}${month}${date}`;
    }

    useEffect(() => {
        makeCalendar();
    }, [currentYear, currentMonth]);

    useEffect(() => {
        if (isChangeCalendar === true) {
            setIsChangeCalendar(false);
            getTotalExpenseMoney();
        }
    }, [calendarArr, isChangeCalendar]);

    return (
        <table className={style.calendar}>
            <thead className={style.calendar_header}>
                <tr>
                    {dayArr.map((item) =>
                    (<td>
                        <div>
                            {item}
                        </div>
                    </td>))}
                </tr>
            </thead>
            <tbody className={style.calendar_body}>
                {calendarArr.map((row) => (
                    <tr>
                        {row.map((obj) => (
                            <td onClick={onClickMoneyDetail} id={obj.date}>
                                <div>
                                    {obj.date}
                                </div>
                                <div className={style.calendar_expense_amount}>
                                    {obj.totalMoney === 0 ? null : `-${obj.totalMoney}₩`}
                                </div>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table >);
}

export default Calendar;