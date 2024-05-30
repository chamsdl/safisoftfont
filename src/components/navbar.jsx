import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import LogoutIcon from '@mui/icons-material/Logout';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SettingsIcon from '@mui/icons-material/Settings';
import "./custom.css"; // Assurez-vous d'importer votre fichier de styles CSS
import { useNavigate } from "react-router-dom";
function BasicExample() {
  const navigate=useNavigate();
  const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);
  const [isLinkMenuOpen, setIsLinkMenuOpen] = useState(false);
  const [isL1MenuOpen, setIsL1MenuOpen] = useState(false);
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
              title={<span className="text-white fs-6">Gérer les utilisateurs</span>}
              id="home-nav-dropdown"
              className="text-white"
              show={isHomeMenuOpen}
              onMouseEnter={() => setIsHomeMenuOpen(true)}
              onMouseLeave={() => setIsHomeMenuOpen(false)}
              style={{ marginRight: "30px" }} 
            >
              <NavDropdown.Item as={Link} to="/Utilisateur" className="text-dark">lister les utilisateurs</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/AjoutUtilisateur" className="text-dark">Ajouter un utilisateur</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={<span className="text-white fs-6">Gérer les fournisseurs</span>}
              id="link-nav-dropdown"
              className="text-white"
              show={isLinkMenuOpen}
              onMouseEnter={() => setIsLinkMenuOpen(true)}
              onMouseLeave={() => setIsLinkMenuOpen(false)}
              style={{ marginRight: "30px" }} 
            >
              <NavDropdown.Item as={Link} to="/Fournisseur" className="text-dark">lister les fournisseurs</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/AjoutFournisseur" className="text-dark">Ajouter un fournisseur</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={<span className="text-white fs-6">Gérer les dépots</span>}
              id="link-nav-dropdown"
              className="text-white"
              show={isL1MenuOpen}
              onMouseEnter={() => setIsL1MenuOpen(true)}
              onMouseLeave={() => setIsL1MenuOpen(false)}
              style={{ marginRight: "30px" }} 
            >
              <NavDropdown.Item as={Link} to="/Depot" className="text-dark">lister les dépots</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/AjoutDepot" className="text-dark">Ajouter un depot</NavDropdown.Item>
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
              <NavDropdown.Item as={Link} to="/Stock1" className="text-dark">Rapports sur les niveaux de stock</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/Stock1" className="text-dark">Rapports sur les mouvements de stock</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/Stock1" className="text-dark">Rapports de performance des articles</NavDropdown.Item>
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
              <NavDropdown.Item onClick={handlelogout}  className="text-dark">
                <LogoutIcon />logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
