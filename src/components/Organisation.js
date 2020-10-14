import React from "react";
import { DataQuery } from "@dhis2/app-runtime";
import styles from ".././App.module.css";
import moment from "moment"; 
import Loader from "../components/Loader"

import {
  Table,
  TableRow,
  TableCellHead,
  TableBody,
  TableCell,
} from "@dhis2/ui";
import { ListButton } from "./ListButtons.js";

function checkIfDateHasExpired(dueDate) {
  return moment().diff(dueDate, "days") > 0;
}

const Organization = (query) => {
  const Moment = require("moment");
  return (
    <DataQuery query={query.query}>
      {({ error, loading, data }) => {
        if (error) return <h2>ERROR</h2>;
        //TODO: Add centeredcontent on this, so loading ... comes in the middle of the page.
        if (loading) return <Loader/>
        console.log(data.trackedEntityInstances.trackedEntityInstances);
        console.log(
          data.trackedEntityInstances.trackedEntityInstances.enrollments
            ? data.trackedEntityInstances.trackedEntityInstances.enrollments
            : "nan"
        );
        return (
          <>
            <nav className={styles.containers} data-test-id="menu">
              <Table>
                <TableRow>
                  <TableCellHead>Due Date</TableCellHead>
                  <TableCellHead>Type</TableCellHead>
                  <TableCellHead>First name</TableCellHead>
                  <TableCellHead>Last name</TableCellHead>
                  <TableCellHead>Phone</TableCellHead>
                  <TableCellHead>
                    Number of Cases:{" "}
                    {data.trackedEntityInstances.trackedEntityInstances.length}
                  </TableCellHead>
                  <TableCellHead></TableCellHead>
                </TableRow>
                <TableBody>
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
                        <TableRow
                          key={temp.trackedEntityInstance}
                          className={
                            checkIfDateHasExpired(
                              temp.enrollments[0].events[0].dueDate
                            )
                              ? styles.red
                              : ""
                          }
                        >
                          {console.log(
                            moment(
                              temp.enrollments[0].events[0].dueDate
                            ).fromNow()
                          )}
                          <TableCell>
                            {temp.enrollments[0].events[0].dueDate
                              ? moment(
                                  temp.enrollments[0].events[0].dueDate
                                ).fromNow()
                              : "NaN"}
                          </TableCell>
                          <TableCell>
                            {temp.programOwners[0].program === "uYjxkTbwRNf"
                              ? "INDEX"
                              : "CONTACT"}
                          </TableCell>
                          <TableCell>
                            {
                              temp.attributes.find(
                                (element) => element.attribute === "sB1IHYu2xQT"
                              ).value
                            }
                          </TableCell>
                          <TableCell>
                            {
                              temp.attributes.find(
                                (element) => element.attribute === "ENRjVGxVL6l"
                              ).value
                            }
                          </TableCell>
                          <TableCell>
                            {temp.attributes.find(
                              (element) => element.attribute === "fctSQp5nAYl"
                            )
                              ? temp.attributes.find(
                                  (element) =>
                                    element.attribute === "fctSQp5nAYl"
                                ).value
                              : "NaN"}
                          </TableCell>
                          <TableCell>
                            <ListButton name="Overview" />
                          </TableCell>
                          <TableCell>
                            {" "}
                            <ListButton name="Tracker Capture" />{" "}
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
