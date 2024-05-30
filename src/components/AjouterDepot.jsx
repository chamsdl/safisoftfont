import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import axios from "axios";
function AjouterDepot(props) {
  const [depot, setDepot] = useState({
    nom: "",
    adresse: "",
    nomresponsable: "",
    capaciteMax:0,
    image: null // Champ pour stocker l'image du dépôt
  });

  function handleChange(event) {
    const { name, value, files } = event.target;

    if (files) {
      setDepot(prevDepot => ({
        ...prevDepot,
        [name]: files[0] // Stocker uniquement le premier fichier pour l'image
      }));
    } else {
      setDepot(prevDepot => ({
        ...prevDepot,
        [name]: value
      }));
    }
  }

  function submitDepot(event) {
   
  console.log(depot);
    axios
    .post('http://localhost:3000/ajoutdepots', depot)
    .then(response => {
      console.log("Depot created:", response.data);
      // Reset the form after successful submission
      setDepot({
        nom: "",
        adresse: "",
        nomresponsable: "",
        capaciteMax:0
        // image: null // Réinitialiser l'image après l'envoi
      });
    })
    .catch(error => {
      console.error("Error creating depot:", error);
    });
    event.preventDefault();
  }

  function expand() {
    props.setExpanded(true); 
  }

  return (
    <div className="cr-note">
      <form className="create-note" onSubmit={submitDepot}>
        {props.isExpanded ? (
          <>
            <input
              className="inputde"
              name="nom"
              onChange={handleChange}
              value={depot.nom}
              placeholder="Nom du dépôt"
              required
            />
            <input
              className="inputde"
              name="adresse"
              onChange={handleChange}
              value={depot.adresse}
              placeholder="Adresse du dépôt"
              required
            />
            <input
              className="inputde"
              name="nomresponsable"
              onChange={handleChange}
              value={depot.nomresponsable}
              placeholder="Responsable du dépôt"
              required
            />
            <input
              className="inputde"
              type="number"
              name="capaciteMax"
              onChange={handleChange}
              value={depot.capaciteMax}
              placeholder="Capacité maximale"
              required
            />
           
            <input
              className="inputde"
              name="image"
              onChange={handleChange}
              type="file"
              accept="image/*"
              
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
            value={depot.content}
            placeholder="Ajouter un dépôt"
            rows={props.isExpanded ? 8 : 1}
          />
        )}
      </form>
    </div>
  );
}

export default AjouterDepot;
