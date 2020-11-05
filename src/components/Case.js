import React, { useState } from "react";
import styles from ".././App.module.css";
import moment from "moment";

import { TableRow, TableCell, Tag } from "@dhis2/ui";
import OverviewButton from "./OverviewButtons";
import TrackerButton from "./TrackerButton";

function checkIfCompleted(status) {
  return status === "COMPLETED";
}

function checkIfOverDue(dueDate, status) {
  return moment().diff(dueDate, "hours") > 0 && status !== "COMPLETED";
}

function getStatus(dueDate, status) {
  if (moment().diff(dueDate, "hours") > 0 && status !== "COMPLETED") {
    return "OVERDUE";
  }
  return status;
}
//TO-DO make function how filter away cases with duedate if not date in range
function checkDateFilter(dateFilter, dueDate, caseSubject) {
  if (dateFilter === false && moment().diff(dueDate, "hours") > 0) {
    return styles.red;
  } else {
    return styles.green;
  }
}

function hide() {
  return (style = { visibility: "hidden" });
}

function checkIfDateHasExpired(dueDate, status) {
  if (moment().diff(dueDate, "hours") > 0 && status !== "COMPLETED") {
    return styles.red;
  }
  return "";
}

function getDate(elem, clikedCase) {
  if (clikedCase === "Index") {
    return elem.enrollments[0].events.find(
      (e) => e.programStage === "oqsk2Jv4k3s"
    ).dueDate;
  } else if (clikedCase === "Contacts") {
    return elem.enrollments[0].events.find(
      (e) => e.programStage === "sAV9jAajr8x"
    ).dueDate;
  } else if (clikedCase === "Completed") {
    return elem.enrollments[0].events.find(
      (e) => e.programStage === "oqsk2Jv4k3s"
    ).dueDate;
  } else if (clikedCase === "Both") {
    return elem.enrollments[0].events.find(
      (e) =>
        e.programStage === "oqsk2Jv4k3s" || e.programStage === "sAV9jAajr8x"
    ).dueDate;
  }
}

const Case = (props) => {
  const caseSubject = props.caseSubject;
  return (
    <>
      <TableRow key={caseSubject.trackedEntityInstance}>
        <TableCell
          id="Due Date"
          className={checkIfDateHasExpired(
            getDate(caseSubject, props.clikedCase),
            caseSubject.enrollments[0].status
          )}
        >
          {getDate(caseSubject, props.clikedCase)
            ? moment(getDate(caseSubject, props.clikedCase)).fromNow()
            : "N/A"}
        </TableCell>
        <TableCell id="Type">
          {caseSubject.programOwners[0].program === "uYjxkTbwRNf"
            ? "INDEX"
            : "CONTACT"}
        </TableCell>
        <TableCell
          id="First Name"
          className={checkDateFilter(
            props.dateFilter,
            getDate(caseSubject, props.clikedCase)
          )}
        >
          {caseSubject.attributes.find(
            (element) => element.attribute === "sB1IHYu2xQT"
          ).value
            ? caseSubject.attributes.find(
                (element) => element.attribute === "sB1IHYu2xQT"
              ).value
            : "N/A"}
        </TableCell>
        <TableCell id="Last Name">
          {caseSubject.attributes.find(
            (element) => element.attribute === "ENRjVGxVL6l"
          ).value
            ? caseSubject.attributes.find(
                (element) => element.attribute === "ENRjVGxVL6l"
              ).value
            : "N/A"}
        </TableCell>
        <TableCell id="Phone number">
          {caseSubject.attributes.find(
            (element) => element.attribute === "fctSQp5nAYl"
          )
            ? caseSubject.attributes.find(
                (element) => element.attribute === "fctSQp5nAYl"
              ).value
            : "N/A"}
        </TableCell>
        <TableCell id="Status">
          <Tag
            dataTest="dhis2-uicore-tag"
            positive={checkIfCompleted(caseSubject.enrollments[0].status)}
            negative={checkIfOverDue(
              getDate(caseSubject, props.clikedCase),
              caseSubject.enrollments[0].status
            )}
          >
            {getStatus(
              getDate(caseSubject, props.clikedCase),
              caseSubject.enrollments[0].status
            )}
          </Tag>
        </TableCell>
        <TableCell>
          {caseSubject.programOwners[0].program === "uYjxkTbwRNf" ? (
            <OverviewButton
              setClickedModal={props.setClickedModal}
              name="Overview"
              id={caseSubject.trackedEntityInstance}
            />
          ) : (
            ""
          )}
        </TableCell>
        <TableCell>
          <TrackerButton
            name="Tracker Capture"
            data={caseSubject.enrollments[0].trackedEntityInstance}
            program={caseSubject.programOwners[0].program}
          />
        </TableCell>
      </TableRow>
    </>
  );
};

export default Case;
