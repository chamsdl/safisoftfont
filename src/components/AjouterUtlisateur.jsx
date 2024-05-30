import React, { useState,useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import axios from "axios";
function AjouterUtlisateur(props) {
  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    cin: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false
  });
  useEffect( () => {



  } ,[])

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setUser(prevUser => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function submitUser(event) {
    const vendeurData = {
      username: user.email,
      password: user.password,
      email: user.email,
      nom: user.nom,
      prenom: user.nom,
      cin: user.prenom,tel:user.tel
    };
    if (user.isAdmin){
      axios.post('http://localhost:3000/createadmin', vendeurData)
      .then(response => {
        console.log('Vendeur created successfully:', response.data);
      })
      .catch(error => {
        console.error('Error creating vendeur:', error.response.data);
      });
   console.log(user);
    event.preventDefault();

    }
    else {
      axios.post('http://localhost:3000/createvendeur', vendeurData)
      .then(response => {
        console.log('Vendeur created successfully:', response.data);
      })
      .catch(error => {
        console.error('Error creating vendeur:', error.response.data);
      });
   console.log(user);
    event.preventDefault();
    }
  
  }

  function expand() {
    props.setExpanded(true); 
  }

  return (
    <div className="cr-note">
      <form className="create-note" onSubmit={submitUser}>
        {props.isExpanded ? (
          <>
            <input
            className="inputde"
              name="nom"
              onChange={handleChange}
              value={user.nom}
              placeholder="Nom"
              required
            />
            <input
            className="inputde"
              name="prenom"
              onChange={handleChange}
              value={user.prenom}
              placeholder="Prénom"
              required
            />
            <input
            className="inputde"
              name="cin"
              type="number"
              onChange={handleChange}
              value={user.cin}
              placeholder="CIN"
              required
            />
            <input
            className="inputde"
              name="tel"
              type="number"
              onChange={handleChange}
              value={user.tel}
              placeholder="tel"
              required
            />
            <input
            className="inputde"
              name="email"
              onChange={handleChange}
              value={user.email}
              placeholder="Email"
              type="email"
              required
            />
            <input
            className="inputde"
              name="password"
              onChange={handleChange}
              value={user.password}
              placeholder="Mot de passe"
              type="password"
              required
            />
            <input
            className="inputde"
              name="confirmPassword"
              onChange={handleChange}
              value={user.confirmPassword}
              placeholder="Confirmer le mot de passe"
              type="password"
              required
            />
           <div className="form-check form-switch" style={{ marginLeft: "10px" }}>
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                name="isAdmin"
                style={{ marginTop: "28px" }}
                checked={user.isAdmin}
                onChange={handleChange}
              />
              <label className="inputd form-check-label" htmlFor="flexSwitchCheckDefault">
              <span style={{ width: "120px", fontFamily: "McLaren, cursive" }}>Est un admin</span>

              </label>
            </div>
            <Zoom in={props.isExpanded}>
  <Fab type="submit" className="ButtonAdd">
    <AddIcon />
  </Fab>
</Zoom>


          </>
        ) : (
          <textarea
            name="content"
            onClick={expand}
            onChange={handleChange}
            value={user.content}
            placeholder="Ajouter un utilisateur"
            rows={props.isExpanded ? 8 : 1}
          />
        )}
      </form>
    </div>
  );
}

export default AjouterUtlisateur;
