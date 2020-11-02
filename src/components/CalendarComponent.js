import React from "react";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import styles from ".././App.module.css";

const CalendarComponent = (props) => {
  function onChange(nextValue) {
    props.setDateRange(nextValue);
  }

  return (
    <Calendar
      onChange={onChange}
      value={props.dateRange}
      selectRange
      showWeekNumbers
      onClick={console.log(props.dateRange)}
    />
  );
};

export default CalendarComponent;
