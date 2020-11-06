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
import { DataQuery } from "@dhis2/app-runtime";
import Error from "./Error";
import ContactCase from "./ContactCase";

/* Query for getting one index/contact case */
function personQuery(personId) {
  return {
    trackedEntityInstances: {
      resource: `trackedEntityInstances/${personId}`,
      params: {
        fields: "*",
      },
    },
  };
}

const ContactModal = (props) => {
  return (
    <DataQuery query={personQuery(props.id)}>
      {({ error, loading, data }) => {
        if (error) return <Error />;
        if (loading) return null;
        return (
          <>
            <Modal dataTest="dhis2-uicore-modal" position="top">
              <ModalTitle dataTest="dhis2-uicore-modaltitle">
                {data.trackedEntityInstances.attributes.find(
                  (element) => element.attribute === "sB1IHYu2xQT"
                ).value +
                  " " +
                  data.trackedEntityInstances.attributes.find(
                    (element) => element.attribute === "ENRjVGxVL6l"
                  ).value}
              </ModalTitle>
              <ModalContent dataTest="dhis2-uicore-modalcontent">
                <Table>
                  <TableRow>
                    <TableCellHead>Due Date</TableCellHead>
                    <TableCellHead>Type</TableCellHead>
                    <TableCellHead>First name</TableCellHead>
                    <TableCellHead>Last name</TableCellHead>
                    <TableCellHead>Phone</TableCellHead>
                    <TableCellHead>Tracker Capture</TableCellHead>
                  </TableRow>
                  <TableBody>
                    {data.trackedEntityInstances.relationships.length ? (
                      data.trackedEntityInstances.relationships.map(
                        (caseSubject) => (
                          <TableRow
                            key={
                              caseSubject.to.trackedEntityInstance
                                .trackedEntityInstance
                            }
                          >
                            <ContactCase
                              tei={
                                caseSubject.to.trackedEntityInstance
                                  .trackedEntityInstance
                              }
                            />
                          </TableRow>
                        )
                      )
                    ) : (
                      <TableRow>
                        <TableCellHead>No contact cases</TableCellHead>
                        <TableCellHead></TableCellHead>
                        <TableCellHead></TableCellHead>
                        <TableCellHead></TableCellHead>
                        <TableCellHead></TableCellHead>
                        <TableCellHead></TableCellHead>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalContent>
              <ModalActions dataTest="dhis2-uicore-modalactions">
                <ButtonStrip dataTest="dhis2-uicore-buttonstrip" end>
                  <Button
                    dataTest="dhis2-uicore-button"
                    onClick={function () {
                      props.setClickedModal();
                    }}
                    secondary
                    type="button"
                  >
                    Close
                  </Button>
                </ButtonStrip>
              </ModalActions>
            </Modal>
          </>
        );
      }}
    </DataQuery>
  );
};

export default ContactModal;
