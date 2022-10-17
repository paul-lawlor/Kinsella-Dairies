import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavigationBar } from '../Components/NavigationBar';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import heroImage1 from '../Images/cow.png';
import heroImage2 from '../Images/cow2.jpg';


export default function Home() {
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
            <p>We are a family run business based somewhere in the UK I cant remember.</p>
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
            <p>Welcome to our new online presence where you can access our loyalty offerings.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="button-area">
        <p>If you have not made an online account yet, click the <b>Sign-up</b> button</p>
        <Button href="/Signup" className="home-button">Sign-up</Button>
        
        <p>If you have already made an online account, click the <b>Login</b> button</p>
        <Button href="/Login" className="home-button home-login-button btn-secondary">Login</Button>
      </div>

    </>
  );
}
