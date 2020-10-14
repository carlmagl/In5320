import React, { useState } from "react";
import { DataQuery } from "@dhis2/app-runtime";

const WebTracker = (id) => {
  const query = {
    WebTracker: {
      resource: "dhis-web-tracker-capture/index.html",
      params: {
        program: "DM9n1bUw8W8",
      },
    },
  };
  return (
    <DataQuery query={query}>
      {({ error, loading, data }) => {
        if (error) return <span>ERROR</span>;
        //TODO: Add centeredcontent on this, so loading ... comes in the middle of the page.
        if (loading) return <span>...</span>;
        console.log(data.trackedEntityInstances.trackedEntityInstances);
        console.log(
          data.trackedEntityInstances.trackedEntityInstances.enrollments
            ? data.trackedEntityInstances.trackedEntityInstances.enrollments
            : "nan"
        );
        return <></>;
      }}
    </DataQuery>
  );
};

export default WebTracker;
