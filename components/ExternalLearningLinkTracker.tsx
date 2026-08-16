"use client";

import { useEffect } from "react";
import { trackLearningEvent } from "@/lib/learning-events";
import { isExternalLearningSource } from "@/lib/external-learning-link";

export default function ExternalLearningLinkTracker() {
  useEffect(() => {
    function record(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("main a[href]");
      if (!anchor || anchor.dataset.noLearningMetric === "true") return;
      if (isExternalLearningSource(anchor.href, window.location.origin)) trackLearningEvent("external_source_open");
    }
    document.addEventListener("click", record);
    return () => document.removeEventListener("click", record);
  }, []);

  return null;
}
