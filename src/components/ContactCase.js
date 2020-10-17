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
    const contactCase;
  return (
    <DataQuery query={personQuery(props.tei)}>
      {({ error, loading, data }) => {
        if (error) return <Error />;
        if (loading) return <Loader />;
        console.log("contactModal", data.trackedEntityInstances);
        contactCase = data.trackedEntityInstances;
        return (
          <>
            <TableCell
              id="Due Date"
              className={checkIfDateHasExpired(
                contactCase.enrollments[0].events[0].dueDate,
                contactCase.enrollments[0].status
              )}
            >
              {contactCase.enrollments[0].events[0].dueDate
                ? moment(
                    contactCase.enrollments[0].events[0].dueDate
                  ).fromNow()
                : "N/A"}
            </TableCell>
            <TableCell id="Type">
              {contactCase.programOwners[0].program ===
              "uYjxkTbwRNf"
                ? "INDEX"
                : "CONTACT"}
            </TableCell>
            <TableCell id="First Name">
              {contactCase.attributes.find(
                (element) => element.attribute === "sB1IHYu2xQT"
              ).value
                ? contactCase.attributes.find(
                    (element) => element.attribute === "sB1IHYu2xQT"
                  ).value
                : "N/A"}
            </TableCell>
            <TableCell id="Last Name">
              {contactCase.attributes.find(
                (element) => element.attribute === "ENRjVGxVL6l"
              ).value
                ? contactCase.attributes.find(
                    (element) => element.attribute === "ENRjVGxVL6l"
                  ).value
                : "N/A"}
            </TableCell>
            <TableCell id="Phone number">
              {contactCase.attributes.find(
                (element) => element.attribute === "fctSQp5nAYl"
              )
                ? contactCase.attributes.find(
                    (element) => element.attribute === "fctSQp5nAYl"
                  ).value
                : "N/A"}
            </TableCell>
            <TableCell>
              <TrackerButton
                name="Tracker Capture"
                data={
                  contactCase.enrollments[0]
                    .trackedEntityInstance
                }
                program={contactCase.programOwners[0].program}
              />
            </TableCell>
          </>
        );
      }}
    </DataQuery>
  );
};

export default ContactCase;
