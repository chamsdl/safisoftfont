import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import axios from "axios";
function AjouterFournisseur(props) {
  const [fournisseur, setFournisseur] = useState({
    nom: "",
    email: "",
    adresse: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFournisseur(prevFournisseur => ({
      ...prevFournisseur,
      [name]: value
    }));
  }

  function submitFournisseur(event) {
    axios
    .post('http://localhost:3000/ajoutfournisseur', fournisseur)
    .then(response => {
      console.log("Fournisseur created:", response.data);
      // Reset the form after successful submission
      setFournisseur({
        nom: "",
        email: "",
        adresse: ""
      });
    })
    .catch(error => {
      console.error("Error creating fournisseur:", error);
    });
   
    event.preventDefault();
  }

  function expand() {
    props.setExpanded(true); 
  }

  return (
    <div className="cr-note">
      <form className="create-note" onSubmit={submitFournisseur}>
        {props.isExpanded ? (
          <>
            <input
              className="inputde"
              name="nom"
              onChange={handleChange}
              value={fournisseur.nom}
              placeholder="Nom du fournisseur"
              required
            />
            <input
              className="inputde"
              name="email"
              onChange={handleChange}
              value={fournisseur.email}
              placeholder="Email du fournisseur"
              type="email"
              required
            />
            <input
              className="inputde"
              name="adresse"
              onChange={handleChange}
              value={fournisseur.adresse}
              placeholder="Adresse du fournisseur"
              required
            />
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
            value={fournisseur.content}
            placeholder="Ajouter un fournisseur"
            rows={props.isExpanded ? 8 : 1}
          />
        )}
      </form>
    </div>
  );
}

export default AjouterFournisseur;
