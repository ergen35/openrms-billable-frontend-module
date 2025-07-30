import React, { useMemo } from "react";
import last from "lodash-es/last";
import { BrowserRouter, useLocation } from "react-router-dom";
import { ConfigurableLink } from "@openmrs/esm-framework";
 
export interface LinkConfig {
  name: string;
  title: string;
  slot: string;
}
 
function LinkExtension({ config }: { config: LinkConfig }) {
  const { name, title } = config;
  const location = useLocation();
  const spaBasePath = window.getOpenmrsSpaBase() + "home";
 
  const urlSegment = useMemo(() => decodeURIComponent(last(location.pathname.split("/"))), [location.pathname]);
 
  return (
    <ConfigurableLink
      to={spaBasePath + "/" + name}
      className={`cds--side-nav__link ${name === urlSegment && "active-left-nav-link"}`}
    >
      {title}
    </ConfigurableLink>
  );
}
 
export const createGeneralLeftPanelLink = (config: LinkConfig) => () =>
  (
    <BrowserRouter>
      <LinkExtension config={config} />
    </BrowserRouter>
  );