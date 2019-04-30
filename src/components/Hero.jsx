import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => (
  <section class="hero is-fullheight-with-navbar is-danger">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">Hero title</h1>
        <h2 class="subtitle">Hero subtitle</h2>
        <Link className="button is-link" to="/signup">
          Sign Up Now
        </Link>
      </div>
    </div>
    <style jsx>{`
      .container {
        font-family: 'Aclonica';
      }
    `}</style>
  </section>
);

export default Hero;
