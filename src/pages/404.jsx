import React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Header from "../components/header";

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <Header showHome={true} />
    <div className="m-8">
      <h1 className="text-3xl">
        <span className="border-r border-solid border-white mr-3 pr-3">
          404
        </span>
        Not found
      </h1>
      <p className="text-xl">Whatever you were looking for... it's not here.</p>
    </div>
  </Layout>
);

export default NotFoundPage;
