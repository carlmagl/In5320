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
  return moment().diff(dueDate, "days") > 0 && status !== "COMPLETED";
}

function getStatus(dueDate, status) {
  if (moment().diff(dueDate, "days") > 0 && status !== "COMPLETED") {
    return "OVERDUE";
  }
  return status;
}

function checkIfDateHasExpired(dueDate, status) {
  if (moment().diff(dueDate, "days") > 0 && status !== "COMPLETED") {
    return styles.red;
  }
  return "";
}

const Case = (props) => {
  const [clikedTracker, setClickedTracker] = useState(false);
  console.log("caseSubject", props.caseSubject.trackedEntityInstance);
  return (
    <>
      <TableRow key={props.caseSubject.trackedEntityInstance}>
        <TableCell
          id="Due Date"
          className={checkIfDateHasExpired(
            props.caseSubject.enrollments[0].events[0].dueDate,
            props.caseSubject.enrollments[0].status
          )}
        >
          {props.caseSubject.enrollments[0].events[0].dueDate
            ? moment(
                props.caseSubject.enrollments[0].events[0].dueDate
              ).fromNow()
            : "N/A"}
        </TableCell>
        <TableCell id="Type">
          {props.caseSubject.programOwners[0].program === "uYjxkTbwRNf"
            ? "INDEX"
            : "CONTACT"}
        </TableCell>
        <TableCell id="First Name">
          {props.caseSubject.attributes.find(
            (element) => element.attribute === "sB1IHYu2xQT"
          ).value
            ? props.caseSubject.attributes.find(
                (element) => element.attribute === "sB1IHYu2xQT"
              ).value
            : "N/A"}
        </TableCell>
        <TableCell id="Last Name">
          {props.caseSubject.attributes.find(
            (element) => element.attribute === "ENRjVGxVL6l"
          ).value
            ? props.caseSubject.attributes.find(
                (element) => element.attribute === "ENRjVGxVL6l"
              ).value
            : "N/A"}
        </TableCell>
        <TableCell id="Phone number">
          {props.caseSubject.attributes.find(
            (element) => element.attribute === "fctSQp5nAYl"
          )
            ? props.caseSubject.attributes.find(
                (element) => element.attribute === "fctSQp5nAYl"
              ).value
            : "N/A"}
        </TableCell>
        <TableCell id="Status">
          <Tag
            dataTest="dhis2-uicore-tag"
            positive={checkIfCompleted(props.caseSubject.enrollments[0].status)}
            negative={checkIfOverDue(
              props.caseSubject.enrollments[0].events[0].dueDate,
              props.caseSubject.enrollments[0].status
            )}
          >
            {getStatus(
              props.caseSubject.enrollments[0].events[0].dueDate,
              props.caseSubject.enrollments[0].status
            )}
          </Tag>
        </TableCell>
        <TableCell>
          {props.caseSubject.programOwners[0].program === "uYjxkTbwRNf" ? (
            <OverviewButton
              setClickedModal={props.setClickedModal}
              name="Overview"
              id={props.caseSubject.trackedEntityInstance}
            />
          ) : (
            ""
          )}
        </TableCell>
        <TableCell>
          <TrackerButton
            name="Tracker Capture"
            data={props.caseSubject.enrollments[0].trackedEntityInstance}
            program={props.caseSubject.programOwners[0].program}
          />
        </TableCell>
      </TableRow>
    </>
  );
};

export default Case;
