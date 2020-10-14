import React, { useState } from "react";
import { Button } from "@dhis2/ui";
import { ContactModule } from "./ContactModule";

const ListButton = (props) => {
  return (
    <Button
      onClick={() => {
        props.setClickedModal(true);
      }}
      component={<ContactModule />}
      dataTest="dhis2-uicore-button"
      name="Primary button"
      primary
      type="button"
      value="default"
    >
      {props.name}
    </Button>
  );
};

export { ListButton };
