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
  const [clickedModal, setClickedModal] = useState(false);
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
                <CalendarComponent />
              </div>
              <>
                {clicked === "Index" && (
                  <Organisation
                    query={activeQuery}
                    setClickedModal={setClickedModal}
                  />
                )}
                {clicked === "Contacts" && (
                  <Organisation
                    query={contactsQuery}
                    setClickedModal={setClickedModal}
                  />
                )}
                {clicked === "Both" && (
                  <Organisation
                    query={bothQuery}
                    setClickedModal={setClickedModal}
                  />
                )}
                {clicked === "Completed" && (
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
      {clickedModal && <ContactModule setClickedModal={setClickedModal} />}
      {console.log(clickedModal)}
    </div>
  );
};

export default MyApp;
