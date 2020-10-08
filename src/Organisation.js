import React from "react";
import { DataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import classes from "./App.module.css";
import styles from "./App.module.css";
import {
  Table,
  TableRow,
  TableCellHead,
  TableBody,
  TableCell,
  MenuSectionHeader,
} from "@dhis2/ui";

const query = {
  trackedEntityInstances: {
    resource: "trackedEntityInstances",
    params: {
      ou: "JwnjhjVgXP2",
    },
  },
};

const Organization = () => (
  <div className={classes.container}>
    <DataQuery query={query}>
      {({ error, loading, data }) => {
        if (error) return <span>ERROR</span>;
        if (loading) return <span>...</span>;
        console.log(data.trackedEntityInstances.trackedEntityInstances);
        return (
          <>
            <div className={styles.container}>
              <nav className={styles.menu} data-test-id="menu">
                <MenuSectionHeader
                  label={i18n.t("All tracked Entities for organization")}
                />
                <MenuSectionHeader
                  label={i18n.t("All number of cases: {{cases}}", {
                    cases:
                      data.trackedEntityInstances.trackedEntityInstances.length,
                  })}
                />
                <Table>
                  <TableRow>
                    <TableCellHead>Due Date</TableCellHead>
                    <TableCellHead>Type</TableCellHead>
                    <TableCellHead>First name</TableCellHead>
                    <TableCellHead>Last name</TableCellHead>
                    <TableCellHead>Phone</TableCellHead>
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
                                  (element) =>
                                    element.attribute === "sB1IHYu2xQT"
                                ).value
                              }
                            </TableCell>
                            <TableCell>
                              {
                                temp.attributes.find(
                                  (element) =>
                                    element.attribute === "ENRjVGxVL6l"
                                ).value
                              }
                            </TableCell>
                            <TableCell>
                              ID: {temp.trackedEntityInstance}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                  </TableBody>
                </Table>
              </nav>
            </div>
          </>
        );
      }}
    </DataQuery>
  </div>
);

export default Organization;
