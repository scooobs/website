import Link from "next/link";
import Layout from "../components/Layout";
import Hover from "../components/Hover";
import { Bio, Education, Work } from "../components/About/Bio";

const IndexPage = () => (
  <Layout title="Hello | Conal O'Leary">
    <div className="flex flex-col w-1/2 m-auto">
      <Bio />
      <Work className="mt-14" />
      <Education className="mt-14" />
    </div>
  </Layout>
);

export default IndexPage;
