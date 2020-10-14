import React, { useState } from "react";
import { DataQuery } from "@dhis2/app-runtime";
import { Radio } from "@dhis2/ui-core";
import i18n from "@dhis2/d2-i18n";
import styles from "./App.module.css";

import Organisation from "./components/Organisation.js";
import { CalendarComp } from "./components/Calendar.js";
import WebTracker from "./components/WebTracker.js";
import UserInfo from "./components/UserInfo";
import { ContactModule } from "./components/ContactModule";

const query = {
  me: {
    resource: "me"
  }
};

const bothQuery = {
  trackedEntityInstances: {
    resource: "trackedEntityInstances",
    params: {
      ou: "JwnjhjVgXP2",
      fields: "*"
    }
  }
};

const activeQuery = {
  trackedEntityInstances: {
    resource: "trackedEntityInstances",
    params: {
      ou: "JwnjhjVgXP2",
      program: "uYjxkTbwRNf",
      programStatus: "ACTIVE",
      fields: "*"
    }
  }
};

const contactsQuery = {
  trackedEntityInstances: {
    resource: "trackedEntityInstances",
    params: {
      ou: "JwnjhjVgXP2",
      program: "DM9n1bUw8W8",
      programStatus: "ACTIVE",
      fields: "*"
    }
  }
};

const completedQuery = {
  trackedEntityInstances: {
    resource: "trackedEntityInstances",
    params: {
      ou: "JwnjhjVgXP2",
      program: "uYjxkTbwRNf",
      programStatus: "COMPLETED",
      fields: "*"
    }
  }
};

const MyApp = () => {
  const [clickedModal, setClickedModal] = useState(false);
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

                {both && (
                  <Organisation
                    query={bothQuery}
                    setClickedModal={setClickedModal}
                  />
                )}
                {index && (
                  <Organisation
                    query={activeQuery}
                    setClickedModal={setClickedModal}
                  />
                )}
                {contacts && (
                  <Organisation
                    query={contactsQuery}
                    setClickedModal={setClickedModal}
                  />
                )}
                {completed && (
                  <Organisation
                    query={completedQuery}
                    setClickedModal={setClickedModal}
                  />
                )}
              </>
            </>
          );
        }}
      </DataQuery>
      <WebTracker />

      {clickedModal && <ContactModule setClickedModal={setClickedModal} />}
      {console.log(clickedModal)}
    </div>
  );
};

export default MyApp;
