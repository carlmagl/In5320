import React from 'react'
import { DataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import classes from './App.module.css'
import styles from "./App.module.css";
import {
    Table,
    TableRow,
    TableCellHead,
    TableBody,
    TableCell,
    MenuSectionHeader,
    TableRowHead,
  } from "@dhis2/ui";

const query = {
    trackedEntityInstances: {
      resource: "trackedEntityInstances",
      params: {
        ou: 'JwnjhjVgXP2',
      }
    }
}
  

const Organization = (organizations) => ( 
    <div className={classes.container}>
        <DataQuery query={query}>
            {({ error, loading, data }) => {
                if (error) return <span>ERROR</span>
                if (loading) return <span>...</span>
                console.log(data.trackedEntityInstances.trackedEntityInstances.length);
                return (
                    <>
                        <div className={styles.container}>
                        <nav className={styles.menu} data-test-id="menu">
                            <MenuSectionHeader label={i18n.t("All tracked Entities for organization")} />
                            <MenuSectionHeader label={i18n.t("All number of cases: {{cases}}", {cases: data.trackedEntityInstances.trackedEntityInstances.length})} />
                            <Table>
                                <TableRow>
                                    <TableCellHead>Key</TableCellHead>
                                    <TableCellHead>Value</TableCellHead>
                                </TableRow>
                                <TableBody>
                                {data && data.trackedEntityInstances.trackedEntityInstances.map((temp) => (
                                    <TableRow key={temp.trackedEntityInstance}>
                                        <TableCell> Name: {temp.attributes[1].value} {temp.attributes[0].value}</TableCell>
                                        <TableCell>ID: {temp.trackedEntityInstance}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </nav>
                        </div>
                    </>
                )
            }}
        </DataQuery>
    </div>
)

export default Organization;
