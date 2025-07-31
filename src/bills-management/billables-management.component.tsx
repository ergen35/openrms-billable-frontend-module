import React from "react";
import styles from "../root.scss";
import Resources from '../resources/resources.component';
import { Button } from '@carbon/react';
import { launchWorkspace, showModal, useConfig } from '@openmrs/esm-framework';
import BillablesOverview from '../recent-bills/slot/billables-overview.component';
import { Config } from '../config-schema';
import { NavLink } from "react-router-dom";

function BillablesManagementPage() {

  const config = useConfig<Config>();

  function handleBillModalDisplay() {
    const dispose = showModal('billDetailsModal', {
      onClose: () => dispose(),
      props: {}
    })
  }

  function openOrderBasket() {
    launchWorkspace("order-basket", {
      workspaceTitle: "Order Basket"
    })
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.welcome}>Billing Management</h3>
      <p className={styles.explainer}>
        This module helps you manage billing for your patients.
      </p>

      {/* Billables Overview - includes a table with recently emitted bills */}
      <BillablesOverview />
      <Resources />


      <div style={{ marginBottom: 8, display: 'flex', flexDirection: "column", borderColor: "red", borderWidth: 1, padding: 5, borderStyle: "solid" }}>
        <span>Supplier Name: {config.billingMetadata.supplierName ?? "-"}</span>
        <span>Supplier IFU: {config.billingMetadata.supplierIFU ?? "-"}</span>
        <span>Supplier NIM: {config.billingMetadata.supplierNIM ?? "-"}</span>
      </div>

      <div style={{ marginBottom: 10 }}>
        <Button onClick={handleBillModalDisplay}>
          Open Modal
        </Button>

        <Button onClick={openOrderBasket}>
          Open Order Basket
        </Button>
      </div>
      <div>
        <NavLink to={"/1588"}>View bill details 1588</NavLink>
      </div>
    </div>
  );
}


export default BillablesManagementPage;
