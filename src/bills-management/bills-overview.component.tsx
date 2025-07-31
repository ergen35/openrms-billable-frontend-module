import React from "react";
import { launchWorkspace, WorkspaceContainer } from "@openmrs/esm-framework";
import { Button } from "@carbon/react";


function BillsOverviewPage() {

  const openOrderBaskket = () => {
    launchWorkspace("order-basket", {
      workspaceTitle: "Custom Orders basket launched from Billables module"
    })
  }


  const openCustomWOrkspace = () => {
    launchWorkspace("patient-bills")
  }

  return (
    <React.Fragment>
      <h3>Bills Overview Page</h3>
      <div style={{ display: 'flex', flexDirection: 'row', columnGap: 20 }}>
        <Button onClick={openOrderBaskket}>
          Launch Order Basket Workspace
        </Button>

        <Button onClick={openCustomWOrkspace} kind="secondary">
          Launch Custom Workspace
        </Button>
      </div>

      <WorkspaceContainer
        showSiderailAndBottomNav={true}
        contextKey="billables"
        additionalWorkspaceProps={{ /* nothing */ }}
      />
    </React.Fragment>
  )
}


export default BillsOverviewPage;
