import React, { useState } from "react";
import { Button } from "@dhis2/ui";

const ListButton = (props) => {
  return (
    <Button
      dataTest="dhis2-uicore-button"
      name="Primary button"
      onClick={function logger(_ref) {
        var name = _ref.name,
          value = _ref.value;
        return console.info("".concat(name, ": ").concat(value));
      }}
      primary
      type="button"
      value="default"
    >
      {props.name}
    </Button>
  );
};

export { ListButton };
