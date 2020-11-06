import React, { useState } from "react";
import { DataQuery } from "@dhis2/app-runtime";
import styles from ".././App.module.css";
import Loader from "./Loader";
import Error from "./Error";
import { Table, TableRow, TableCellHead, TableBody } from "@dhis2/ui";
import Case from "./Case";
import moment from "moment";

/* checks if dateRange is an array or one todays date.  */
function findDateFromRange(dateRange) {
  return Array.isArray(dateRange) ? dateRange[1] : dateRange[0];
}

function getDate(elem) {
  let temps = elem.enrollments[0].events;
  temps.sort(
    (a, b) =>
      new moment(a.dueDate).format("YYYYMMDD") -
      new moment(b.dueDate).format("YYYYMMDD")
  );
  return new moment(temps.slice(-1)[0].dueDate);
}

function filterList(list, dateRange) {
  if (Array.isArray(dateRange)) {
    if (!new moment(new Date()).isBetween(dateRange[0], dateRange[1])) {
      return list.filter(
        (a) =>
          new moment(getDate(a)).isBetween(dateRange[0], dateRange[1]) ||
          new moment(getDate(a)).isSame(dateRange[0])
      );
    }
  }
  return list.filter((a) =>
    new moment(getDate(a)).isBefore(
      Array.isArray(dateRange) ? dateRange[1] : dateRange[0]
    )
  );
}

const CasesList = (props) => {
  return (
    <DataQuery query={props.query}>
      {({ error, loading, data }) => {
        if (error) return <Error />;
        if (loading) return <Loader />;
        if (props.clikedCase === "Both")
          data.trackedEntityInstances.trackedEntityInstances = data.trackedEntityInstances.trackedEntityInstances.filter(
            (a) => a.enrollments[0].status !== "COMPLETED"
          );
        return (
          <>
            <nav className={styles.table} data-test-id="menu">
              <Table>
                <TableRow>
                  <TableCellHead>Due Date</TableCellHead>
                  <TableCellHead>Type</TableCellHead>
                  <TableCellHead>First name</TableCellHead>
                  <TableCellHead>Last name</TableCellHead>
                  <TableCellHead>Phone</TableCellHead>
                  <TableCellHead>Status</TableCellHead>
                  <TableCellHead>Overview</TableCellHead>
                  <TableCellHead>Tracker-Capture</TableCellHead>
                </TableRow>
                <TableBody id="Tbody">
                  {console.log("Data comming in Caselist", data)}
                  {props.setTotalCases(
                    filterList(
                      data.trackedEntityInstances.trackedEntityInstances,
                      props.dateRange
                    ).length
                  )}
                  {data &&
                    filterList(
                      data.trackedEntityInstances.trackedEntityInstances.sort(
                        (a, b) =>
                          new moment(getDate(a)).format("YYYYMMDD") -
                          new moment(getDate(b)).format("YYYYMMDD")
                      ),
                      props.dateRange
                    ).map((caseSubject) => (
                      <Case
                        key={caseSubject.trackedEntityInstance}
                        caseSubject={caseSubject}
                        setClickedModal={props.setClickedModal}
                        test={props.test}
                        clikedCase={props.clikedCase}
                        dateFilter={props.dateFilter}
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
