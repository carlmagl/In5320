import React, { useState } from "react";
import { DataQuery } from "@dhis2/app-runtime";
import styles from "./App.module.css";
import RadioButtons from "./components/RadioButtons";
import CasesList from "./components/CasesList";
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

  const [dateFilter, setDateFilter] = useState();

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <DataQuery query={query}>
          {({ error, loading, data }) => {
            if (error) return <Error />;
            if (loading) return <Loader />;
            console.log("Me:", data.me.organisationUnits[0]);
            return (
              <>
                <div className={styles.menu}>
                  <UserInfo />
                  <RadioButtons setClicked={setClicked} />
                  <CalendarComponent
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    setDateFilter={setDateFilter}
                  />
                  <TotalCases dateRange={dateRange} totalCases={totalCases} />
                </div>
                <>
                  {clicked === "Index" && (
                    <CasesList
                      query={indexQuery}
                      dateRange={dateRange}
                      setTotalCases={setTotalCases}
                      setClickedModal={setClickedModal}
                      clikedCase={clicked}
                      dateFilter={dateFilter}
                    />
                  )}
                  {clicked === "Contacts" && (
                    <CasesList
                      query={contactsQuery}
                      dateRange={dateRange}
                      setTotalCases={setTotalCases}
                      setClickedModal={setClickedModal}
                      clikedCase={clicked}
                      dateFilter={dateFilter}
                    />
                  )}
                  {clicked === "Both" && (
                    <CasesList
                      query={bothQuery}
                      dateRange={dateRange}
                      setTotalCases={setTotalCases}
                      setClickedModal={setClickedModal}
                      clikedCase={clicked}
                      dateFilter={dateFilter}
                    />
                  )}
                  {clicked === "Completed" && (
                    <CasesList
                      query={completedQuery}
                      dateRange={dateRange}
                      setTotalCases={setTotalCases}
                      setClickedModal={setClickedModal}
                      clikedCase={clicked}
                      dateFilter={dateFilter}
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
  );
};

export default MyApp;
