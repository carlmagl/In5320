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

const MyApp = () => {
  const [active, setActive] = useState(false);
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
                  name="Ex"
                  onChange={() => {
                    setActive(true);
                    console.log();
                  }}
                  value="default"
                />{" "}
                <Radio
                  dataTest="dhis2-uicore-radio"
                  label="Index"
                  name="Ex"
                  onChange={() => {
                    setActive(true);
                    console.log();
                  }}
                  value="default"
                />{" "}
                <Radio
                  dataTest="dhis2-uicore-radio"
                  label="Contacts"
                  name="Ex"
                  onChange={() => {
                    setActive(true);
                    console.log();
                  }}
                  value="default"
                />{" "}
                <Radio
                  dataTest="dhis2-uicore-radio"
                  label="Completed"
                  name="Ex"
                  onChange={() => {
                    setActive(true);
                    console.log();
                  }}
                  value="default"
                />
                <CalendarComp />
              </div>
              {data.me.organisationUnits.map((organisation) => (
                <>
                  <Organisation organisation={data.me.organisationUnits} />
                </>
              ))}
            </>
          );
        }}
      </DataQuery>
    </div>
  );
};

export default MyApp;
