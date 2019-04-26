import React, { Component, Fragment } from 'react';
import { usuarioAutenticado } from "../../Services/Auth";
import '../../assets/css/App.css';
import Cabecalho from '../../Components/NavBar';
import { Link } from "react-router-dom";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBBtn, MDBCard, MDBCardBody,  MDBCardTitle, MDBCardText, MDBCol} from
"mdbreact";
import IMGMED2 from '../../assets/img/IMGMED2.jpg';
import IMGMED3 from '../../assets/img/IMGMED3.jpg';
import IMGMED1 from '../../assets/img/IMGMED1.jpg';
import Rodape from '../../Components/Footer';

class App extends Component {
  render() {
    return (
        <div className="App">
        <Cabecalho/>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
        style={{height:"53em"}}
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
            <MDBCarouselCaption>
            { usuarioAutenticado() ?
                            
                            (
                            <div >
                                                
                              <Fragment>
                                <MDBBtn rounded color="success" style={{height:"100px", width:"400px",fontSize:"25px"}} ><Link to="/cadastroConsulta" style={{textDecoration:"none"}}>Agende uma consulta</Link></MDBBtn>
                              </Fragment>    
                            </div>
                            ) :
                            (
                            <div>
                              <Fragment>
                                <MDBBtn rounded color="success" style={{height:"100px", width:"400px",fontSize:"25px"}}><Link to="/cadastroConsulta" style={{textDecoration:"none", color:"white"}}>Agende uma consulta</Link></MDBBtn>
                              </Fragment>
                            </div>
                            )
                            }
          </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                className="d-block w-100"
                src={IMGMED2}
                alt="Second slide"
              />
            </MDBView>
            <MDBCarouselCaption>
            { usuarioAutenticado() ?
                            
                (
                <div >
                                    
                  <Fragment>
                    <MDBBtn rounded color="success" style={{height:"100px", width:"400px",fontSize:"25px"}} ><Link to="/cadastroConsulta" style={{textDecoration:"none"}}>Agende uma consulta</Link></MDBBtn>
                  </Fragment>    
                </div>
                ) :
                (
                <div>
                  <Fragment>
                    <MDBBtn rounded color="success" style={{height:"100px", width:"400px",fontSize:"25px"}}><Link to="/cadastroConsulta" style={{textDecoration:"none", color:"white"}}>Agende uma consulta</Link></MDBBtn>
                  </Fragment>
                </div>
                )
                }
            
          </MDBCarouselCaption>
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
            <MDBCarouselCaption>
            { usuarioAutenticado() ?
                            
                            (
                            <div >                
                              <Fragment>
                                <MDBBtn rounded color="success" style={{height:"100px", width:"400px",fontSize:"25px"}} ><Link to="/cadastroConsulta" style={{textDecoration:"none"}}>Agende uma consulta</Link></MDBBtn>
                              </Fragment>    
                            </div>
                            ) :
                            (
                            <div>
                              <Fragment>
                                <MDBBtn rounded color="success" style={{height:"100px", width:"400px",fontSize:"25px"}}><Link to="/cadastroConsulta" style={{textDecoration:"none", color:"white"}}>Agende uma consulta</Link></MDBBtn>
                              </Fragment>
                            </div>
                            )
                            }
          </MDBCarouselCaption>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
      <br/>
      <br/>
      <br/>
      <br/>
      <section style={{display:"flex", flexDirection:"row", textAlign:"center", marginLeft: "10%"}}>
          <MDBCol>
          <MDBCard style={{ width: "22rem"}}>
            <MDBCardBody>
              <MDBCardTitle>Rápido</MDBCardTitle>
              <MDBCardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </MDBCardText>
              <MDBBtn color="success" href="#">Botão</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol>
          <MDBCard style={{ width: "22rem" }}>
            <MDBCardBody>
              <MDBCardTitle>Gratuito</MDBCardTitle>
              <MDBCardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </MDBCardText>
              <MDBBtn color="success" href="#">Botão</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol>
          <MDBCard style={{ width: "22rem" }}>
            <MDBCardBody>
              <MDBCardTitle>Seguro</MDBCardTitle>
              <MDBCardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </MDBCardText>
              <MDBBtn color="success" href="#">Botão</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </section>
      <br/>
      <br/>
      <br/>
      <br/>
      <Rodape/>                      
      </div>
    );
  }
}

export default App;
