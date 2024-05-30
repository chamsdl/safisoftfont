import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import ReplyIcon from '@mui/icons-material/Reply';
import XIcon from '@mui/icons-material/X';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import axios from 'axios';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const ConfirmDeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="selected-row-details">
      <h3>Êtes-vous sûr de vouloir supprimer cet Article ?</h3>
      <div className="modal-buttons">
        <DoneOutlineIcon className='iconinfo1' onClick={onConfirm}>Oui</DoneOutlineIcon>
        <XIcon className='iconinfo1' onClick={onClose}>Non</XIcon>
      </div>
    </div>
  );
};

function ProduitsTable({ produits: propProduits }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [produits, setProduits] = useState(propProduits);
  const [editableRow, setEditableRow] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    async function fetchProduits() {
      try {
        const response = await axios.get(`http://localhost:3000/touslesproduits`);
        setProduits(response.data);
      } catch (error) {
        console.error('Error fetching produits:', error);
      }
    }

    fetchProduits();
  }, []);

  const handleEditClick = (index) => {
    setEditableRow(index);
  };

  const handleSaveClick = async (id) => {
    try {
      console.log(editedValues);
      await axios.patch(`http://localhost:3000/updateproduit/${id}`, editedValues);
      const response = await axios.get('http://localhost:3000/touslesproduits');
      setProduits(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
    setEditableRow(null);
    setEditedValues({});
  };

  const handleEditChange = (key, value) => {
    setEditedValues({ ...editedValues, [key]: value });
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    setShowModal(false);
    try {
      await axios.delete(`http://localhost:3000/deleteproduit/${itemToDelete}`);
      const response = await axios.get('http://localhost:3000/touslesproduits');
      setProduits(response.data);
    } catch (error) {
      console.error('Error deleting vendeur:', error);
    }
  };

  const handleInfoClick = (index) => {
    setSelectedRow(index);
  };

  const handleInfoDeselect = () => {
    setSelectedRow(null);
  };

  const handleUpdate = (err, result) => {
    if (result) {
      setSearchQuery(result.text);
      setIsScanning(false);
    }
  };

  const handleScanClick = () => {
    setIsScanning(true);
  };

  const filteredProduits = produits && produits.filter((produit) => {
    const searchQueryLower = searchQuery.toLowerCase();
    const codeAsString = produit.code ? produit.code.toString() : ''; // Ensure code is not null or undefined
    return produit.nom.toLowerCase().includes(searchQueryLower) ||
           codeAsString.includes(searchQueryLower);
  });

  return (
    <section className="content">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Tous les Articles</h3>
          <div className="card-tools">
            <div className="input-group input-group-sm" style={{ width: '200px' }}>
              <input
                type="text"
                name="table_search"
                className="form-control float-right"
                placeholder="Recherche par Nom ou Code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="input-group-append">
                <button onClick={handleScanClick} type="button" className="btn btn-default">
                  <FontAwesomeIcon icon={faBarcode} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body table-responsive p-0">
          <table className="table table-hover text-nowrap">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Prix</th>
                <th>Quantité Stock</th>
                <th>Quantité vendue</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProduits && filteredProduits.map((produit, index) => (
                <tr key={index}>
                  <td>{editableRow === index ? <input type="text" value={editedValues.nom !== undefined ? editedValues.nom : produit.nom} onChange={(e) => handleEditChange('nom', e.target.value)} /> : produit.nom}</td>
                  <td>{editableRow === index ? <input type="text" value={editedValues.description !== undefined ? editedValues.description : produit.description} onChange={(e) => handleEditChange('description', e.target.value)} /> : produit.description}</td>
                  <td>{editableRow === index ? <input type="number" value={editedValues.prix !== undefined ? editedValues.prix : produit.prix} onChange={(e) => handleEditChange('prix', e.target.value)} /> : produit.prix} DT</td>
                  <td>{editableRow === index ? <input type="number" value={editedValues.quantiteStock !== undefined ? editedValues.quantiteStock : produit.quantiteStock} onChange={(e) => handleEditChange('quantiteStock', e.target.value)} /> : produit.quantiteStock}</td>
                  <td>{editableRow === index ? <input type="number" value={editedValues.quantiteVendu !== undefined ? editedValues.quantiteVendu : produit.quantiteVendu} onChange={(e) => handleEditChange('quantiteVendu', e.target.value)} /> : produit.quantiteVendu}</td>
                  <td>
                    {editableRow === index ? (
                      <BrowserUpdatedIcon className='icontable' onClick={() => handleSaveClick(produit._id)} />
                    ) : (
                      <>
                        <EditIcon className='icontable' onClick={() => handleEditClick(index)} />
                        <DeleteIcon className='icontable' onClick={() => handleDeleteClick(produit._id)} />
                        <InfoIcon className='icontable' onClick={() => handleInfoClick(index)} />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isScanning && (
        <BarcodeScannerComponent
          width={500}
          height={500}
          onUpdate={handleUpdate}
        />
      )}

      {selectedRow !== null && (
        <div className="selected-row-details">
          <h3>Détails du produit sélectionné</h3>
          <p>Nom: {produits[selectedRow].nom}</p>
          <p>Description: {produits[selectedRow].description}</p>
          <p>Prix: {produits[selectedRow].prix} DT</p>
          <p>Quantité maximale: {produits[selectedRow].quantiteStock}</p>
          <p>Quantité vendue: {produits[selectedRow].quantiteVendu}</p>
          <ReplyIcon className='iconinfo' onClick={handleInfoDeselect} />
        </div>
      )}

      <ConfirmDeleteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </section>
  );
}

export default ProduitsTable;
