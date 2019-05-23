import React, { Component } from "react";
import "mdbreact/dist/css/mdb.css";
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../assets/img/logo.png'

import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

//withRouter para redirecionar as rotas
import { withRouter} from 'react-router-dom';

class Rodape extends Component{
    render(){
       return(
        <MDBFooter style={{background:"#fcfcfc", borderTop:"10px, solid, red"}} className="font-small pt-4 mt-4">
        <MDBContainer fluid className="text-center text-md-left">
          <MDBRow>
            <MDBCol md="4">
              <h5 className="title"><img src={logo} alt="Logo" /></h5>
              
            </MDBCol>
            <MDBCol md="3">
              <h5 className="title" style={{color:"black"}} >Links</h5>
              <ul>
                <li className="list-unstyled">
                  <a href="#!" style={{color:"#5fbfe1"}} >Link 1</a>
                </li>
                <li className="list-unstyled">
                  <a href="#!" style={{color:"#5fbfe1"}}>Link 2</a>
                </li>
                <li className="list-unstyled">
                  <a href="#!" style={{color:"#5fbfe1"}}>Link 3</a>
                </li>
                <li className="list-unstyled">
                  <a href="#!" style={{color:"#5fbfe1"}}>Link 4</a>
                </li>
              </ul>
            </MDBCol>
            <MDBCol md="3">
              <h5 className="title" style={{color:"black"}}>Links</h5>
              <ul>
                <li className="list-unstyled">
                  <a href="#!" style={{color:"#5fbfe1"}}>Link 1</a>
                </li>
                <li className="list-unstyled">
                  <a href="#!" style={{color:"#5fbfe1"}}>Link 2</a>
                </li>
                <li className="list-unstyled">
                  <a href="#!" style={{color:"#5fbfe1"}}>Link 3</a>
                </li>
                <li className="list-unstyled">
                  <a href="#!" style={{color:"#5fbfe1"}}>Link 4</a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer >
        <div className="footer-copyright text-center py-3" style={{background:"#5fbfe1"}}>
          <MDBContainer fluid >
            &copy; {new Date().getFullYear()} Copyright: <a href="http://localhost:3000"> SPMedicalGroup.com </a>
          </MDBContainer>
        </div>
      </MDBFooter>
                
            );
        
    }
}

//componente utilizando withRouter para poder utilizar o redirect do logout
export default withRouter(Rodape);