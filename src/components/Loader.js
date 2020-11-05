import React from "react";
import { CircularLoader } from "@dhis2/ui";
import styles from ".././App.module.css";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Loading data</h2>
      <CircularLoader dataTest="dhis2-uicore-circularloader" />
    </div>
  );
};

export default Loader;
