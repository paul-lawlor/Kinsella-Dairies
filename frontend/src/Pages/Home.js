import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavigationBar } from "../Components/NavigationBar";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import heroImage1 from "../Images/cow.png";
import heroImage2 from "../Images/cow2.jpg";
import { useState } from 'react';

export default function Home() {

  
  
  // If account logged in, display account information
  // Otherwise, display sign up and login options
  if (localStorage.getItem("userId") !== null) {

    // Api URL
    const ACCOUNT_REST_API_URL = "http://localhost:5000/accounts/"+localStorage.getItem('userId');
  
    // Use states
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        addressLineOne: '',
        addressLineTwo: '',
        postcode: '',
        password: ''
    });

    // On load, populate data
    window.onload = (event) => {
      axios.get(ACCOUNT_REST_API_URL)
      .then(function (response) {
          setUserData({
              firstName: response.data[0].firstName,
              lastName: response.data[0].lastName,
              phoneNumber: response.data[0].phoneNumber,
              addressLineOne: response.data[0].addressLineOne,
              addressLineTwo: response.data[0].addressLineTwo,
              postcode: response.data[0].postcode,
              password: response.data[0].password
          });
      });
    }

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
              <p>
                We are a family run business based in Scotland.
              </p>
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
          <h2>More coming soon...</h2>
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
              <p>
                We are a family run business based in Scotland.
              </p>
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
          <Button href="/Signup" className="home-button">
            Sign-up
          </Button>

          <p>
            If you have already made an online account, click the <b>Login</b>{" "}
            button
          </p>
          <Button
            href="/Login"
            className="home-button home-login-button btn-secondary"
          >
            Login
          </Button>
        </div>
      </>
    );
  }
}
