import React from "react";
import { Link } from "react-router-dom";

const Hero = () => (
  <section className="hero is-fullheight-with-navbar is-danger">
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title has-text-black">Simmer</h1>
        <h2 className="subtitle has-text-black">Find recipes. Get cookin'.</h2>
        <Link className="button is-link has-text-black" to="/signup">
          Sign Up Now
        </Link>
      </div>
    </div>
  </section>
);

export default Hero;
