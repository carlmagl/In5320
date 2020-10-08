import React from "react";
import { DataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import classes from "./App.module.css";
import Organisation from "./Organisation.js";
import { CalendarComp } from "./Calendar.js";

const query = {
  me: {
    resource: "me",
  },
};

const MyApp = () => (
  <div className={classes.container}>
    <DataQuery query={query}>
      {({ error, loading, data }) => {
        console.log(data);
        if (error) return <span>ERROR</span>;
        if (loading) return <span>...</span>;
        console.log(data.me.organisationUnits[0].id);
        return (
          <>
            <h1>{i18n.t("Hello {{name}}", { name: data.me.name })}</h1>
            {data.me.organisationUnits.map((organisation) => (
              <>
                <h3 key={organisation.id}>
                  {i18n.t("Organisation =  {{organisation}}", {
                    organisation: organisation.id,
                  })}
                </h3>
                <Organisation organisation={data.me.organisationUnits} />
              </>
            ))}
          </>
        );
      }}
    </DataQuery>
    <CalendarComp />
  </div>
);

export default MyApp;
