import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';


import './LandingPage.css';



export default class LandingPage extends Component {
    render() {
        return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                <Navbar.Brand>PATHFINDER</Navbar.Brand>
                </Container>
            </Navbar>
        </>
          );
    }
}