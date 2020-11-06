import React from "react";
import { Button } from "@dhis2/ui";

/* http://localhost:9999/dhis-web-tracker-capture/index.html#/dashboard?tei={personID}&program=uYjxkTbwRNf&ou=JwnjhjVgXP2 */

const OverviewButton = (props) => {
  return (
    <Button
      onClick={() => {
        window.location.href = `http://localhost:9999/dhis-web-tracker-capture/index.html#/dashboard?tei=${props.data}&program=${props.program}&ou=JwnjhjVgXP2`;
      }}
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

export default OverviewButton;
