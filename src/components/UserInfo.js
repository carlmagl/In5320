import React from "react";
import { DataQuery } from "@dhis2/app-runtime";
import { CenteredContent } from "@dhis2/ui-core";
import i18n from "@dhis2/d2-i18n";

const query = {
  me: {
    resource: "me",
  },
};

const UserInfo = () => (
  <>
    <DataQuery query={query}>
      {({ error, loading, data }) => {
        console.log(data);
        if (error) return <span>ERROR</span>;
        if (loading) return <span>...</span>;
        return (
          <CenteredContent
            dataTest="dhis2-uicore-centeredcontent"
            position="top"
          >
            <h1>{i18n.t("Hello, {{name}}", { name: data.me.name })}</h1>
          </CenteredContent>
        );
      }}
    </DataQuery>
  </>
);

export default UserInfo;
