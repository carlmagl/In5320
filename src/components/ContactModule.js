import React from "react";
import {
  Modal,
  ModalTitle,
  ModalContent,
  ModalActions,
  Button,
  ButtonStrip,
  Table,
  TableRow,
  TableCellHead,
  TableBody,
} from "@dhis2/ui";

const ContactModule = (props) => {
  return (
    <Modal dataTest="dhis2-uicore-modal" position="top">
      <ModalTitle dataTest="dhis2-uicore-modaltitle">Name of index</ModalTitle>
      <ModalContent dataTest="dhis2-uicore-modalcontent">
        <Table>
          <TableRow>
            <TableCellHead>Due Date</TableCellHead>
            <TableCellHead>Type</TableCellHead>
            <TableCellHead>First name</TableCellHead>
            <TableCellHead>Last name</TableCellHead>
            <TableCellHead>Phone</TableCellHead>
          </TableRow>
          <TableBody>
            <TableRow>{props.temp}</TableRow>
          </TableBody>
        </Table>
      </ModalContent>

      <ModalActions dataTest="dhis2-uicore-modalactions">
        <ButtonStrip dataTest="dhis2-uicore-buttonstrip" end>
          <Button
            dataTest="dhis2-uicore-button"
            onClick={function () {
              props.setClickedModal(false);
            }}
            secondary
            type="button"
          >
            Close
          </Button>
        </ButtonStrip>
      </ModalActions>
    </Modal>
  );
};

export { ContactModule };
