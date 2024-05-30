import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState } from "react";
import "./custom.css"; 
import LogoutIcon from '@mui/icons-material/Logout';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function BasicExampleVendeur() {
  const navigate=useNavigate();
  const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);
  const [isLinkMenuOpen, setIsLinkMenuOpen] = useState(false);
  const [isL2MenuOpen, setIsL2MenuOpen] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const handlelogout= async()=>{
  
    localStorage.removeItem("usertype");
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <Navbar expand="lg" className="bg-body-dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-dark"><h1>SAFISoft</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <NavDropdown
              title={<span className="text-white fs-6">Passer des commandes</span>}
              id="link-nav-dropdown"
              className="text-white"
              show={isLinkMenuOpen}
              onMouseEnter={() => setIsLinkMenuOpen(true)}
              onMouseLeave={() => setIsLinkMenuOpen(false)}
              style={{ marginRight: "30px" }} 
            >
            <NavDropdown.Item as={Link} to="/Commande" className="text-dark">Passer une commande</NavDropdown.Item>
            <NavDropdown.Divider /><NavDropdown.Item as={Link} to="/ListeCommande" className="text-dark">lister les commandes</NavDropdown.Item>
           </NavDropdown>
            <NavDropdown
              title={<span className="text-white fs-6">Gérer des articles</span>}
              id="home-nav-dropdown"
              className="text-dark"
              show={isHomeMenuOpen}
              onMouseEnter={() => setIsHomeMenuOpen(true)}
              onMouseLeave={() => setIsHomeMenuOpen(false)}
              style={{ marginRight: "30px" }} 
            >
              <NavDropdown.Item as={Link} to="/Article" className="text-dark">lister les articles</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/Ajoutarticle" className="text-dark">Ajouter un article</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={<span className="text-white fs-6">Générer des rapports</span>}
              id="link-nav-dropdown"
              className="text-white"
              show={isL2MenuOpen}
              onMouseEnter={() => setIsL2MenuOpen(true)}
              onMouseLeave={() => setIsL2MenuOpen(false)}
              style={{ marginRight: "30px" }} 
            >
              <NavDropdown.Item as={Link} to="/NiveauStockRapport" className="text-dark">Rapports sur les niveaux de stock</NavDropdown.Item>
              <NavDropdown.Divider />
             
            </NavDropdown>
            
          </Nav>
          <Nav className="ms-auto"> 
            <NavDropdown
              title={<SettingsIcon className="text-white"/>}
              id="settings-dropdown"
              className="text-white"
              show={isSettingsMenuOpen}
              onMouseEnter={() => setIsSettingsMenuOpen(true)}
              onMouseLeave={() => setIsSettingsMenuOpen(false)}
              style={{ marginRight: "30px" }}
            >
              
              <NavDropdown.Item as={Link} to="/profile" className="text-dark">
                <EngineeringIcon /> profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handlelogout} className="text-dark">
                <LogoutIcon />logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExampleVendeur;