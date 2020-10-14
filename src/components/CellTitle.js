import React from "react";
import { TableCellHead, DropdownButton } from "@dhis2/ui";

import Organisation from "../components/Organisation";

const bothQuery = {
  trackedEntityInstances: {
    resource: "trackedEntityInstances",
    params: {
      ou: "JwnjhjVgXP2",
      fields: "*",
    },
  },
};

const CellTitle = (props) => {
  return (
    <TableCellHead name="default">
      <DropdownButton
        component={<Organisation query={bothQuery} />}
        dataTest="dhis2-uicore-dropdownbutton"
        name="default"
        value="nothing"
      >
        {props.name}
      </DropdownButton>
    </TableCellHead>
  );
};
export { CellTitle };
