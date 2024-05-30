import React, { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ReceiptIcon from '@mui/icons-material/Receipt';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode} from '@fortawesome/free-solid-svg-icons';


function AjouterCommande(props) {
  const [commande, setCommande] = useState({
    codeBarre: "",
    prix: 0,
    nom: "",
    quantite: 1 // Valeur initiale de la quantité
  });
  const [scannedCode, setScannedCode] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [commandesList, setCommandesList] = useState([]); // Tableau pour stocker les commandes

  useEffect(() => {
    // Vous pouvez ajouter ici la logique pour vérifier le produit dans la base de données
    // Utilisez l'identifiant du produit (codeBarre) de la commande pour effectuer la vérification
  }, [commande.codeBarre]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCommande(prevCommande => ({
      ...prevCommande,
      [name]: value
    }));
  };

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

  const addNewCommande = async () => {
    try {
     let  code="";
      if (commande.codeBarre.length!=0){
        code=commande.codeBarre;
      }
      else {
        code=scannedCode;
      }
      let response1 = await axios.get(`http://localhost:3000/produits/${code}`);
      let result = response1.data;
      if (result.quantiteStock < commande.quantite) {
        window.alert("verifier le stock");

      }
      else { setScannedCode("");

        setCommandesList(prevList => [...prevList, { codeBarre: commande.codeBarre, quantite: commande.quantite, nom: result.nom ,prix:result.prix}]); // Ajoute la commande à la liste de commandes
        setCommande({
          codeBarre: "",
          quantite: 1 // Réinitialise la quantité à 1
        });
      }

    } catch (error) {
      console.log(error)
    }



  };

  const facturerCommandes = async () => {
    const totalPrix = commandesList.reduce((sum, commande) => {
      return sum + commande.prix*commande.quantite;
  }, 0);
    try {
      let response = await axios.post(`http://localhost:3000/ajoutcommande`, { produits: commandesList, idvendeur: localStorage.getItem("id"), nom: localStorage.getItem("nom") ,montanttotal:totalPrix});
      console.log(response.data);
      setCommandesList([]);
    } catch (error) {

      console.log(error);
    }

  };

  const toggleScanner = () => {
    setShowScanner(!showScanner);
  };

  const expand = () => {
    props.setExpanded(true);
  };

  return (
    <div className="cr-note">
      <form className="create-note" onSubmit={(e) => { e.preventDefault(); addNewCommande(); }}>
        {showScanner ? (
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
            <Zoom in={props.isExpanded}>
              <Fab onClick={toggleScanner} className="button1">
              <FontAwesomeIcon icon={faBarcode} />
              </Fab>
            </Zoom>


            <input
              className="inputde"
              name="codeBarre"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              value={scannedCode ? scannedCode : commande.codeBarre}
              placeholder="Saisir le code à barres"
              type="number"
              required
            />
            <input
              className="inputde"
              name="quantite"
              onChange={handleChange}
              value={commande.quantite}
              placeholder="Quantité"
              type="number"
              required
            />
            <Zoom in={props.isExpanded}>
              <Fab onClick={addNewCommande} className="ButtonAdd">
                <AddIcon />
              </Fab>
            </Zoom>
          </>
        )}
      </form>

      {commandesList.length > 0 && (
        <div className="commande">
          <h2>Liste des commandes:</h2>
          <ul>
            {commandesList.map((commande, index) => (
              <li key={index}>
              NomArticle : {commande.nom} ,Prix:{commande.prix} Quantité: {commande.quantite}
              </li>
            ))}
          </ul>
          <button className="button3" onClick={facturerCommandes}><ReceiptIcon />Facturer les commandes</button>
        </div>
      )}
    </div>
  );
}

export default AjouterCommande;
