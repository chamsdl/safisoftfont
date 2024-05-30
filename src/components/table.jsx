import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import "./table.css";
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import InfoIcon from '@mui/icons-material/Info';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import axios from 'axios';
import ReplyIcon from '@mui/icons-material/Reply';

function Table1({ depots: propDepots, vendeurs: propVendeurs, fournisseurs: propFournisseurs, produits: propProduits }) {
  const [depots, setDepots] = useState(propDepots);
  const [vendeurs, setVendeurs] = useState(propVendeurs);
  const [fournisseurs, setFournisseurs] = useState(propFournisseurs);
  const [produits, setProduits] = useState(propProduits);
  const [editableRow, setEditableRow] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [selectedRow, setSelectedRow] = useState(null); 

  const isEmpty = !(vendeurs && vendeurs.length) &&
    !(depots && depots.length) &&
    !(fournisseurs && fournisseurs.length) &&
    !(produits && produits.length);

  if (isEmpty) {
    return null;
  }

  const handleEditClick = (index) => {
    setEditableRow(index);
  };

  const handleSaveClickvendeur = async (id) => {
    console.log(id);
    console.log(editedValues);
    try {
      const response = await axios.patch(`http://localhost:3000/updatevendeur/${id}`, editedValues);
      console.log('Response:', response.data);
      axios.get('http://localhost:3000/touslesvendeurs')
      .then(response => {
        console.log('Sellers:', response.data);
        setVendeurs(response.data);
      })
      .catch(error => {
        console.error('Error fetching sellers:', error);
      });
      // Handle success
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
    setEditableRow(null);
    setEditedValues({});
  };

  
  const handleSaveClickproduit =async (id) => {
    console.log(id);
    console.log(editedValues);
    try {
      const response = await axios.patch(`http://localhost:3000/updateproduit/${id}`, editedValues);
      console.log('Response:', response.data);
      axios.get('http://localhost:3000/produits', )
      .then(response => {
        console.log('Produits:', response.data);
        setProduits(response.data);
      })
      .catch(error => {
        console.error('Error fetching sellers:', error);
      });
      // Handle success
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }

    setEditableRow(null);
    setEditedValues({});
  };
  
  const handleSaveClickdepot =async (id) => {
    console.log(editedValues);
    try {
      const response = await axios.patch(`http://localhost:3000/updatedepot/${id}`, editedValues);
      console.log('Response:', response.data);
      axios.get('http://localhost:3000/touslesdepots', )
      .then(response => {
        console.log('Depots:', response.data);
        setDepots(response.data);
      })
      .catch(error => {
        console.error('Error fetching depots:', error);
      });
      // Handle success
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
    console.log(id);
    setEditableRow(null);
    setEditedValues({});
  };
  
  const handleSaveClickfournisseur = async(id) => {
    try {
      const response = await axios.patch(`http://localhost:3000/updatefournisseur/${id}`, editedValues);
      console.log('Response:', response.data);
      axios.get('http://localhost:3000/touslesfournisseurs', )
      .then(response => {
        console.log('Depots:', response.data);
        setFournisseurs(response.data);
      })
      .catch(error => {
        console.error('Error fetching depots:', error);
      });
      // Handle success
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
    console.log(id);
    setEditableRow(null);
    setEditedValues({});
  };
  const handleEditChange = (key, value) => {
    setEditedValues({ ...editedValues, [key]: value });
  };

  const handleInfoClick = (index) => {
    setSelectedRow(index); 
  };
  const handledeletevendeur =async(id) =>{
    try {
      const response = await axios.delete(`http://localhost:3000/deletevendeur/${id}`);
      console.log('Vendeur deleted successfully:', response.data);
      axios.get('http://localhost:3000/touslesvendeurs')
      .then(response => {
        console.log('Sellers:', response.data);
        setVendeurs(response.data);
      })
      .catch(error => {
        console.error('Error fetching sellers:', error);
      });
      // Handle success
    } catch (error) {
      console.error('Error deleting Vendeur:', error);
      // Handle error
    }

  }
  const handledeletedepot =async(id) =>{
    try {
      const response = await axios.delete(`http://localhost:3000/deletedepot/${id}`);
      console.log('Depot deleted successfully:', response.data);
      axios.get('http://localhost:3000/touslesdepots', )
      .then(response => {
        console.log('Depots:', response.data);
        setDepots(response.data);
      })
      .catch(error => {
        console.error('Error fetching depots:', error);
      });
      // Handle success
    } catch (error) {
      console.error('Error deleting Depot:', error);
      // Handle error
    }

  }
  const handledeletefournisseur=async(id) =>{
    try {
      const response = await axios.delete(`http://localhost:3000/deletefournisseur/${id}`);
      console.log('Fournisseur deleted successfully:', response.data);
      axios.get('http://localhost:3000/touslesfournisseurs', )
      .then(response => {
        console.log('Depots:', response.data);
        setFournisseurs(response.data);
      })
      .catch(error => {
        console.error('Error fetching depots:', error);
      });
      // Handle success
    } catch (error) {
      console.error('Error deleting Fournisseur:', error);
      // Handle error
    }

  }
  const handledeleteproduit=async(id) =>{
    try {
      const response = await axios.delete(`http://localhost:3000/deleteproduit/${id}`);
      console.log('Product deleted successfully:', response.data);
      axios.get('http://localhost:3000/produits', )
      .then(response => {
        console.log('Produits:', response.data);
        setProduits(response.data);
      })
      .catch(error => {
        console.error('Error fetching sellers:', error);
      });
      // Handle success
    } catch (error) {
      console.error('Error deleting product:', error);
      // Handle error
    }

  }
  const handleInfodeselect = () => {
    setSelectedRow(null);
  };
  
  return (
    <section className="content">
      <Container fluid>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">{
                  vendeurs ? 'Tous les Utilisateur' :
                  depots ? 'Tous les dépôts' :
                    fournisseurs ? 'Tous les fournisseurs' : produits ? 'Tous les Produits' :
                        'Tous les utilisateurs'
                }</h3>
                <div className="card-tools">
                  <div className="input-group input-group-sm" style={{ width: '150px' }}>
                    <input type="text" name="table_search" className="form-control float-right" placeholder="Recherche" />
                    <div className="input-group-append">
                      <button type="submit" className="btn btn-default">
                        <FontAwesomeIcon icon={faSearch} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body table-responsive p-0">
                <table className="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      {vendeurs && (
                        <>
                          <th>Nom</th>
                          <th>Prénom</th>
                          <th>Email</th>
                          <th>CIN</th>
                          <th>Tel</th>
                          <th>Actions</th>
                        </>
                      )}
                      {depots && (
                        <>
                          <th>Nom</th>
                          <th>Adresse</th>
                          <th>Nom du responsable</th>
                          <th>Capacité maximale</th>
                          <th>Actions</th>
                        </>
                      )}
                      {fournisseurs && (
                        <>
                          <th>Nom</th>
                          <th>Email</th>
                          <th>Adresse</th>
                          <th>Actions</th>
                        </>
                      )}
                      {produits && (
                        <>
                          <th>Nom produit</th>
                          <th>Description</th>
                          <th>Prix</th>
                          <th>Quantité en stock</th>
                          <th>Quantité vendue</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {vendeurs && vendeurs.map((vendeur, index) => (
                      <tr key={index}>
                        {editableRow === index ? (
                          <>
                            <td><input type="text" value={editedValues[`nom`] !== undefined ? editedValues[`nom`] : vendeur.nom} onChange={(e) => handleEditChange(`nom`, e.target.value)} /></td>
                            <td><input type="text" value={editedValues[`prenom`] !== undefined ? editedValues[`prenom`] : vendeur.prenom} onChange={(e) => handleEditChange(`prenom`, e.target.value)} /></td>
                            <td><input type="text" value={editedValues[`email`] !== undefined ? editedValues[`email`] : vendeur.email} onChange={(e) => handleEditChange(`email`, e.target.value)} /></td>
                            <td><input type="number" value={editedValues[`cin`] !== undefined ? editedValues[`cin`] : vendeur.cin} onChange={(e) => handleEditChange(`cin`, e.target.value)} /></td>
                            <td><input type="number" value={editedValues[`tel`] !== undefined ? editedValues[`tel`] : vendeur.tel} onChange={(e) => handleEditChange(`tel`, e.target.value)} /></td>
                            <td>
                              <BrowserUpdatedIcon className='icontable' onClick={() => handleSaveClickvendeur(vendeur._id)}/>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>{vendeur.nom}</td>
                            <td>{vendeur.prenom}</td>
                            <td>{vendeur.email}</td>
                            <td>{vendeur.cin}</td>
                            <td>{vendeur.tel}</td>
                            <td>
                              <SettingsSuggestIcon className='icontable' onClick={() => handleEditClick(index)}/>
                              <DeleteIcon className='icontable' onClick={()=> handledeletevendeur(vendeur._id)}/>
                              <InfoIcon className='icontable' onClick={() => handleInfoClick(vendeur._id)}/>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                    {produits && produits.map((produit, index) => (
                      <tr key={index}>
                        {editableRow === index ? (
                          <>
                            <td><input type="text" value={editedValues[`nomProduit`] !== undefined ? editedValues[`nomProduit`] : produit.nomProduit} onChange={(e) => handleEditChange(`nomProduit`, e.target.value)} /></td>
                            <td><input type="text" value={editedValues[`description`] !== undefined ? editedValues[`description`] : produit.description} onChange={(e) => handleEditChange(`description`, e.target.value)} /></td>
                            <td><input type="number" value={editedValues[`prix`] !== undefined ? editedValues[`prix`] : produit.prix} onChange={(e) => handleEditChange(`prix`, e.target.value)} /></td>
                            <td><input type="number" value={editedValues[`quantiteStock`] !== undefined ? editedValues[`quantiteStock`] : produit.quantiteStock} onChange={(e) => handleEditChange(`quantiteStock`, e.target.value)} /></td>
                            <td><input type="number" value={editedValues[`quantiteVendu`] !== undefined ? editedValues[`quantiteVendu`] : produit.quantiteVendu} onChange={(e) => handleEditChange(`quantiteVendu`, e.target.value)} /></td>
                            <td>
                              <BrowserUpdatedIcon className='icontable' onClick={() => handleSaveClickproduit(produit._id)}/>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>{produit.nom}</td>
                            <td>{produit.description}</td>
                            <td>{produit.prix}</td>
                            <td>{produit.quantiteStock}</td>
                            <td>{produit.quantiteVendu}</td>
                            <td>
                              <SettingsSuggestIcon className='icontable' onClick={() => handleEditClick(index)}/>
                              <DeleteIcon className='icontable' onClick={()=> handledeleteproduit(produit._id)}/>
                              <InfoIcon className='icontable' onClick={() => handleInfoClick(produit._id)}/>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                    {depots && depots.map((depot, index) => (
                      <tr key={index}>
                        {editableRow === index ? (
                          <>
                            <td><input type="text" value={editedValues[`nom`] !== undefined ? editedValues[`nomDepot`] : depot.nomDepot} onChange={(e) => handleEditChange(`nomDepot`, e.target.value)} /></td>
                            <td><input type="text" value={editedValues[`adresse`] !== undefined ? editedValues[`adresse`] : depot.adresse} onChange={(e) => handleEditChange(`adresse`, e.target.value)} /></td>
                            <td><input type="text" value={editedValues[`nomResponsable`] !== undefined ? editedValues[`nomResponsable`] : depot.nomResponsable} onChange={(e) => handleEditChange(`nomResponsable`, e.target.value)} /></td>
                            <td><input type="number" value={editedValues[`capaciteMax`] !== undefined ? editedValues[`capaciteMax`] : depot.capaciteMax} onChange={(e) => handleEditChange(`capaciteMax`, e.target.value)} /></td>
                            <td>
                              <BrowserUpdatedIcon className='icontable' onClick={() => handleSaveClickdepot(depot._id)}/>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>{depot.nom}</td>
                            <td>{depot.adresse}</td>
                            <td>{depot.nomresponsable}</td>
                            <td>{depot.capaciteMax}</td>
                            <td>
                              <SettingsSuggestIcon className='icontable' onClick={() => handleEditClick(index)}/>
                              <DeleteIcon className='icontable' onClick={()=> handledeletedepot(depot._id)}/>
                              <InfoIcon className='icontable' onClick={() => handleInfoClick(depot._id)}/>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                    {fournisseurs && fournisseurs.map((fournisseur, index) => (
                      <tr key={index}>
                        {editableRow === index ? (
                          <>
                            <td><input type="text" value={editedValues[`nomFournisseur`] !== undefined ? editedValues[`nomFournisseur`] : fournisseur.nomFournisseur} onChange={(e) => handleEditChange(`nomFournisseur`, e.target.value)} /></td>
                            <td><input type="text" value={editedValues[`email`] !== undefined ? editedValues[`email`] : fournisseur.email} onChange={(e) => handleEditChange(`email`, e.target.value)} /></td>
                            <td><input type="text" value={editedValues[`adresse`] !== undefined ? editedValues[`adresse`] : fournisseur.adresse} onChange={(e) => handleEditChange(`adresse`, e.target.value)} /></td>
                            <td>
                              <BrowserUpdatedIcon className='icontable' onClick={() => handleSaveClickfournisseur(fournisseur._id)}/>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>{fournisseur.nom}</td>
                            <td>{fournisseur.email}</td>
                            <td>{fournisseur.adresse}</td>
                            <td>
                              <SettingsSuggestIcon className='icontable' onClick={() => handleEditClick(index)}/>
                              <DeleteIcon className='icontable' onClick={()=> handledeletefournisseur(fournisseur._id)}/>
                              <InfoIcon className='icontable' onClick={() => handleInfoClick(fournisseur._id)}/>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* Affichage des détails de la ligne sélectionnée */}
      {selectedRow !== null && (
        <div className="selected-row-details">
          {vendeurs && (
            <div>
              <h3>Détails de l'utilisateur sélectionné</h3>
              <p>Nom: </p>
              <p>Prénom: </p>
              <p>Email: </p>
              <p>CIN: </p>
              <p>Tel:</p>
              <ReplyIcon className='iconinfo' onClick={() => handleInfodeselect()}/>
            </div>
          )}
          {depots && (
            <div>
              <h3>Détails du dépôt sélectionné</h3>
              <p>Nom: </p>
              <p>Adresse: </p>
              <p>Nom du responsable: </p>
              <p>Capacité maximale: </p>
              <ReplyIcon className='iconinfo' onClick={() => handleInfodeselect()}/>
            </div>
          )}
          {fournisseurs && (
            <div>
              <h3>Détails du fournisseur sélectionné</h3>
              <p>Nom: </p>
              <p>Email: </p>
              <p>Adresse:</p>
              <ReplyIcon className='iconinfo' onClick={() => handleInfodeselect()}/>
            </div>
          )}
          {/* Ajoutez les détails pour les produits si nécessaire */}
        </div>
      )}
    </section>
  );
}

export default Table1;
