import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../../fakeData/images/logo.jpg';
import './Header.css';
import user from '../../fakeData/images/peopleicon.png'

const Header = () => {


  return (
    <Navbar expand="lg">
      <img id="logo-img" src={logo} alt='img'></img>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/Home">Home</Nav.Link>
          <Nav.Link href="/destination">Destination</Nav.Link>
          <Nav.Link href="/bolg">Bolg</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
          <Nav.Link href="/login"> <img id="user-img-icon" src={user} alt=''></img> Login</Nav.Link>

        </Nav>

      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;