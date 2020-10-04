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
  

const Main = () => (
    
    <div className={classes.container}>
        <DataQuery query={query}>
            {({ error, loading, data }) => {
                if (error) return <span>ERROR</span>
                if (loading) return <span>...</span>
                console.log(data);
                return (
                    <>
                       <h1>Test</h1>
                    </>
                )
            }}
        </DataQuery>
    </div>
)

export default Main;

