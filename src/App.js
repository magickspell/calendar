import './App.css';
import {CalendarWrapper, MainWrapper} from "./StyledComponents/MainWrapper";
import React, {useContext, useState} from "react";
import {CalendarFooter} from "./StyledComponents/CalendarFooter";
import {CalendarBody} from "./StyledComponents/CalendarBody";
import {CalendarHead} from "./StyledComponents/CalendarHead";
import {Header} from "./StyledComponents/Head";

export const stepContext = React.createContext({});

const App = () => {
    //массив запалнированных событий
    let plannedArray = [
        'May 29 10:00', 'May 30 06:00', 'May 30 08:00',
        'May 31 08:00', 'June 1 08:00', 'June 2 08:00',
        'June 3 08:00', 'June 4 08:00', 'June 5 08:00',
        'June 5 10:00', 'June 7 00:00', 'June 6 00:00',
        'June 9 00:00', 'June 11 00:00', 'June 12 00:00',
        'June 13 00:00', 'June 15 00:00', 'June 17 00:00',
        'June 19 00:00', 'June 21 00:00', 'June 23 00:00',
    ]

    let [stepWeek, setWeekStep] = useState(0)
    let [selectTime, setSelectTime] = useState({})
    let [plan, setPlan] = useState(plannedArray)

    return (
        <MainWrapper>
            <CalendarWrapper>
                <stepContext.Provider value={
                    {
                        stepWeek, setWeekStep,
                        selectTime, setSelectTime,
                        plan, setPlan
                    }
                }>
                    <Header/>
                    <CalendarHead/>
                    <CalendarBody/>
                    <CalendarFooter/>
                </stepContext.Provider>
            </CalendarWrapper>
        </MainWrapper>
    );
}

export default App