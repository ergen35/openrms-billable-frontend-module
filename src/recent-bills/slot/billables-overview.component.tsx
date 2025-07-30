import React from "react"
import { Extension, ExtensionSlot } from "@openmrs/esm-framework"

const BillablesOverview: React.FC = () => {
  return (
    <ExtensionSlot name="BillablesOverview">
      <Extension />
    </ExtensionSlot>
  )
}

export default BillablesOverview;
