import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Bio, Contact, Education, Work } from "../components/About/Bio";
import prisma from "../prisma/db";

import { useSession } from "next-auth/react";
import { InferGetServerSidePropsType } from "next";
import { Biography } from "@prisma/client";
import { useEditingStore } from "../stores/useEditingStore";

interface IndexPayload {
  biography?: Biography;
}

/**
 * Get the initial data on page load to populate the layout.
 *
 * NOTE: Don't use GetServerSideProps type, if needed use the GetServerSidePropsContext
 */
export async function getServerSideProps() {
  const biography = await prisma.biography.findUnique({ where: { id: 1 } });
  const payload: IndexPayload = {};
  if (biography) {
    payload.biography = biography;
  }

  return { props: { payload } };
}

const IndexPage = ({
  payload,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { status } = useSession();
  const { editing } = useEditingStore();
  const [biography, setBiography] = useState<Biography | undefined>(
    payload.biography
  );

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

  if (status === "loading" || !biography) {
    return <Layout></Layout>;
  }

  return (
    <Layout>
      <div className="w-1/2 m-auto">
        <Bio payload={biography} className="mb-14" />
        <Contact className="mb-14" />
        <Work className="mb-14" />
        <Education className="mb-14" />
      </div>
    </Layout>
  );
};

export default IndexPage;
