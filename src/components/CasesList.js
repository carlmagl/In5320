import React, { useState } from "react";
import { DataQuery } from "@dhis2/app-runtime";
import styles from ".././App.module.css";
import moment from "moment";
import Loader from "./Loader";
import Error from "./Error";
import { Table, TableRow, TableCellHead, TableBody } from "@dhis2/ui";
import Case from "./Case";

/* checks if dateRange is an array or one todays date.  */
function findDateFromRange(dateRange) {
  return Array.isArray(dateRange) ? dateRange[1] : dateRange[0];
}

const CasesList = (props) => {
  const Moment = require("moment");

  return (
    <DataQuery query={props.query}>
      {({ error, loading, data }) => {
        if (error) return <Error />;
        if (loading) return <Loader />;
        return (
          <>
            <nav className={styles.table} data-test-id="menu">
              <Table >
                <TableRow>
                  <TableCellHead>Due Date</TableCellHead>
                  <TableCellHead>Type</TableCellHead>
                  <TableCellHead>First name</TableCellHead>
                  <TableCellHead>Last name</TableCellHead>
                  <TableCellHead>Phone</TableCellHead>
                  <TableCellHead>Status</TableCellHead>
                  <TableCellHead>
                    Number of Cases:{" "}
                    {data.trackedEntityInstances.trackedEntityInstances.length}
                    {props.setTotalCases(
                      data.trackedEntityInstances.trackedEntityInstances.filter(
                        (a) =>
                          new Moment(a.enrollments[0].events[0].dueDate).format(
                            "YYYYMMDD"
                          ) -
                            new Moment(
                              findDateFromRange(props.dateRange)
                            ).format("YYYYMMDD") <
                          0
                      ).length
                    )}
                  </TableCellHead>
                  <TableCellHead>Tracker-Capture</TableCellHead>
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
                      .filter(
                        (a) =>
                          new Moment(a.enrollments[0].events[0].dueDate).format(
                            "YYYYMMDD"
                          ) -
                            new Moment(
                              findDateFromRange(props.dateRange)
                            ).format("YYYYMMDD") <
                          0
                      )
                      .map((caseSubject) => (
                        <Case
                          key={caseSubject.trackedEntityInstance}
                          caseSubject={caseSubject}
                          setClickedModal={props.setClickedModal}
                        />
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

export default CasesList;
