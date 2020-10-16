import React, { useState } from "react";
import { DataQuery } from "@dhis2/app-runtime";
import styles from "./App.module.css";

import RadioButtons from "./components/RadioButtons";
import Organisation from "./components/Organisation";
import CalendarComponent from "./components/CalendarComponent";
import UserInfo from "./components/UserInfo";
import Loader from "./components/Loader";
import Error from "./components/Error";
import ContactModal from "./components/ContactModal";
import TotalCases from "./components/TotalCases";

/* Query for getting the users information */
const query = {
  me: {
    resource: "me",
  },
};

/* Query for getting one index/contact case */
const personQuery = {
  trackedEntityInstances: {
    resource: "trackedEntityInstances/QG0e3EvdHFp",
    params: {
      fields: "*",
    },
  },
};

/* Query for getting all index cases */
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

/* Query for getting all contacts cases */
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

/* Query for getting all index/contact cases */
const bothQuery = {
  trackedEntityInstances: {
    resource: "trackedEntityInstances",
    params: {
      ou: "JwnjhjVgXP2",
      programStatus: "COMPLETED",
      fields: "*",
    },
  },
};

/* Query for getting all cases with status completed */
//TODO: Make this get contact cases as well, need testdata to reflect this. We only have index cases with status completed.
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
  /* State for if any index case has its overview clicked, then shows modal */
  const [clickedModal, setClickedModal] = useState(false);

  /* State for dateRange, used for filtering workload */
  const [dateRange, setDateRange] = useState(new Date());

  /* State for total number of displayed workload */
  const [totalCases, setTotalCases] = useState();

  /* State for radio buttons */
  const [clicked, setClicked] = useState("Index");

  //TODO: Add Caching, just presets for this.
  const [index, setIndex] = useState();
  const [contacts, setContacts] = useState();
  const [both, setBoth] = useState();
  const [completed, setCompleted] = useState();

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
      <DataQuery query={personQuery}>
        {({ error, loading, data }) => {
          console.log("Person : ", data);
          if (error) return <Error />;
          if (loading) return <Loader />;
          return <></>;
        }}
      </DataQuery>
      {clickedModal && <ContactModal setClickedModal={setClickedModal} />}
      {console.log(clickedModal)}
    </div>
  );
};

export default MyApp;
