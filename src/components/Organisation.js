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
  Button,
} from "@dhis2/ui";

const query = {
  trackedEntityInstances: {
    resource: "trackedEntityInstances",
    params: {
      ou: "JwnjhjVgXP2",
      program: "uYjxkTbwRNf",
      programStatus: "ACTIVE",
    },
  },
};

const Organization = () => {
  const [active, setActive] = useState("ACTIVE");
  return (
    <DataQuery query={query}>
      {({ error, loading, data }) => {
        if (error) return <span>ERROR</span>;
        if (loading) return <span>...</span>;
        console.log(data.trackedEntityInstances.trackedEntityInstances);
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
                  <TableCellHead></TableCellHead>
                  <TableCellHead></TableCellHead>
                </TableRow>
                <TableBody>
                  {data &&
                    data.trackedEntityInstances.trackedEntityInstances.map(
                      (temp) => (
                        <TableRow key={temp.trackedEntityInstance}>
                          <TableCell>12-12-2012</TableCell>
                          <TableCell>INDEX</TableCell>
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
                              Tracker capture
                            </Button>
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
