import React from 'react'
import { DataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import classes from './App.module.css'

const query = {
    trackedEntityInstances: {
      resource: "trackedEntityInstances",
      params: {
        ou: 'ImspTQPwCqd',
      }
    }
}
  

const Organization = (organizations) => ( 
    <div className={classes.container}>
        <DataQuery query={query}>
            {({ error, loading, data }) => {
                if (error) return <span>ERROR</span>
                if (loading) return <span>...</span>
                console.log('Data:', data.trackedEntityInstances.trackedEntityInstances);
                return (
                    <>
                        <h1>All tracked Entities for organization</h1>
                        {data && data.trackedEntityInstances.trackedEntityInstances.map((temp) => (
                            <>
                                <h3>ID: {temp.trackedEntityInstance}</h3>
                                <h3>Name: {temp.attributes[1].value} {temp.attributes[0].value}</h3>
                            </>
                        ))}
                    </>
                )
            }}
        </DataQuery>
    </div>
)

export default Organization;

