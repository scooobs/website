import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Bio, Contact, Education, Work } from "../components/About/Bio";

import { useEditingStore } from "../stores/useEditingStore";

import { Biography } from "@prisma/client";

const IndexPage = () => {
  const { editing } = useEditingStore();
  const [biography, setBiography] = useState<Biography | undefined>(undefined);

  /**
   * When changing edit mode, reresh the data to make sure it is in sync.
   * This ensures that after an update, the new data is visible.
   *
   * NOTE: Think about how to extend this to update everything.
   */
  useEffect(() => {
    const refreshData = async () => {
      const res = await fetch("/api/bio", { method: "GET" });

      const bio = (await res.json()) as Biography;

      setBiography(bio);
    };

    refreshData().catch(console.error);
  }, [editing]);

  return (
    <Layout>
      <div className="w-2/3 sm:w-1/2 m-auto">
        <Bio payload={biography} className="mb-14" />
        <Contact className="mb-14" />
        <Work className="mb-14" />
        <Education className="mb-14" />
      </div>
    </Layout>
  );
};

export default IndexPage;
