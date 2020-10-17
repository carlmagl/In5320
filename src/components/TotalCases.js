import React, { useState } from "react";
import moment from "moment";

const TotalCases = (props) => {
  return (
    <>
      {Array.isArray(props.dateRange) && (
        <>
          <h2>
            From: {moment(props.dateRange[0]).format("DD/MM")} to:{" "}
            {moment(props.dateRange[1]).format("DD/MM")}
          </h2>
        </>
      )}
      {props.totalCases && <h2>Workload cases: {props.totalCases}</h2>}
    </>
  );
};

export default TotalCases;
