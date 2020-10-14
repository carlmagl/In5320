import React, { useState } from "react";
import { DataQuery } from "@dhis2/app-runtime";
import styles from "./App.module.css";

import RadioButtons from "./components/RadioButtons";
import Organisation from "./components/Organisation";
import CalendarComponent from "./components/CalendarComponent";
import UserInfo from "./components/UserInfo";
import Loader from "./components/Loader";
import Error from "./components/Error";
import { ContactModule } from "./components/ContactModule";
import TotalCases from "./components/TotalCases";

const query = {
  me: {
    resource: "me",
  },
};

const indexQuery = {
  trackedEntityInstances: {
    resource: "trackedEntityInstances",
    params: {
      ou: "JwnjhjVgXP2",
      program: "uYjxkTbwRNf",
      programStatus: "ACTIVE",
      fields: "*",
    },
  },
};

const contactsQuery = {
  trackedEntityInstances: {
    resource: "trackedEntityInstances",
    params: {
      ou: "JwnjhjVgXP2",
      program: "DM9n1bUw8W8",
      programStatus: "ACTIVE",
      fields: "*",
    },
  },
};

const bothQuery = {
  trackedEntityInstances: {
    resource: "trackedEntityInstances",
    params: {
      ou: "JwnjhjVgXP2",
      fields: "*",
    },
  },
};

const completedQuery = {
  trackedEntityInstances: {
    resource: "trackedEntityInstances",
    params: {
      ou: "JwnjhjVgXP2",
      program: "uYjxkTbwRNf",
      programStatus: "COMPLETED",
      fields: "*",
    },
  },
};

const MyApp = () => {
  const [clickedModal, setClickedModal] = useState(false);
  const [dateRange, setDateRange] = useState(new Date());
  const [totalCases, setTotalCases] = useState();

  const [clicked, setClicked] = useState("Index");

  return (
    <div className={styles.container}>
      <DataQuery query={query}>
        {({ error, loading, data }) => {
          if (error) return <Error />;
          if (loading) return <Loader />;
          return (
            <>
              <div className={styles.menu}>
                <UserInfo />
                <RadioButtons setClicked={setClicked} />
                <CalendarComponent
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />
                <TotalCases dateRange={dateRange} totalCases={totalCases} />
              </div>
              <>
                {clicked === "Index" && (
                  <Organisation
                    query={indexQuery}
                    dateRange={dateRange}
                    setTotalCases={setTotalCases}
                    setClickedModal={setClickedModal}
                  />
                )}
                {clicked === "Contacts" && (
                  <Organisation
                    query={contactsQuery}
                    dateRange={dateRange}
                    setTotalCases={setTotalCases}
                    setClickedModal={setClickedModal}
                  />
                )}
                {clicked === "Both" && (
                  <Organisation
                    query={bothQuery}
                    dateRange={dateRange}
                    setTotalCases={setTotalCases}
                    setClickedModal={setClickedModal}
                  />
                )}
                {clicked === "Completed" && (
                  <Organisation
                    query={completedQuery}
                    dateRange={dateRange}
                    setTotalCases={setTotalCases}
                    setClickedModal={setClickedModal}
                  />
                )}
              </>
            </>
          );
        }}
      </DataQuery>
      {clickedModal && <ContactModule setClickedModal={setClickedModal} />}
      {console.log(clickedModal)}
    </div>
  );
};

export default MyApp;
