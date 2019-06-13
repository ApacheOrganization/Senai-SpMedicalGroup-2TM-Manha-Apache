import React, { Component, Fragment } from 'react';
import { usuarioAutenticado } from "../../Services/Auth";
import '../../assets/css/App.css';
import Cabecalho from '../../Components/NavBar';
import { Link } from "react-router-dom";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from
  "mdbreact";
import IMGMED2 from '../../assets/img/IMGMED2.jpg';
import IMGMED3 from '../../assets/img/IMGMED3.jpg';
import IMGMED1 from '../../assets/img/IMGMED1.jpg';
import Rodape from '../../Components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Cabecalho />
        <MDBCarousel
          activeItem={1}
          length={3}
          showControls={true}
          showIndicators={true}
          className="z-depth-1"
          style={{ height: "32%" }}
        >
          <MDBCarouselInner>
            <MDBCarouselItem itemId="1">
              <MDBView>
                <img
                  className="d-block w-100"
                  src={IMGMED1}
                  alt="First slide"
                />
              </MDBView>

            </MDBCarouselItem>
            <MDBCarouselItem itemId="2">
              <MDBView>
                <img
                  className="d-block w-100"
                  src={IMGMED2}
                  alt="Second slide"
                />
              </MDBView>

            </MDBCarouselItem>
            <MDBCarouselItem itemId="3">
              <MDBMask overlay="black-strong" />
              <MDBView>
                <img
                  className="d-block w-100"
                  src={IMGMED3}
                  alt="Third slide"
                />
              </MDBView>

            </MDBCarouselItem>
          </MDBCarouselInner>
        </MDBCarousel>
        <br />
        <br />
        <br />
        <br />
        <section className="text-center mb-4" style={{padding:'0 10% 0 10%'}}>
          <MDBRow>
            <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
              <MDBCard wide ecommerce>
                <MDBCardBody cascade>
                  <MDBCardTitle>Rápido</MDBCardTitle>
                  <MDBCardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </MDBCardText>
                  <MDBBtn color="success" href="#">Botão</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
              <MDBCard wide ecommerce>
                <MDBCardBody>
                  <MDBCardTitle>Gratuito</MDBCardTitle>
                  <MDBCardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </MDBCardText>
                  <MDBBtn color="success" href="#">Botão</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
              <MDBCard wide ecommerce>
                <MDBCardBody>
                  <MDBCardTitle>Seguro</MDBCardTitle>
                  <MDBCardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </MDBCardText>
                  <MDBBtn color="success" href="#">Botão</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </section>
        <br />
        <br />
        <br />
        <br />
        <Rodape />
      </div>
    );
  }
}

export default App;
