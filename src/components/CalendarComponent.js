import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { Breakpoint, BreakpointProvider } from "react-socks";

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
        />
      </Breakpoint>
      <Breakpoint medium down>
        <DateRangePicker
          onChange={onChange}
          value={props.dateRange}
          selectRange
          showWeekNumbers
        />
      </Breakpoint>
    </>
  );
};

export default CalendarComponent;
