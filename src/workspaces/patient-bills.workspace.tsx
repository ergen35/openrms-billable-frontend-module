import React, { useEffect } from "react";
import { Button, ButtonSet, Form, TextInput } from "@carbon/react";
import { type DefaultWorkspaceProps } from "@openmrs/esm-framework";
import { useParams } from "react-router";

const PatientVisitBillingForm: React.FC<DefaultWorkspaceProps> = ({ setTitle, promptBeforeClosing }) => {

  useEffect(() => {
    setTitle("Patient Visit Billing Form");
    promptBeforeClosing(() => {
      return true
    })
  }, [])

  const params = useParams();

  console.log("patient uuid", params.patientUuid)

  return (
    <Form style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>

      <div>
        {/* patient {patient && <span>{patient.name[0].given}</span>} */}
      </div>

      <div style={{ flex: 1, padding: 10 }}>

        <TextInput type="text"
          labelText="Patient Name"
          id="patient-name"
          name="patient-name"
        />

      </div>

      <ButtonSet style={{ width: "100%" }}>
        <Button size="lg">Save</Button>
        <Button size="lg" kind="danger">Discard</Button>
      </ButtonSet>

    </Form>
  )
}

export default PatientVisitBillingForm;
