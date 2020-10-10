import React, { useState } from "react";
import { DataQuery } from "@dhis2/app-runtime";
import { Radio } from "@dhis2/ui-core";
import i18n from "@dhis2/d2-i18n";
import styles from "./App.module.css";
import Organisation from "./components/Organisation.js";
import { CalendarComp } from "./components/Calendar.js";
import UserInfo from "./components/UserInfo";

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
    },
  },
};

const MyApp = () => {
  const [both, setBoth] = useState(false);
  const [index, setIndex] = useState(true);
  const [contacts, setContacts] = useState(false);
  const [completed, setCompleted] = useState(false);
  function resetRadioButtons() {
    setBoth(false);
    setIndex(false);
    setContacts(false);
    setCompleted(false);
  }

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
                <Radio
                  dataTest="dhis2-uicore-radio"
                  label="Both"
                  name="Both"
                  checked={both}
                  onChange={() => {
                    resetRadioButtons();
                    setBoth(true);
                  }}
                  value="default"
                />
                <Radio
                  dataTest="dhis2-uicore-radio"
                  label="Index"
                  name="Index"
                  checked={index}
                  onChange={() => {
                    resetRadioButtons();
                    setIndex(true);
                  }}
                  value="default"
                />
                <Radio
                  dataTest="dhis2-uicore-radio"
                  label="Contacts"
                  name="Contacts"
                  checked={contacts}
                  onChange={() => {
                    resetRadioButtons();
                    setContacts(true);
                  }}
                  value="default"
                />
                <Radio
                  dataTest="dhis2-uicore-radio"
                  label="Completed"
                  name="Completed"
                  checked={completed}
                  onChange={() => {
                    resetRadioButtons();
                    setCompleted(true);
                  }}
                  value="default"
                />
                <CalendarComp />
              </div>
              <>
                {both && <Organisation query={bothQuery} />}
                {index && <Organisation query={activeQuery} />}
                {completed && <Organisation query={completedQuery} />}
              </>
            </>
          );
        }}
      </DataQuery>
    </div>
  );
};

export default MyApp;
