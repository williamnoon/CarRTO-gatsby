import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import "../assets/scss/main.scss"
import SEO from "../components/seo"

export default () => (
  <Layout>
    <SEO title="Home" />
    <div
      style={{
        // maxWidth: `300px`,
        marginBottom: `1.45rem`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {["Premium", "SUV", "MiniVan", "Economy"].map(title => (
          <Link
            className="btn btn-default btn-lg"
            to={`/${title}/`}
            style={{ margin: 4 }}
          >
            {title}
          </Link>
        ))}
      </div>
      <a
        className="btn btn-default btn-lg"
        href="https://hyrecar.com/"
        style={{ margin: 4 }}
      >
        I already have a Hyrecar account
      </a>
    </div>
    <div style={{ position: "absolute", bottom: 10, left: 10 }}>
      <Link className="btn btn-default btn-lg" to="/rent/">
        Go Back
      </Link>
    </div>
  </Layout>
)
