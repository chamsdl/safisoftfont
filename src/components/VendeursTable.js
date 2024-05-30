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

// Modal Component
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

function VendeursTable({ vendeurs: propVendeurs }) {
  const [vendeurs, setVendeurs] = useState(propVendeurs || []);
  const [editableRow, setEditableRow] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    async function fetchVendeurs() {
      try {
        const response = await axios.get('http://localhost:3000/touslesvendeurs');
        setVendeurs(response.data);
      } catch (error) {
        console.error('Error fetching vendeurs:', error);
      }
    }

    fetchVendeurs();
  }, []);

  const handleEditClick = (index) => {
    setEditableRow(index);
  };

  const handleSaveClickvendeur = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/updatevendeur/${id}`, editedValues);
      const response = await axios.get('http://localhost:3000/touslesvendeurs');
      setVendeurs(response.data);
    } catch (error) {
      console.error('Error updating vendeur:', error);
    }
    setEditableRow(null);
    setEditedValues({});
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    setShowModal(false);
    try {
      await axios.delete(`http://localhost:3000/deletevendeur/${itemToDelete}`);
      const response = await axios.get('http://localhost:3000/touslesvendeurs');
      setVendeurs(response.data);
    } catch (error) {
      console.error('Error deleting vendeur:', error);
    }
  };

  const handleInfoClick = (index) => {
    setSelectedRow(index);
  };

  const handleInfodeselect = () => {
    setSelectedRow(null);
  };

  // Filter vendeurs based on searchQuery
  const filteredVendeurs = vendeurs.filter(vendeur =>
    vendeur.nom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="content">
      <Container fluid>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Tous les Utilisateurs</h3>
                <div className="card-tools">
                  <div className="input-group input-group-sm" style={{ width: '200px' }}>
                    <input
                      type="text"
                      name="table_search"
                      className="form-control float-right"
                      placeholder="Recherche par Nom"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    
                  </div>
                </div>
              </div>
              <div className="card-body table-responsive p-0">
                <table className="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Email</th>
                      <th>CIN</th>
                      <th>Tel</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVendeurs.map((vendeur, index) => (
                      <tr key={index}>
                        {editableRow === index ? (
                          <>
                            <td><input type="text" value={editedValues.nom !== undefined ? editedValues.nom : vendeur.nom} onChange={(e) => setEditedValues({ ...editedValues, nom: e.target.value })} /></td>
                            <td><input type="text" value={editedValues.prenom !== undefined ? editedValues.prenom : vendeur.prenom} onChange={(e) => setEditedValues({ ...editedValues, prenom: e.target.value })} /></td>
                            <td><input type="text" value={editedValues.email !== undefined ? editedValues.email : vendeur.email} onChange={(e) => setEditedValues({ ...editedValues, email: e.target.value })} /></td>
                            <td><input type="number" value={editedValues.cin !== undefined ? editedValues.cin : vendeur.cin} onChange={(e) => setEditedValues({ ...editedValues, cin: e.target.value })} /></td>
                            <td><input type="number" value={editedValues.tel !== undefined ? editedValues.tel : vendeur.tel} onChange={(e) => setEditedValues({ ...editedValues, tel: e.target.value })} /></td>
                            <td>
                              <BrowserUpdatedIcon className='icontable' onClick={() => handleSaveClickvendeur(vendeur._id)} />
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
                              <EditIcon className='icontable' onClick={() => handleEditClick(index)} />
                              <DeleteIcon className='icontable' onClick={() => handleDeleteClick(vendeur._id)} />
                              <InfoIcon className='icontable' onClick={() => handleInfoClick(index)} />
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
      {selectedRow !== null && (
        <div className="selected-row-details">
          <h3>Détails de l'utilisateur sélectionné</h3>
          <p>Nom: {vendeurs[selectedRow].nom}</p>
          <p>Prénom: {vendeurs[selectedRow].prenom}</p>
          <p>Email: {vendeurs[selectedRow].email}</p>
          <p>CIN: {vendeurs[selectedRow].cin}</p>
          <p>Tel: {vendeurs[selectedRow].tel}</p>
          <ReplyIcon className='iconinfo' onClick={handleInfodeselect} />
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

export default VendeursTable;
