import React, { useState } from "react";
import styles from ".././App.module.css";
import moment from "moment";

import { TableRow, TableCell, Tag } from "@dhis2/ui";
import OverviewButton from "./OverviewButtons";
import TrackerButton from "./TrackerButton";
import { DataQuery } from "@dhis2/app-runtime";

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
//TO-DO make function how filter away cases with duedate if not date in
function checkDateFilter(dateFilter, dueDate) {
  if (dateFilter === false && moment().diff(dueDate, "hours") > 0) {
    return styles.red;
  } else {
    return styles.green;
  }
}

function checkIfDateHasExpired(dueDate, status) {
  if (moment().diff(dueDate, "hours") > 0 && status !== "COMPLETED") {
    return styles.red;
  }
  return "";
}

function getDate(elem) {
  const Moment = require("moment");
  let temps = elem.enrollments[0].events;
  temps.sort(
    (a, b) =>
      new Moment(a.dueDate).format("YYYYMMDD") -
      new Moment(b.dueDate).format("YYYYMMDD")
  );
  return temps.slice(-1)[0].dueDate;
}

function personQuery(personId) {
  return {
    trackedEntityInstances: {
      resource: `trackedEntityInstances/${personId}`,
      params: {
        program: "DM9n1bUw8W8",
        fields: "*",
      },
    },
  };
}

const Case = (props) => {
  const caseSubject = props.caseSubject;
  return (
    <>
      <TableRow key={caseSubject.trackedEntityInstance}>
        <TableCell
          id="Due Date"
          className={checkIfDateHasExpired(
            getDate(caseSubject),
            caseSubject.enrollments[0].status
          )}
        >
          {getDate(caseSubject)
            ? moment(getDate(caseSubject)).fromNow()
            : "N/A"}
        </TableCell>
        <TableCell id="Type">
          {caseSubject.programOwners[0].program === "uYjxkTbwRNf"
            ? "INDEX"
            : "CONTACT"}
        </TableCell>
        <TableCell id="First Name">
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
              getDate(caseSubject),
              caseSubject.enrollments[0].status
            )}
          >
            {getStatus(getDate(caseSubject), caseSubject.enrollments[0].status)}
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
