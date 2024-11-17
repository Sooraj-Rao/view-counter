"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import fetchData from "./fetch-data";
import Cookies from "js-cookie";
import { siteData } from "../../lib/siteData";

const Analytics = () => {
  const params = useSearchParams();
  const Ref = params.get("ref") || Cookies.get("ref");
  const fetchDataCalled = useRef(false);

  useEffect(() => {
    if (!fetchDataCalled.current) {
      const refToUse = Ref || "search";
      fetchData(`view:${siteData.siteName}`, refToUse, "hero", "");
      Cookies.set("ref", refToUse);
      fetchDataCalled.current = true;
    }
  }, [Ref]);

  return null;
};

export default Analytics;
