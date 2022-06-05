import styled from "styled-components";
import React, {useContext, useEffect, useState} from "react";
import {stepContext} from '../App'
//console.log(`head stepContext: ${JSON.stringify(stepContext)}`)
const Head = styled.div`
border-bottom: 1px solid lightgray;
display: grid;
grid-template-rows: 1fr;
grid-template-columns: 12% 88%; 
`

const HeadCalendar = styled.div`
display: grid;
grid-template-rows: 22% 41% 37%;
grid-template-columns: 1fr;
`
const HeaderCalendarDays = styled.div`
display: grid;
grid-template-columns: repeat(7, 1fr);
align-items: center;
text-align: center;
`
const HeaderCalendarDaysItem = styled.div`
`

const HeaderCalendarDates = styled.div`
display: grid;
grid-template-columns: repeat(7, 1fr);
align-items: center;
text-align: center;
`
const HeaderCalendarDatesItem = styled.button`

border-radius: 50%;
width: 40px;
height: 40px;
margin: 0 auto;
font-size: 28px;
background-color: white;
border: none;

:focus {

}
&.selected-date-head {
background-color: #ff3131;
color: white;
}
`

const HeaderCalendarMonthYear = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`
const HeaderCalendarMonthYearButton = styled.div`
color: red;
font-size: 28px;
cursor: pointer;
margin-left: 25px;
margin-right: 25px;
`
const HeaderCalendarMonthYearTitle = styled.div`
font-size: 22px;
`

/*day, weeks and etc in milliseconds*/
const DAY = 86400000
const WEEK = 604800000
const MONTH_L = 2678400000
const MONTH_S = 2592000000
const MONTH_FebL = 2505600000
const MONTH_FebS = 2419200000


let currentDate = new Date()
let currentYear = currentDate.toLocaleString('en', {year: 'numeric'})
let currentMonth = currentDate.toLocaleString('en', {month: 'long'})
let currentMonthYear = currentDate.toLocaleString('en', {month: 'long', year: 'numeric'})
let currentDay = currentDate.toLocaleString('en', {day: 'numeric'})
let currentWeekday = currentDate.toLocaleString('en', {weekday: 'long'})//.charAt(0)

/*let firstDayD = currentDate.getDate() - currentDate.getDay() + 1
let lastDayD = firstDayD + 6
let firstDay = new Date(new Date().setDate(firstDayD)).toLocaleString('en', {day: 'numeric'})
let firstWeekday = new Date(new Date().setDate(firstDayD)).toLocaleString('en', {weekday: 'long'})
let lastDay = new Date(new Date().setDate(lastDayD)).toLocaleString('en', {day: 'numeric'})
let lastWeekday = new Date(new Date().setDate(lastDayD)).toLocaleString('en', {weekday: 'long'})

/!*let currentDayName = currentDate.getDay()
let lastMonthDay = (new Date(currentYear,currentMonth,0)).getDate()*!/
console.log(firstDay)
console.log(firstWeekday)
console.log(lastDay)
console.log(lastWeekday)*/

let getMonthYear = (step) => {
    /*console.log(step)*/
    // +6 т.к. неделя начинается с воскресенья, а нам надо доставать неделю текущей даты
    let firstDayD = currentDate.getDate() - currentDate.getDay() + step + 6
    let year = new Date(new Date().setDate(firstDayD)).getUTCFullYear()
    let month = new Date(new Date().setDate(firstDayD)).toLocaleString('en', {month: 'long'})
    return String(month + ' ' + year)
}

let getWeek = (step) => {
    // step - шаг недли 7 (умножаем когда жмем кнопку, см. ниже)
    //console.log('started week')
    let start = step + 7
    let currentWeek = []
    for (let i = step; i < start; i++) {
        // +1 т.к. по дефолту нделя считается с воскресенья
        //console.log(i)
        let firstDayD = currentDate.getUTCDate() - currentDate.getUTCDay() + i + 1
        let firstDay = new Date(new Date().setDate(firstDayD)).toLocaleString('en', {day: 'numeric'})
        let firstDayWeek = new Date(new Date().setDate(firstDayD)).toLocaleString('en', {weekday: 'long'})
        console.log(firstDay)
        currentWeek.push(([firstDay, firstDayWeek]))
    }
    console.log(currentWeek)
    return currentWeek
}

let selectDate = (x, event) => {
    /*console.log(`clicked: ${x}`)
    console.log(`clicked event: ${event.target}`)*/
    Array.from(document.getElementsByClassName("selected-date-head")).map(i => {
        i.classList.remove("selected-date-head")
    })
    event.currentTarget.classList.add("selected-date-head")
}

export const CalendarHead = () => {
    let {stepWeek, setWeekStep} = useContext(stepContext) //0
    let [monthYear, setMonthYear] = useState(getMonthYear(0))
    let [currentWeekState, setCurrentWeekState] = useState(getWeek(stepWeek))
    //console.log(`start stepWeek: ${stepWeek}`)
    useEffect(() => {
            //console.log(currentWeekState)
            setCurrentWeekState(getWeek(7 * stepWeek))
            setMonthYear(getMonthYear(7 * stepWeek))
        }, [stepWeek]
    )

    return (
        <Head>
            <div/>
            <HeadCalendar>
                <HeaderCalendarDays>
                    {
                        [...Array(['Monday', 'M'],
                            ['Tuesday', 'T'],
                            ['Wednesday', 'W'],
                            ['Thursday', 'T'],
                            ['Friday', 'F'],
                            ['Saturday', 'S'],
                            ['SundaySunday', 'S']).map(i => {
                            return <HeaderCalendarDaysItem key={Math.random()} id={i[0]}><b>{i[1]}</b>
                            </HeaderCalendarDaysItem>
                        })]
                    }
                </HeaderCalendarDays>

                <HeaderCalendarDates>
                    {
                        currentWeekState.map(i => {
                            if (i[0] == currentDay && i[1] == currentWeekday) {
                                return <HeaderCalendarDatesItem className="selected-date-head"
                                                                key={i[0]}
                                    /*onClick={(event) => {
                                        selectDate(i, event)
                                    }}*/>
                                    {i[0]}
                                </HeaderCalendarDatesItem>
                            } else {
                                return <HeaderCalendarDatesItem
                                    key={i}
                                    /*onClick={(event) => {
                                        selectDate(i, event)
                                    }}*/>
                                    {i[0]}
                                </HeaderCalendarDatesItem>
                            }
                        })
                    }
                </HeaderCalendarDates>

                <HeaderCalendarMonthYear>
                    <HeaderCalendarMonthYearButton
                        onClick={() => {
                            setWeekStep(stepWeek - 1)
                        }}>
                        &lt;</HeaderCalendarMonthYearButton>

                    <HeaderCalendarMonthYearTitle>{monthYear}</HeaderCalendarMonthYearTitle>

                    <HeaderCalendarMonthYearButton
                        onClick={() => {
                            setWeekStep(stepWeek + 1)
                        }}>
                        &gt;</HeaderCalendarMonthYearButton>
                </HeaderCalendarMonthYear>
            </HeadCalendar>
        </Head>
    )
}