import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {stepContext} from "../App";

const Body = styled.div`
display: grid;
grid-template-rows: 1fr;
grid-template-columns: 12% 88%;
overflow-y: scroll;
`
const Clocks = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 0 auto; 
`
const ClocksItem = styled.div`
width: 100%;
height: 50px;
display: flex;
align-items: center;
`
const Squares = styled.div`
display: grid;
grid-template-columns: repeat(7, 1fr);
grid-template-rows: 25px repeat(24, 1fr) 25px;
cursor: pointer;
`
const SquaresItem = styled.div`
border-top: 1px solid lightgray;
border-right: 1px solid lightgray;
height: 50px;
box-sizing: border-box;

&.fulfilled-date-body {
background-color: #ebecff;
}
&.selected-date-body {
background-color: #b3b7ff; 
}
`

let selectDate = (x, event) => {
    Array.from(document.getElementsByClassName("selected-date-body")).map(i => {
        i.classList.remove("selected-date-body")
    })
    event.currentTarget.classList.add("selected-date-body")
}

export const CalendarBody = () => {
    //массив дат, каждая дата разбита по 24 часа
    let clocks = []
    for (let clock = 0; clock < 25; clock++) {
        if (clock < 10) {
            clocks.push(`0${clock}:00`)
        } else {
            clocks.push(`${clock}:00`)
        }
    }
    let currentDate = new Date()
    let getSquares = (step) => {
        let squares = []
        let start = step + 7

        for (let time = 0; time < 24; time++) {
            for (let day = step; day < start; day++) {
                let firstDayD = currentDate.getDate() - currentDate.getDay() + day + 1
                let date = (new Date(new Date().setDate(firstDayD))
                    .toLocaleString('en', {month: 'long', day: 'numeric'}))
                if (time < 10) {
                    squares.push(date + ` 0${time}:00`)
                } else {
                    squares.push(date + ` ${time}:00`)
                }
            }
        }

        squares = squares.map(i => {
            if (plan.indexOf(i) !== -1) {
                return ({value: i, itemClass: 'fulfilled-date-body'})
            } else {
                return ({value: i, itemClass: ''})
            }
        })
        //console.log(squares)
        return squares
    }
    let {stepWeek, setWeekStep, selectTime, setSelectTime, plan, setPlan} = useContext(stepContext)
    let [times, setTimes] = useState(getSquares(stepWeek))
    useEffect(() => {
            setTimes(getSquares(7 * stepWeek))
        }, [stepWeek, plan]
    )


    return (
        <Body>
            <Clocks>

                {clocks.map(i => {
                    return <ClocksItem key={Math.random()}>{i}</ClocksItem>
                })}

            </Clocks>
            <Squares>
                {[...Array(7)].map(i => {
                    return <div style={{borderRight: "1px solid lightgray"}}
                                key={Math.random()}>{i}</div>
                })}

                {
                    times.map(i => {
                        return <SquaresItem key={Math.random()}
                                            id={i.value}
                                            className={`${i.itemClass}`}
                                            onClick={(event) => {
                                                setSelectTime(i.value)
                                            }}
                        >
                        </SquaresItem>
                    })
                }

                {[...Array(7)].map(i => {
                    return <div style={{borderRight: "1px solid lightgray", borderTop: "1px solid lightgray"}}
                                key={Math.random()}>
                        {i}</div>
                })}
                <div className="fulfilled-date-body"/>
            </Squares>
        </Body>
    )
}