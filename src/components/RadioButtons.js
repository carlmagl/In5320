import React, { useState } from "react";
import { Radio } from "@dhis2/ui-core";
import styles from "../App.module.css";

const RadioButtons = (params) => {
  const [both, setBoth] = useState(false);
  const [index, setIndex] = useState(true);
  const [contacts, setContacts] = useState(false);
  const [completedContacts, setCompletedContacts] = useState(false);
  const [completedIndex, setCompletedIndex] = useState(false);
  function resetRadioButtons() {
    setBoth(false);
    setIndex(false);
    setContacts(false);
    setCompletedContacts(false);
    setCompletedIndex(false);
  }
  return (
    <div className={styles.radioButtons}>
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
        label="Completed Contacts"
        name="Completed Contacts"
        checked={completedContacts}
        onChange={() => {
          params.setClicked("Completed Contacts");
          resetRadioButtons();
          setCompletedContacts(true);
        }}
        value="default"
      />
      <Radio
        dataTest="dhis2-uicore-radio"
        label="Completed Index"
        name="Completed Index"
        checked={completedIndex}
        onChange={() => {
          params.setClicked("Completed Index");
          resetRadioButtons();
          setCompletedIndex(true);
        }}
        value="default"
      />
    </div>
  );
};

export default RadioButtons;
