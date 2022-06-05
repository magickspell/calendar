import React, {useContext, useEffect} from "react";
import styled from "styled-components";
import {stepContext} from "../App";

export const Head = styled.div`
width: 100%;
border-bottom: 1px solid lightgray;
display: flex;
justify-content: space-between;
align-items: center;
`
export const HeaderTitle = styled.div`
font-size: 32px;
margin-left: 25px;
`
export const HeaderPlusButton = styled.div`
font-size: 48px;
color: #ff3131;
margin-right: 25px;
cursor: pointer;
`

export const Header = () => {

    let {plan, setPlan} = useContext(stepContext)

    let addTask = () => {
        let res = prompt('insert date', `${new Date()
            .toLocaleString('en',{month: "long",day: "numeric"})} 00:00`)
        console.log(res)
        //plan.push(res)
        let arr = plan.map(i => i)
        arr.push(res)
        setPlan(arr)
        return arr
    }
    /*useEffect(() => {
        console.log(' changed times ')
        setPlan(addTask())
    }, [plan])*/

    return (
        <Head>
            <HeaderTitle>Interview Calendar</HeaderTitle>
            <HeaderPlusButton
                onClick={() => {
                    addTask()
                }}
            >+</HeaderPlusButton>
        </Head>
    )
}