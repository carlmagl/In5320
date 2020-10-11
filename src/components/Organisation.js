import React, { useState } from "react";
import { DataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import classes from ".././App.module.css";
import styles from ".././App.module.css";
import moment from "moment";

import {
  Table,
  TableRow,
  TableCellHead,
  TableBody,
  TableCell,
  MenuSectionHeader,
  Button,
} from "@dhis2/ui";

function checkIfDateHasExpired(dueDate) {
  return moment().diff(dueDate, "days") > 0;
}

const Organization = (query) => {
  const Moment = require("moment");
  return (
    <DataQuery query={query.query}>
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
                            <Button
                              dataTest="dhis2-uicore-button"
                              name="Primary button"
                              onClick={function logger(_ref) {
                                var name = _ref.name,
                                  value = _ref.value;
                                return console.info(
                                  "".concat(name, ": ").concat(value)
                                );
                              }}
                              primary
                              type="button"
                              value="default"
                            >
                              Overview
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              dataTest="dhis2-uicore-button"
                              name="Primary button"
                              onClick={() => {
                                window.open(
                                  `https://course.dhis2.org/hmis/dhis-web-tracker-capture/index.html#/dashboard?tei=${temp.trackedEntityInstance}&program=uYjxkTbwRNf&ou=JwnjhjVgXP2`
                                );
                              }}
                              primary
                              type="button"
                              value="default"
                            >
                              Tracker capture
                            </Button>
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
