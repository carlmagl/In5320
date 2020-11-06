import React, { useState } from "react";
import { DataQuery } from "@dhis2/app-runtime";
import styles from "./App.module.css";
import { Breakpoint, BreakpointProvider } from "react-socks";
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

/* Query for getting all index cases */
function indexQuery(orgUnit) {
  let ou = orgUnit ? orgUnit : "JwnjhjVgXP2";
  //TODO: Remove, this is for development
  if (ou === "BPzJYNBjmwO") ou = "JwnjhjVgXP2";
  return {
    trackedEntityInstances: {
      resource: "trackedEntityInstances/",
      params: {
        ou: ou,
        program: "uYjxkTbwRNf",
        programStatus: "ACTIVE",
        programStage: "oqsk2Jv4k3s",
        fields: "*",
      },
    },
  };
}

/* Query for getting all contacts cases */
function contactsQuery(orgUnit) {
  let ou = orgUnit ? orgUnit : "JwnjhjVgXP2";
  //TODO: Remove, this is for development
  if (ou === "BPzJYNBjmwO") ou = "JwnjhjVgXP2";
  return {
    trackedEntityInstances: {
      resource: "trackedEntityInstances/",
      params: {
        ou: ou,
        program: "DM9n1bUw8W8",
        programStatus: "ACTIVE",
        programStage: "sAV9jAajr8x",
        fields: "*",
      },
    },
  };
}

/* Query for getting all index/contact cases */
function bothQuery(orgUnit) {
  let ou = orgUnit ? orgUnit : "JwnjhjVgXP2";
  //TODO: Remove, this is for development
  if (ou === "BPzJYNBjmwO") ou = "JwnjhjVgXP2";
  return {
    trackedEntityInstances: {
      resource: "trackedEntityInstances/",
      params: {
        ou: ou,
        fields: "*",
      },
    },
  };
}

/* Query for getting all cases with status completed */
//TODO: Make this get contact cases as well, need testdata to reflect this. We only have index cases with status completed.
function completedIndexQuery(orgUnit) {
  let ou = orgUnit ? orgUnit : "JwnjhjVgXP2";
  //TODO: Remove, this is for development
  if (ou === "BPzJYNBjmwO") ou = "JwnjhjVgXP2";
  return {
    trackedEntityInstances: {
      resource: "trackedEntityInstances/",
      params: {
        ou: ou,
        program: "uYjxkTbwRNf",
        programStatus: "COMPLETED",
        fields: "*",
      },
    },
  };
}

function completedContactsQuery(orgUnit) {
  let ou = orgUnit ? orgUnit : "JwnjhjVgXP2";
  //TODO: Remove, this is for development
  if (ou === "BPzJYNBjmwO") ou = "JwnjhjVgXP2";
  return {
    trackedEntityInstances: {
      resource: "trackedEntityInstances/",
      params: {
        ou: ou,
        program: "DM9n1bUw8W8",
        programStatus: "COMPLETED",
        fields: "*",
      },
    },
  };
}

const MyApp = () => {
  /* State for if any index case has its overview clicked, then shows modal */
  const [clickedModal, setClickedModal] = useState();

  /* State for dateRange, used for filtering workload */
  const [dateRange, setDateRange] = useState(new Date());

  /* State for total number of displayed workload */
  const [totalCases, setTotalCases] = useState();

  /* State for radio buttons */
  const [clicked, setClicked] = useState("Index");

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
              return (
                <>
                  <>
                    {clicked === "Index" && (
                      <CasesList
                        query={indexQuery(data.me.organisationUnits[0].id)}
                        dateRange={dateRange}
                        setTotalCases={setTotalCases}
                        setClickedModal={setClickedModal}
                        clikedCase={clicked}
                      />
                    )}
                    {clicked === "Contacts" && (
                      <CasesList
                        query={contactsQuery(data.me.organisationUnits[0].id)}
                        dateRange={dateRange}
                        setTotalCases={setTotalCases}
                        setClickedModal={setClickedModal}
                        clikedCase={clicked}
                      />
                    )}
                    {clicked === "Both" && (
                      <CasesList
                        query={bothQuery(data.me.organisationUnits[0].id)}
                        dateRange={dateRange}
                        setTotalCases={setTotalCases}
                        setClickedModal={setClickedModal}
                        clikedCase={clicked}
                      />
                    )}
                    {clicked === "Completed Contacts" && (
                      <CasesList
                        query={completedContactsQuery(
                          data.me.organisationUnits[0].id
                        )}
                        dateRange={dateRange}
                        setTotalCases={setTotalCases}
                        setClickedModal={setClickedModal}
                        clikedCase={clicked}
                      />
                    )}
                    {clicked === "Completed Index" && (
                      <CasesList
                        query={completedIndexQuery(
                          data.me.organisationUnits[0].id
                        )}
                        dateRange={dateRange}
                        setTotalCases={setTotalCases}
                        setClickedModal={setClickedModal}
                        clikedCase={clicked}
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
        </div>
      </div>
    </BreakpointProvider>
  );
};

export default MyApp;
