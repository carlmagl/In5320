import React, { useState } from "react";
import { DataQuery } from "@dhis2/app-runtime";
import styles from ".././App.module.css";
import moment from "moment";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { ContactModule } from "./ContactModule";

import {
  Table,
  TableRow,
  TableCellHead,
  TableBody,
  TableCell,
  Tag,
} from "@dhis2/ui";
import { ListButton } from "./ListButtons.js";
import { sharedPropTypes } from "@dhis2/ui-constants";

function checkIfCompleted(status) {
  return status === "COMPLETED";
}

function checkIfActive(status, dueDate) {
  return !(checkIfCompleted(status) || checkIfOverDue(dueDate));
}

function checkIfOverDue(dueDate) {
  return moment().diff(dueDate, "days") > 0;
}

function checkIfDateHasExpired(dueDate, status) {
  if (moment().diff(dueDate, "days") > 0 && status !== "COMPLETED") {
    return styles.red;
  }
  return "";
}

const Organization = (props) => {
  const Moment = require("moment");

  return (
    <DataQuery query={props.query}>
      {({ error, loading, data }) => {
        if (error) return <Error />;
        if (loading) return <Loader />;
        return (
          <>
            <nav className={styles.containers} data-test-id="menu">
              <Table>
                <TableRow>
                  {/* <CellTitle name="Test"></CellTitle> */}
                  <TableCellHead>Due Date</TableCellHead>
                  <TableCellHead>Type</TableCellHead>
                  <TableCellHead>First name</TableCellHead>
                  <TableCellHead>Last name</TableCellHead>
                  <TableCellHead>Phone</TableCellHead>
                  <TableCellHead>Status</TableCellHead>
                  <TableCellHead>
                    Number of Cases:{" "}
                    {data.trackedEntityInstances.trackedEntityInstances.length}
                  </TableCellHead>
                </TableRow>
                <TableBody id="Tbody">
                  {console.log(data)}
                  {data &&
                    data.trackedEntityInstances.trackedEntityInstances
                      .sort(
                        (a, b) =>
                          new Moment(a.enrollments[0].events[0].dueDate).format(
                            "YYYYMMDD"
                          ) -
                          new Moment(b.enrollments[0].events[0].dueDate).format(
                            "YYYYMMDD"
                          )
                      )
                      .map((temp) => (
                        <TableRow key={temp.trackedEntityInstance}>
                          <TableCell
                            className={checkIfDateHasExpired(
                              temp.enrollments[0].events[0].dueDate,
                              temp.enrollments[0].status
                            )}
                          >
                            {temp.enrollments[0].events[0].dueDate
                              ? moment(
                                  temp.enrollments[0].events[0].dueDate
                                ).fromNow()
                              : "N/A"}
                          </TableCell>
                          <TableCell>
                            {temp.programOwners[0].program === "uYjxkTbwRNf"
                              ? "INDEX"
                              : "CONTACT"}
                          </TableCell>
                          <TableCell>
                            {temp.attributes.find(
                              (element) => element.attribute === "sB1IHYu2xQT"
                            ).value
                              ? temp.attributes.find(
                                  (element) =>
                                    element.attribute === "sB1IHYu2xQT"
                                ).value
                              : "N/A"}
                          </TableCell>
                          <TableCell>
                            {temp.attributes.find(
                              (element) => element.attribute === "ENRjVGxVL6l"
                            ).value
                              ? temp.attributes.find(
                                  (element) =>
                                    element.attribute === "ENRjVGxVL6l"
                                ).value
                              : "N/A"}
                          </TableCell>
                          <TableCell>
                            {temp.attributes.find(
                              (element) => element.attribute === "fctSQp5nAYl"
                            )
                              ? temp.attributes.find(
                                  (element) =>
                                    element.attribute === "fctSQp5nAYl"
                                ).value
                              : "N/A"}
                          </TableCell>
                          <TableCell>
                            <Tag
                              dataTest="dhis2-uicore-tag"
                              positive={checkIfCompleted(
                                temp.enrollments[0].status
                              )}
                              negative={false}
                              neutral={checkIfActive(
                                temp.enrollments[0].status,
                                temp.enrollments[0].events[0].dueDate
                              )}
                            >
                              {temp.enrollments[0].status}
                            </Tag>
                          </TableCell>
                          <TableCell>
                            <ListButton
                              setClickedModal={props.setClickedModal}
                              name="overview"
                            />
                          </TableCell>
                          <TableCell>
                            {" "}
                            <ListButton
                              temp={temp.trackedEntityInstance}
                              name="Tracker Capture"
                            />{" "}
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </nav>
          </>
        );
      }}
    </DataQuery>
  );
};

export default Organization;
