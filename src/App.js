import React, { useState } from "react";
import { DataQuery } from "@dhis2/app-runtime";
import styles from "./App.module.css";
import RadioButtons from "./Components/RadioButtons";
import CasesList from "./Components/CasesList";
import CalendarComponent from "./Components/CalendarComponent";
import UserInfo from "./Components/UserInfo";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import ContactModal from "./Components/ContactModal";
import TotalCases from "./Components/TotalCases";
import  { Breakpoint, BreakpointProvider } from 'react-socks';


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
      programStage: "oqsk2Jv4k3s",
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
      programStage: "sAV9jAajr8x",
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
  const [clickedModal, setClickedModal] = useState();

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
    <BreakpointProvider>
    <div className={styles.container}>
      <div className={styles.menu}>
                  <UserInfo />
                  <RadioButtons setClicked={setClicked} />
                  <CalendarComponent
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                  />
                  <TotalCases dateRange={dateRange} totalCases={totalCases} />
                </div>
      <div className={styles.table}>
        <DataQuery query={query}>
          {({ error, loading, data }) => {
            if (error) return <Error />;
            if (loading) return <Loader />;
            console.log("Me:", data.me.organisationUnits[0]);
            return (
              <>
                
                <>
                  {clicked === "Index" && (
                    <CasesList
                      query={indexQuery}
                      dateRange={dateRange}
                      setTotalCases={setTotalCases}
                      setClickedModal={setClickedModal}
                    />
                  )}
                  {clicked === "Contacts" && (
                    <CasesList
                      query={contactsQuery}
                      dateRange={dateRange}
                      setTotalCases={setTotalCases}
                      setClickedModal={setClickedModal}
                    />
                  )}
                  {clicked === "Both" && (
                    <CasesList
                      query={bothQuery}
                      dateRange={dateRange}
                      setTotalCases={setTotalCases}
                      setClickedModal={setClickedModal}
                    />
                  )}
                  {clicked === "Completed" && (
                    <CasesList
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
        {clickedModal && (
          <ContactModal id={clickedModal} setClickedModal={setClickedModal} />
        )}
        {console.log(clickedModal)}
      </div>
    </div>
    </BreakpointProvider>
  );
};

export default MyApp;
