import React from "react";
import { TableCell } from "@dhis2/ui";
import { DataQuery } from "@dhis2/app-runtime";
import Loader from "./Loader";
import Error from "./Error";
import styles from ".././App.module.css";
import moment from "moment";
import TrackerButton from "./TrackerButton";

/* Query for getting one index/contact case */
function personQuery(personId) {
  return {
    trackedEntityInstances: {
      resource: `trackedEntityInstances/${personId}`,
      params: {
        fields: "*",
      },
    },
  };
}

function checkIfDateHasExpired(dueDate, status) {
  if (moment().diff(dueDate, "days") > 0 && status !== "COMPLETED") {
    return styles.red;
  }
  return "";
}

const ContactCase = (props) => {
  return (
    <DataQuery query={personQuery(props.tei)}>
      {({ error, loading, data }) => {
        if (error) return <Error />;
        if (loading) return <Loader />;
        console.log("contactModal", data.trackedEntityInstances);
        return (
          <>
            <TableCell
              id="Due Date"
              className={checkIfDateHasExpired(
                data.trackedEntityInstances.enrollments[0].events[0].dueDate,
                data.trackedEntityInstances.enrollments[0].status
              )}
            >
              {data.trackedEntityInstances.enrollments[0].events[0].dueDate
                ? moment(
                    data.trackedEntityInstances.enrollments[0].events[0].dueDate
                  ).fromNow()
                : "N/A"}
            </TableCell>
            <TableCell id="Type">
              {data.trackedEntityInstances.programOwners[0].program ===
              "uYjxkTbwRNf"
                ? "INDEX"
                : "CONTACT"}
            </TableCell>
            <TableCell id="First Name">
              {data.trackedEntityInstances.attributes.find(
                (element) => element.attribute === "sB1IHYu2xQT"
              ).value
                ? data.trackedEntityInstances.attributes.find(
                    (element) => element.attribute === "sB1IHYu2xQT"
                  ).value
                : "N/A"}
            </TableCell>
            <TableCell id="Last Name">
              {data.trackedEntityInstances.attributes.find(
                (element) => element.attribute === "ENRjVGxVL6l"
              ).value
                ? data.trackedEntityInstances.attributes.find(
                    (element) => element.attribute === "ENRjVGxVL6l"
                  ).value
                : "N/A"}
            </TableCell>
            <TableCell id="Phone number">
              {data.trackedEntityInstances.attributes.find(
                (element) => element.attribute === "fctSQp5nAYl"
              )
                ? data.trackedEntityInstances.attributes.find(
                    (element) => element.attribute === "fctSQp5nAYl"
                  ).value
                : "N/A"}
            </TableCell>
            <TableCell>
              <TrackerButton
                name="Tracker Capture"
                data={
                  data.trackedEntityInstances.enrollments[0]
                    .trackedEntityInstance
                }
                program={data.trackedEntityInstances.programOwners[0].program}
              />
            </TableCell>
          </>
        );
      }}
    </DataQuery>
  );
};

export default ContactCase;
