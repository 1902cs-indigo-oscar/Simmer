import React from "react";
import { Link } from "react-router-dom";
import logo from '../home_icon_512x512.svg';
const Hero = () => (
  <section className="hero is-fullheight-with-navbar is-danger">
    <div className="hero-body">
      <div className="container has-text-centered has-text-black">
        <img src={logo} alt='homepage' width="100" height="50" />
        <h1 className="title has-text-black">Simmer</h1>
        <h2 className="subtitle has-text-black">Find recipes. Get cookin'.</h2>
        <Link className="button is-link has-text-black" to="/signup">
          Sign Up Now
        </Link>
        <br />
        <br />
        <p>You can save your recipes from multiple sites on Simmer!</p>
        <br />
        <ul>
          <li>1. Sign up/Log in on our site</li>
          <li>2. {" "}
            <a className='has-text-white' href="https://chrome.google.com/webstore/detail/simmer/gkmhaemjffpnaecgoknkkoofcboagojl?hl=en">
              Download our Chrome Extension
            </a> 
            {" "}/ Enter the link of the recipe site</li>
          <li>3. Click "Add Recipe" and you will see your recipe on our page</li>
        </ul>
        <br />
        We currently accept recipes from the following sites:
            <br />
        <a className='has-text-white' href="https://www.allrecipes.com/">All Recipes</a> |{" "}
        <a className='has-text-white' href="https://www.foodnetwork.com/">Food Network</a> |{" "}
        <a className='has-text-white' href="https://www.chowhound.com/">ChowHound</a> |{" "}
        <a className='has-text-white' href="https://www.epicurious.com/">Epicurious</a> |{" "}
        <a className='has-text-white' href="https://www.simplyrecipes.com/">Simply Recipes</a>
        <br />
      </div>

      
    </div>
  </section>
);

export default Hero;
