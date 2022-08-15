import React from "react";
import Layout from "../components/Layout";
import { Bio, Contact, Education, Work } from "../components/About/Bio";

const IndexPage = () => (
  <Layout title="Hello | Conal O'Leary">
    <div className="w-1/2 m-auto">
      <Bio className="mb-14" />
      <Contact className="mb-14" />
      <Work className="mb-14" />
      <Education className="mb-14" />
    </div>
  </Layout>
);

export default IndexPage;
