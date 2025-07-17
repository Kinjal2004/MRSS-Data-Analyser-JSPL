// page.jsx (must be in `app/some-route/page.jsx`)
import React, { Suspense } from "react";
import PageContent from "./PageContent";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4">⏳ Loading form...</div>}>
      <PageContent />
    </Suspense>
  );
}
