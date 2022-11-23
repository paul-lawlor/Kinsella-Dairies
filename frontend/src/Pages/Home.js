import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavigationBar } from "../Components/NavigationBar";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import heroImage1 from "../Images/cow.png";
import heroImage2 from "../Images/cow2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  // If account logged in, display account information
  // Otherwise, display sign up and login options
  if (localStorage.getItem("userId") !== null) {
    const history = useNavigate();

    return (
      <>
        {/* Hero Image Carousel */}
        <Carousel className="carousel">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={heroImage1}
              alt="First slide"
              height="400"
            />
            <Carousel.Caption className="caption text-dark rounded-4">
              <h3>Welcome to Kinsella Dairies</h3>
              <p>We are a family run business based in Scotland.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={heroImage2}
              alt="First slide"
              height="400"
            />
            <Carousel.Caption className="caption text-dark rounded-4">
              <h3>Kinsella Dairies Rewards</h3>
              <p>
                Welcome to our new online presence where you can access our
                loyalty offerings.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <div className="button-area text-center">
          <h2>See what we have to offer. Visit the shop!</h2>
          <Link to="/shop" className="home-button">
            <Button>Shop</Button>
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        {/* Hero Image Carousel */}
        <Carousel className="carousel">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={heroImage1}
              alt="First slide"
              height="400"
            />
            <Carousel.Caption className="caption text-dark rounded-4">
              <h3>Welcome to Kinsella Dairies</h3>
              <p>We are a family run business based in Scotland.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={heroImage2}
              alt="First slide"
              height="400"
            />
            <Carousel.Caption className="caption text-dark rounded-4">
              <h3>Kinsella Dairies Rewards</h3>
              <p>
                Welcome to our new online presence where you can access our
                loyalty offerings.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <div className="button-area">
          <p>
            If you have not made an online account yet, click the <b>Sign-up</b>{" "}
            button
          </p>
          <Link to="/Signup">
            <Button className="home-button">Sign-up</Button>
          </Link>

          <p>
            If you have already made an online account, click the <b>Login</b>{" "}
            button
          </p>
          <Link to="/Login">
            <Button className="home-button home-login-button btn-secondary">
              Login
            </Button>
          </Link>
        </div>
      </>
    );
  }
}
