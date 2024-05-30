import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch ,faBarcode} from '@fortawesome/free-solid-svg-icons';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import ReplyIcon from '@mui/icons-material/Reply';
import XIcon from '@mui/icons-material/X';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
const ConfirmDeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="selected-row-details">
        <h3>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</h3>
        <div className="modal-buttons">
          <DoneOutlineIcon className='iconinfo1' onClick={onConfirm}>Oui</DoneOutlineIcon>
          <XIcon className='iconinfo1' onClick={onClose}>Non</XIcon>
        </div>
      </div>
  );
};
function CommandesTable() {
  const [commandes, setCommandes] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);


  useEffect(() => {
    async function fetchCommandes() {
      try {
        const iduser=localStorage.getItem("id");
        const response = await  axios.get(`http://localhost:3000/touslescommandes/${iduser}`);
        setCommandes(response.data);
      } catch (error) {
        console.error('Error fetching commandes:', error);
      }
    }

    fetchCommandes();
  }, []);

  const handleEditClick = (index) => {
    setEditableRow(index);
  };

  const handleSaveClick = async (id) => {
    try {
        const iduser=localStorage.getItem("id");
      await axios.patch(`http://localhost:3000/updatecommande/${id}`, editedValues);
      const response = await  axios.get(`http://localhost:3000/touslescommandes/${iduser}`);
      setCommandes(response.data);
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
      await axios.delete(`http://localhost:3000/deletecommande/${itemToDelete}`);
      const response = await axios.get('http://localhost:3000/touslescommandes');
      setCommandes(response.data);
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

  if (!commandes || !commandes.length) return null;

  return (
    <section className="content">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Toutes les commandes</h3>
        </div>
        <div className="card-body table-responsive p-0">
          <table className="table table-hover text-nowrap">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Nombre de produits</th>
                <th>Montant Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((commande, index) => (
                <tr key={index}>
                  <td>{commande._id}</td>
                  <td>{new Date(commande.date).toLocaleString('fr-FR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                  })}</td>
                  <td>{commande.produits.length}</td>
                  <td>{editableRow === index ? (
                    <input
                      type="number"
                      value={editedValues.montanttotal !== undefined ? editedValues.montanttotal : commande.montanttotal}
                      onChange={(e) => handleEditChange('montanttotal', e.target.value)}
                    />
                  ) : (
                    commande.montanttotal
                  )}</td>
                  <td>
                    {editableRow === index ? (
                      <BrowserUpdatedIcon className='icontable' onClick={() => handleSaveClick(commande._id)} />
                    ) : (
                      <>
                        <EditIcon className='icontable' onClick={() => handleEditClick(index)} />
                        <DeleteIcon className='icontable' onClick={() => handleDeleteClick(commande._id)} />
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
      {selectedRow !== null && (
        <div className="selected-row-details1">
          <h3>Détails de la commande sélectionnée</h3>
          <p>ID: {commandes[selectedRow]._id}</p>
          <p>Date: {new Date(commandes[selectedRow].date).toLocaleString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          })}</p>
          <p>Montant Total: {commandes[selectedRow].montanttotal}</p>
          <h4>Produits:</h4>
          <ul>
            {commandes[selectedRow].produits.map((produit, i) => (
              <li key={i}>
                <p>Nom: {produit.nom}</p>
                <p>Quantité: {produit.quantite}</p>
                <p>Prix: {produit.prix} DT</p>
              </li>
            ))}
          </ul>
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

export default CommandesTable;
