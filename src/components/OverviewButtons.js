import React, { useState } from "react";
import { Button } from "@dhis2/ui";
import { ContactModule } from "./ContactModule";

const OverviewButton = (props) => {
  return (
    <Button
      onClick={() => {
        props.setClickedModal(true);
      }}
      component={<ContactModule data={props.temp} />}
      dataTest="dhis2-uicore-button"
      name="Primary button"
      primary
      type="button"
      value="default"
    >
      {props.name}
      {console.log(props.temp)}
    </Button>
  );
};

export default OverviewButton;
