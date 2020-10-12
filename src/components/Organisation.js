import React, { useState } from "react";
import { DataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import classes from ".././App.module.css";
import styles from ".././App.module.css";
import {
  Table,
  TableRow,
  TableCellHead,
  TableBody,
  TableCell,
  MenuSectionHeader,
} from "@dhis2/ui";
import { ListButton } from "./ListButtons.js";

const Organization = (query) => {
  return (
    <DataQuery query={query.query}>
      {({ error, loading, data }) => {
        if (error) return <span>ERROR</span>;
        if (loading) return <span>...</span>;
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
                    {data.trackedEntityInstances.trackedEntityInstances.length}
                  </TableCellHead>
                  <TableCellHead></TableCellHead>
                </TableRow>
                <TableBody>
                  {data &&
                    data.trackedEntityInstances.trackedEntityInstances.map(
                      (temp) => (
                        <TableRow key={temp.trackedEntityInstance}>
                          <TableCell>
                            {temp.enrollments[0].events[0].dueDate
                              ? temp.enrollments[0].events[0].dueDate
                              : "NaN"}
                          </TableCell>
                          <TableCell>
                            {temp.programOwners[0].program === "uYjxkTbwRNf"
                              ? "INDEX"
                              : "CONTACTS"}
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
                      )
                    )}
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
