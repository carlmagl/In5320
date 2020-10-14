import React, { useState } from "react";
import { DataQuery } from "@dhis2/app-runtime";
import { Radio } from "@dhis2/ui-core";
import i18n from "@dhis2/d2-i18n";
import styles from "./App.module.css";
import Organisation from "./Components/Organisation.js";
import { CalendarComp } from "./Components/Calendar.js";
import WebTracker from "./Components/WebTracker.js";
import UserInfo from "./Components/UserInfo";
import { RadioBtnComp } from "./Components/RadioButtons.js";

const query = {
  me: {
    resource: "me",
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

const activeQuery = {
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
  const [clicked, setClicked] = useState("Index");

  return (
    <div className={styles.container}>
      <DataQuery query={query}>
        {({ error, loading, data }) => {
          console.log(data);
          if (error) return <span>ERROR</span>;
          if (loading) return <span>...</span>;
          console.log(data.me.organisationUnits[0].id);
          return (
            <>
              <div className={styles.menu}>
                <UserInfo />
                <RadioBtnComp setClicked={setClicked} />
                <CalendarComp />
              </div>
              <>
                {clicked === "Both" && <Organisation query={bothQuery} />}
                {console.log(clicked)}
                {clicked === "Index" && <Organisation query={activeQuery} />}
                {clicked === "Contacts" && (
                  <Organisation query={contactsQuery} />
                )}
                {clicked === "Completed" && (
                  <Organisation query={completedQuery} />
                )}
              </>
            </>
          );
        }}
      </DataQuery>
      <WebTracker />
    </div>
  );
};

export default MyApp;
