import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import User from "./User";
import AjouterUtlisateur from "./AjouterUtlisateur";
import Table1 from "./table";
import Loader from "./loader/Loader";
import LoginForm from "./loginForm/loginForm.jsx";
import { Routes, Route } from "react-router-dom";
import AjouterFournisseur from "./AjouterFournisseur.jsx";
import AjouterProduit from "./AjouterProduit.jsx";
import AjouterDepot from "./AjouterDepot.jsx";
import AjouterCommande from "./PasserCommande.jsx";
import axios from "axios";
import EditUser from "./edituser.jsx";
import BasicExample from "./navbar";
import BasicExampleVendeur from "./navbarVendeur";
import VendeursTable from "./VendeursTable.js";
import DepotsTable from "./DepotTable.js";
import FournisseursTable from "./FournisseursTable.js";
import ProduitsTable from "./ProduiTable.js";
import CommandesTable from "./CommandeTable.js";
import RapportniveauStock from "./NiveauStockRapp.jsx";
function App() {
  const [isExpanded, setExpanded] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isadmin,setisadmin]=useState(false);
  const ajouterUtilisateurRef = useRef(null);
  const [vendeurs,setVendeurs]=useState([]);
  const [depots,setDepots]=useState([]);
  const [produits,setProduits]=useState([]);
  const [fournisseurs,setFournisseurs]=useState([]);
  function addUser(newUser) {
    setExpanded(false);
    setUsers(prevUsers => {
      return [...prevUsers, newUser];
    });
  }

  function deleteUser(id) {
    setUsers(prevUsers => {
      return prevUsers.filter((userItem, index) => {
        return index !== id;
      });
    });
  }

  useEffect(() => { 
    const token = localStorage.getItem("token");
    const usertype=localStorage.getItem("usertype");
    if (usertype==="admin"){
      console.log("admin")
      setisadmin(true);

    }
    else {
      setisadmin(false);
    }
    const headers = {
      'X-Access-Token': token
    };
    
    axios.get('http://localhost:3000/touslesvendeurs', { headers })
    .then(response => {
      console.log('Sellers:', response.data);
      setVendeurs(response.data);
    })
    .catch(error => {
      console.error('Error fetching sellers:', error);
    });
  
  // Make a GET request to retrieve data about all suppliers

   
  axios.get('http://localhost:3000/produits', { headers })
  .then(response => {
    console.log('Produits:', response.data);
    setProduits(response.data);
  })
  .catch(error => {
    console.error('Error fetching sellers:', error);
  });
  // Make a GET request to retrieve data about all depots
  axios.get('http://localhost:3000/touslesdepots', { headers })
    .then(response => {
      console.log('Depots:', response.data);
      setDepots(response.data);
    })
    .catch(error => {
      console.error('Error fetching depots:', error);
    });

    axios.get('http://localhost:3000/touslesfournisseurs', { headers })
    .then(response => {
      console.log('Depots:', response.data);
      setFournisseurs(response.data);
    })
    .catch(error => {
      console.error('Error fetching depots:', error);
    });
   
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fakeDataFetch();
  }, [isLoading]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ajouterUtilisateurRef.current && !ajouterUtilisateurRef.current.contains(event.target)) {
        setExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ajouterUtilisateurRef]);


  return isLoading ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<div className="body1"><LoginForm /></div>} />
      <Route
        path="/Utilisateur"
        element={
          <div>
            <header>
          <BasicExample/>
          </header>
            <div className="body2">
            <div ref={ajouterUtilisateurRef}>
              <AjouterUtlisateur
                onAdd={addUser}
                isExpanded={isExpanded}
                setExpanded={setExpanded}
              />
              
            </div>
            <VendeursTable  />
           
           
            </div>
            <Footer />
          </div>
        }
      />
      <Route
        path="/AjoutUtilisateur"
        element={
          <div>
          <header>
          <BasicExample/>
          </header>
        
            <div className="body2">
            <div ref={ajouterUtilisateurRef}>
              <AjouterUtlisateur
                onAdd={addUser}
                isExpanded={true}
                setExpanded={true}
              />
              
            </div>
            
           
            
            </div>
            <Footer />
          </div>
        }
      />
      <Route
        path="/Fournisseur"
        element={
          <div>
       <header>
          <BasicExample/>
          </header>
            <div className="body2">
            <div ref={ajouterUtilisateurRef}>
             
              <AjouterFournisseur
                onAdd={addUser}
                isExpanded={isExpanded}
                setExpanded={setExpanded}
              />
             
            </div>
            <FournisseursTable  />
           
            
            </div>
            <Footer />
          </div>
        }
      />
      <Route
        path="/ListeCommande"
        element={
          <div>
          <header> <BasicExampleVendeur/></header>
        
            <div className="body2">
            <div ref={ajouterUtilisateurRef}>
             
              
             
            </div>
            <CommandesTable  />
           
            
            </div>
            <Footer />
          </div>
          
        }
      />
      <Route
        path="/AjoutFournisseur"
        element={
          <div>
           <header>
          <BasicExample/>
          </header>
            <div className="body2">
            <div ref={ajouterUtilisateurRef}>
             
              <AjouterFournisseur
                onAdd={addUser}
                isExpanded={true}
                setExpanded={true}
              />
             
            </div>
            
           
            
            </div>
            <Footer />
          </div>
        }
      />
      <Route
        path="/NiveauStockRapport"
        element={
          <div>
           <header>
          <BasicExampleVendeur/>
          </header>
            <div className="body2">
            <RapportniveauStock />
           
            
          </div><Footer /></div>
        }
      />
       <Route
        path="/Stock2"
        element={
          <div>
           <header>
          <BasicExampleVendeur/>
          </header>
            <div className="body2">
            
           
            
          </div><Footer /></div>
        }
      />
       <Route
        path="/Stock3"
        element={
          <div>
           <header>
          <BasicExampleVendeur/>
          </header>
            <div className="body2">
          
           
            
          </div><Footer /></div>
        }
      />
      

      
      <Route
        path="/profile"
        element={
          <div>
             <header>
          <BasicExample/>
          </header>
            <div className="body2">
            <EditUser
             onAdd={addUser}
                isExpanded={true}
                setExpanded={true} />

            
          </div><Footer /></div>
        }
      />
      <Route
        path="/Commande"
        element={
          <div>
            <header>
          <BasicExampleVendeur/>
          </header>
            <div className="body2">
            <div ref={ajouterUtilisateurRef}>
             
              <AjouterCommande
                onAdd={addUser}
                isExpanded={true}
                setExpanded={true}
              />
             
            </div>
            <Table1 />
            
            
            </div><Footer /></div>
        }
      />
      <Route
        path="/Article"
        element={
          <div>
              <header>
          <BasicExampleVendeur/>
          </header>
            <div className="body2">
            <div ref={ajouterUtilisateurRef}>
             
              <AjouterProduit
                onAdd={addUser}
                isExpanded={isExpanded}
                setExpanded={setExpanded}
              />
               
            </div>
            <ProduitsTable />
           
            
            </div><Footer /></div>
        }
      />
      <Route
        path="/Ajoutarticle"
        element={
          <div>
             <header>
          <BasicExampleVendeur/>
          </header>
            <div className="body2">
            <div ref={ajouterUtilisateurRef}>
             
              <AjouterProduit
                onAdd={addUser}
                isExpanded={true}
                setExpanded={true}
              />
               
            </div>
            
           
           
            </div> <Footer /></div>
        }
      />
      <Route
        path="/Depot"
        element={
          <div>
           <header>
          <BasicExample/>
          </header>
            <div className="body2">
            <div ref={ajouterUtilisateurRef}>
            
               <AjouterDepot
                onAdd={addUser}
                isExpanded={isExpanded}
                setExpanded={setExpanded}
              />
            </div>
            <DepotsTable depots={depots} />
          
           
          </div> <Footer /></div>
        }
      />
      <Route
        path="/AjoutDepot"
        element={
          <div>
     <header>
          <BasicExample/>
          </header>
            <div className="body2">
            <div ref={ajouterUtilisateurRef}>
            
               <AjouterDepot
                onAdd={addUser}
                isExpanded={true}
                setExpanded={true}
              />
            </div>
            
          
            
          </div><Footer /></div>
        }
      />
    </Routes>
  );
}

export default App;
