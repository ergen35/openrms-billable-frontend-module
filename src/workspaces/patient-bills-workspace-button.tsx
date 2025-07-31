import React from "react"
import { ActionMenuButton, launchWorkspace } from "@openmrs/esm-framework"
import { Money } from "@carbon/react/icons"


const PatientBillsWorkspaceButton = () => {

  const launchPatientBillsWokspace = () => {
    launchWorkspace("patient-bills")
  }

  return (
    <ActionMenuButton
      getIcon={(props) => <Money {...props} />}
      label="Patient Bills"
      handler={launchPatientBillsWokspace}
      type={"form"}
      iconDescription="Patient Bills"
      key="patient-bills-action-menu-button"
    />
  )
}

export default PatientBillsWorkspaceButton;