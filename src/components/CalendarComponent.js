import React from "react";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import styles from ".././App.module.css";
import  { Breakpoint, BreakpointProvider } from 'react-socks';


const CalendarComponent = (props) => {
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
