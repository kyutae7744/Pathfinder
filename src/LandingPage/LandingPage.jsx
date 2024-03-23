import React, {Component, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './LandingPage.css';
import { NavItem } from 'react-bootstrap';
import { NavLink } from 'reactstrap';


function LandingPage() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleReset = () => window.location.reload();
  
    return (
      <>
        <Navbar sticky="top" bg="dark" data-bs-theme="dark">
            <Container>
            <Navbar.Brand style={{fontWeight: 'bold'}}>PathFinder</Navbar.Brand>
            
            
            
            <Navbar.Text>
            <Button variant="dark" id="wallWeight" className="textWallWeight">
                Wall
            </Button>
            <Navbar.Text> 
                &nbsp;
            </Navbar.Text>
            <Button variant="secondary" onClick={handleReset}>
                Reset Grid
            </Button>
            <Navbar.Text> 
                &nbsp;
            </Navbar.Text>
            
            <Button variant="secondary" onClick={handleShow}>
                Tutorial
            </Button>
            
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton>
                    <Modal.Title>Welcome to PathFinder!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Select an algorithm to run, and it will visualize it for you!
                    <br></br>
                    <br></br>
                    Press the W key to toggle between Wall and Weight. 
                    <br></br>Wall: Cannot go through.
                    <br></br>Weight: Can go through but costs more. Weights only work on Dijkstra's and A*
                    <br></br>
                    <br></br>
                    Click and drag the mouse within the Grid to place Walls/Weights.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
            </Navbar.Text>
            </Container>
        </Navbar>
  
        
      </>
    );
  }

  export default LandingPage;