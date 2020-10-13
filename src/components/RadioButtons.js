import React, { useState } from "react";
import { Radio } from "@dhis2/ui-core";

const RadioBtnComp = (params) => {
  const [both, setBoth] = useState(false);
  const [index, setIndex] = useState(true);
  const [contacts, setContacts] = useState(false);
  const [completed, setCompleted] = useState(false);
  function resetRadioButtons() {
    setBoth(false);
    setIndex(false);
    setContacts(false);
    setCompleted(false);
  }

  return (
    <>
      <Radio
        dataTest="dhis2-uicore-radio"
        label="Index"
        name="Index"
        checked={index}
        onChange={() => {
          params.setClicked("Index");
          resetRadioButtons();
          setIndex(true);
        }}
        value="default"
      />
      <Radio
        dataTest="dhis2-uicore-radio"
        label="Contacts"
        name="Contacts"
        checked={contacts}
        onChange={() => {
          params.setClicked("Contacts");
          resetRadioButtons();
          setContacts(true);
        }}
        value="default"
      />
      <Radio
        dataTest="dhis2-uicore-radio"
        label="Both"
        name="Both"
        checked={both}
        onChange={() => {
          params.setClicked("Both");
          resetRadioButtons();
          setBoth(true);
        }}
        value="default"
      />
      <Radio
        dataTest="dhis2-uicore-radio"
        label="Completed"
        name="Completed"
        checked={completed}
        onChange={() => {
          params.setClicked("Completed");
          resetRadioButtons();
          setCompleted(true);
        }}
        value="default"
      />
    </>
  );
};

export { RadioBtnComp };
