import React from "react";
import { NoticeBox } from "@dhis2/ui";

export default Error = (props) => {
  return (
    <NoticeBox dataTest="dhis2-uicore-noticebox" error title="Network Error">
      {props.error} Could not get data (Dette er en test, kanskje vi kan bruke
      den?)
    </NoticeBox>
  );
};
