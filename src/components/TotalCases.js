import React, { useState } from "react";
import moment from "moment";
import styles from ".././App.module.css";

const TotalCases = (props) => {
  return (
    <div className={styles.workLoadDiv}>
      {Array.isArray(props.dateRange) && (
        <>
          <h2 className={styles.workLoadText}>
            From: {moment(props.dateRange[0]).format("DD/MM")} to:{" "}
            {moment(props.dateRange[1]).format("DD/MM")}
          </h2>
        </>
      )}
      {props.totalCases && (
        <h2 className={styles.workLoadText}>
          Workload cases: {props.totalCases}
        </h2>
      )}
    </div>
  );
};

export default TotalCases;
