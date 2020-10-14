import React from "react";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = () => {
  const [value, setValue] = useState(new Date());

  function onChange(nextValue) {
    setValue(nextValue);
  }

  return (
    <Calendar
      onChange={onChange}
      value={value}
      selectRange={true}
      showWeekNumbers={true}
      onClick={console.log(value)}
    />
  );
};

export default CalendarComponent;
