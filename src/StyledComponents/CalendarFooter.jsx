import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {stepContext} from "../App";

const Footer = styled.div`
border-top: 1px solid lightgray;
display: flex;
justify-content: space-between;
flex-direction: row;
align-items: center;
color: #ff3131;
font-size: 26px;
`
const TodayButton = styled.div`
margin-left: 25px;
cursor: pointer;
`
const DeleteButton = styled.div`
margin-right: 25px;
cursor: pointer;
`

export const CalendarFooter = () => {

    let {selectTime, setSelectTime, plan, setPlan} = useContext(stepContext)
    let [deleteBut, setDeleteBut] = useState(false)

    //удлить таску аналог в хеде
    let removeTask = () => {
        let el = document.getElementsByClassName('selected-date-body')
        let arr = plan.map(i => i)
        let index = arr.indexOf(el[0].id)
        if (index !== -1) {
            arr.splice(index, 1)
            setPlan(arr)
            setDeleteBut(false)
        }
    }

    useEffect(() => {
        let x = document.getElementById(selectTime)
        if (x) {
            x.classList.add('selected-date-body')
            setDeleteBut(x.className.indexOf('fulfilled-date-body') !== -1)
        }
    }, [selectTime])

    return (
        <Footer>

            <TodayButton
                onClick={() => {
                    alert(`today is ${new Date()}`)
                }}>
                Today
            </TodayButton>
            {
                (deleteBut) ? <DeleteButton onClick={() => {
                    removeTask()
                }}>Delete</DeleteButton> : <div/>
            }
        </Footer>
    )
}