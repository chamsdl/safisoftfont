import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import axios from "axios";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';

function AjouterProduit(props) {
  const [produit, setProduit] = useState({
    nom: "",
    description: "",
    codeBarre: "",
    prix: "",
    quantite: "",
    codeBarreImage: null // Changer pour stocker l'image du code-barres
  });
  const [commande, setCommande] = useState({
    codeBarre: "",
    quantite: 1 // Valeur initiale de la quantité
  });
  const [scannedCode, setScannedCode] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = (err, result) => {
    if (result) {
      setScannedCode(result.text);
      setShowScanner(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const enteredCode = event.target.value;
      setCommande(prevCommande => ({
        ...prevCommande,
        codeBarre: enteredCode
      }));
      setScannedCode(enteredCode);
      setShowScanner(false);
    }
  };

  const toggleScanner = () => {
    setShowScanner(!showScanner);
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (files) {
      setProduit(prevProduit => ({
        ...prevProduit,
        [name]: files[0] // Stocker uniquement le premier fichier pour l'image
      }));
    } else {
      setProduit(prevProduit => ({
        ...prevProduit,
        [name]: value
      }));
    }
    console.log(produit);
  };

  const submitProduit = (event) => {
    console.log(produit);
    axios.post('http://localhost:3000/ajoutproduits', produit)
      .then(response => {
        // Handle successful response here
        console.log('Produit created:', response.data);

        // Reset the form
        setProduit({
          nom: "",
          description: "",
          code: "",
          prix: "",
          quantite: "",
          codeBarreImage: null // Réinitialiser l'image après l'envoi
        });
      })
      .catch(error => {
        // Handle error here
        if (error.response && error.response.data && error.response.data.message) {
          if (error.response.data.message === "Un produit avec le même code barre existe déjà.") {
            window.alert("Ce code barre existe déjà.");
          } else {
            console.error('Error message:', error.response.data.message);
          }
        } else {
          console.error('Error creating produit:', error);
        }
      });

    event.preventDefault();
  };

  const expand = () => {
    props.setExpanded(true);
  };

  return (
    <div className="cr-note">
      <form className="create-note" onSubmit={submitProduit}>
        {props.isExpanded ? (
          showScanner ? (
            <>
              <BarcodeScannerComponent
                width={400}
                height={400}
                onUpdate={handleScan}
                onError={handleError}
              />
            </>
          ) : (
            <>
              <input
                className="inputde"
                name="nom"
                onChange={handleChange}
                value={produit.nom}
                placeholder="Nom du Article"
                required
              />
              <input
                className="inputde"
                name="description"
                onChange={handleChange}
                value={produit.description}
                placeholder="Description du Article"
                required
              />
              <input
                className="inputde"
                name="prix"
                onChange={handleChange}
                value={produit.prix}
                placeholder="Prix du Article"
                type="number"
                required
              />
              <input
                className="inputde"
                name="codeBarre"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                value={scannedCode ? scannedCode : produit.codeBarre}
                placeholder="Saisir le code à barres"
                type="number"
                required
              />
              <input
                className="inputde"
                name="quantite"
                onChange={handleChange}
                value={produit.quantite}
                placeholder="Quantité du Article"
                type="number"
                required
              />
              {/* Champ pour télécharger une image */}
             
              <Zoom in={props.isExpanded}>
                <Fab type="submit" className="ButtonAdd">
                  <AddIcon />
                </Fab>
              </Zoom>
              <Zoom in={props.isExpanded}>
                <Fab onClick={toggleScanner} className="button2">
                  <FontAwesomeIcon icon={faBarcode} />
                </Fab>
              </Zoom>
            </>
          )
        ) : (
          <textarea
            name="content"
            onClick={expand}
            onChange={handleChange}
            value={produit.content}
            placeholder="Ajouter un Article"
            rows={props.isExpanded ? 8 : 1}
          />
        )}
      </form>
    </div>
  );
}

export default AjouterProduit;
