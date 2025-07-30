/**
 * This is the entrypoint file of the application. It communicates the
 * important features of this microfrontend to the app shell. It
 * connects the app shell to the React application(s) that make up this
 * microfrontend.
 */
import { getAsyncLifecycle, defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';
import { createBillableModuleLeftPanelLink } from './utils/billables-left-panel-link.component';
import { createGeneralLeftPanelLink } from './utils/left-panel-link.component';

const moduleName = '@openmrs/esm-billables-app';

const options = {
  featureName: '',
  moduleName,
};

/**
 * This tells the app shell how to obtain translation files: that they
 * are JSON files in the directory `../translations` (which you should
 * see in the directory structure).
 */
export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

/**
 * This function performs any setup that should happen at microfrontend
 * load-time (such as defining the config schema) and then returns an
 * object which describes how the React application(s) should be
 * rendered.
 */
export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

/**
 * This named export tells the app shell that the default export of `root.component.tsx`
 * should be rendered when the route matches `root`. The full route
 * will be `openmrsSpaBase() + 'root'`, which is usually
 * `/openmrs/spa/root`.
 */
export const root = getAsyncLifecycle(() => import("./root.component"), options);


/**
 * Named import for bill details page
 */

export const billDetails = getAsyncLifecycle(() => import("./bills-management/bill-details.component"), options);


/**
 * Register modals here
 */

export const billDetailsModal = getAsyncLifecycle(() => import("./modals/bill-details.modal"), options)


//active visits component
export const recentlyEmittedBills = getAsyncLifecycle(() => import('./recent-bills/extensions/recent-bills.component'), options);


/**
 * Left panel Links
*/

export const billablesLeftPanelLink = getSyncLifecycle(
  createBillableModuleLeftPanelLink({
    name: "",
    title: "Billables",
    slot: "billables-dashboard-slot"
  }),
  options
)

/**
 * Billables specific Left panel - Links
 */
export const billsOverviewLeftPanelLink = getSyncLifecycle(
  createBillableModuleLeftPanelLink({
    name: "",
    title: "Bills Overview",
    slot: "bills-management-left-panel-slot"
  }),
  options
)

export const billablesManagementLeftPanelLink = getSyncLifecycle(
  createBillableModuleLeftPanelLink({
    name: "billables-management",
    title: "Billables Management",
    slot: "bills-management-left-panel-slot"
  }),
  options
)

