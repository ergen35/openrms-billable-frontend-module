import { Button } from "@carbon/react";
import React from "react";
import { Add } from "@carbon/react/icons"
import { launchWorkspace } from "@openmrs/esm-framework";


export default function InsuranceProvidersManagementDashboardExtension() {

  const launchInsuranceProviderConfigWorkspace = () => {
    launchWorkspace("add-patient-insurance-provider-ws")
  }

  return (
    <div>
      <Button size="sm" onClick={launchInsuranceProviderConfigWorkspace}>
        <div style={{ display: 'flex', width: "100%", flexDirection: 'row', columnGap: 3, justifyContent: "center", alignContent: 'center', alignItems: 'center' }}>
          <Add />
          <span>Add New Provider</span>
        </div>
      </Button>
    </div>
  )
}
