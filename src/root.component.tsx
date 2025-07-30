/**
 * From here, the application is pretty typical React, but with lots of
 * support from `@openmrs/esm-framework`. Check out `Greeter` to see
 * usage of the configuration system, and check out `PatientGetter` to
 * see data fetching using the OpenMRS FHIR API.
 *
 * Check out the Config docs:
 *   https://openmrs.github.io/openmrs-esm-core/#/main/config
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LeftNavMenu, setLeftNav, unsetLeftNav } from '@openmrs/esm-framework';
import styles from "./root.scss"
import BillsOverviewPage from './bills-management/bills-overview.component';
import BillablesManagementPage from './bills-management/billables-management.component';
import BillDetails from './bills-management/bill-details.component';

const RootComponent: React.FC = () => {

  const spaBasePath = window.getOpenmrsSpaBase() + "billables";

  useEffect(() => {

    setLeftNav({
      name: "bills-management-left-panel-slot",
      basePath: spaBasePath,
    })

    return () => unsetLeftNav("bills-management-left-panel-slot")

  }, [spaBasePath])

  return (
    <BrowserRouter basename={window.getOpenmrsSpaBase() + "billables"}>
      <LeftNavMenu />
      <main className={styles.container} style={{ paddingLeft: 280 }}>
        <Routes>
          <Route path='/' element={<BillsOverviewPage />} />
          <Route path='/billables-management' element={<BillablesManagementPage />} />
          <Route path='/:billId' element={<BillDetails />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
};

export default RootComponent;
