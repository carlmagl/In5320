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
import Loader from "./Loader";
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
        if (loading) return <Loader />;
        console.log("Modal", data.trackedEntityInstances);
        return (
          <>
            <Modal dataTest="dhis2-uicore-modal" position="top">
              <ModalTitle dataTest="dhis2-uicore-modaltitle">
                {data.trackedEntityInstances.attributes[0].value}
              </ModalTitle>
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
                    {console.log(
                      "Relationships",
                      data.trackedEntityInstances.relationships
                    )}
                    {data.trackedEntityInstances.relationships.map(
                      (caseSubject) => (
                        <TableRow>
                          <ContactCase
                            tei={
                              caseSubject.to.trackedEntityInstance
                                .trackedEntityInstance
                            }
                          />
                        </TableRow>
                      )
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
