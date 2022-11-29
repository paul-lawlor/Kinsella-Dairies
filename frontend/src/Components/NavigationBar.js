import "bootstrap/dist/css/bootstrap.min.css";
import "./NavigationBar.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../Images/logo.png";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

export function NavigationBar() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
      />
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="logo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top mx-2"
            />
            Kinsella Dairies
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/shop">Shop</Nav.Link>
              <Nav.Link href="/accounts">Account</Nav.Link>
              <Nav.Link href="/orders">Orders</Nav.Link>
              <Nav.Link href="/admin">Admin</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown
                className="nav-dropdown"
                eventKey={1}
                title={
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-person-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path
                        fill-rule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                      />
                    </svg>
                  </div>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/Login">Log in</NavDropdown.Item>
                <NavDropdown.Item href="/Signup">Signup</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
