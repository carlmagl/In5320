import React from "react";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import styles from ".././App.module.css";
import  { Breakpoint, BreakpointProvider } from 'react-socks';


function checkDateRange(dateRange) {
  let todaysDate = getCurrentDate();
  let result = false;
  for (let i = 0; i < dateRange.length; i++) {
    if (dateRange[0].getTime() > todaysDate.getTime()) {
      console.log("rangen er større enn dagens dato");
      result = true;
    } else if (dateRange[1].getTime() < todaysDate.getTime()) {
      console.log("Dato rangen er mindre enn dagens dato");
      result = true;
    } else {
      console.log("dagens dato er i rangen");
      result = false;
    }
  }
  return result;
}

function getCurrentDate() {
  let newDate = new Date();
  return newDate;
}

const CalendarComponent = (props) => {
  console.log("Det funka" + " " + checkDateRange(props.dateRange));

  props.setDateFilter(checkDateRange(props.dateRange));

  function onChange(nextValue) {
    props.setDateRange(nextValue);
  }

  return (
    <>
  <Breakpoint large up>  
  <Calendar
      onChange={onChange}
      value={props.dateRange}
      selectRange
      showWeekNumbers
      onClick={console.log(props.dateRange)}
    /> 
     </Breakpoint>
    
    <Breakpoint medium down> 
    <DateRangePicker
       onChange={onChange}
       value={props.dateRange}
       selectRange
       showWeekNumbers
       onClick={console.log(props.dateRange)}
      /> 
      </Breakpoint>
    
    </>
  );
};

export default CalendarComponent;
