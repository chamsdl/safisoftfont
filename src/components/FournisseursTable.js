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
        <h3>Êtes-vous sûr de vouloir supprimer cet Fournisseur ?</h3>
        <div className="modal-buttons">
          <DoneOutlineIcon className='iconinfo1' onClick={onConfirm}>Oui</DoneOutlineIcon>
          <XIcon className='iconinfo1' onClick={onClose}>Non</XIcon>
        </div>
      </div>
  );
};
function FournisseursTable({ fournisseurs: propFournisseurs }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [fournisseurs, setFournisseurs] = useState(propFournisseurs || []);
  const [editableRow, setEditableRow] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    async function fetchFournisseurs() {
      try {
        const response = await axios.get(`http://localhost:3000/touslesfournisseurs`);
        setFournisseurs(response.data);
      } catch (error) {
        console.error('Error fetching fournisseurs:', error);
      }
    }

    fetchFournisseurs();
  }, []);

  const handleEditClick = (index) => {
    setEditableRow(index);
  };

  const handleSaveClick = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/updatefournisseur/${id}`, editedValues);
      const response = await axios.get('http://localhost:3000/touslesfournisseurs');
      setFournisseurs(response.data);
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
      await axios.delete(`http://localhost:3000/deletefournisseur/${itemToDelete}`);
      const response = await axios.get('http://localhost:3000/touslesfournisseurs');
      setFournisseurs(response.data);
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

  // Filter fournisseurs based on searchQuery
  const filteredFournisseurs = fournisseurs.filter(fournisseur =>
    fournisseur.nom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="content">
      <Container fluid>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Tous les Fournisseurs</h3>
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
                  <th>Email</th>
                  <th>Adresse</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFournisseurs.map((fournisseur, index) => (
                  <tr key={index}>
                    {editableRow === index ? (
                      <>
                        <td><input type="text" value={editedValues.nom !== undefined ? editedValues.nom : fournisseur.nom} onChange={(e) => handleEditChange('nom', e.target.value)} /></td>
                        <td><input type="text" value={editedValues.email !== undefined ? editedValues.email : fournisseur.email} onChange={(e) => handleEditChange('email', e.target.value)} /></td>
                        <td><input type="text" value={editedValues.adresse !== undefined ? editedValues.adresse : fournisseur.adresse} onChange={(e) => handleEditChange('adresse', e.target.value)} /></td>
                        <td>
                          <BrowserUpdatedIcon className='icontable' onClick={() => handleSaveClick(fournisseur._id)} />
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{fournisseur.nom}</td>
                        <td>{fournisseur.email}</td>
                        <td>{fournisseur.adresse}</td>
                        <td>
                          <EditIcon className='icontable' onClick={() => handleEditClick(index)} />
                          <DeleteIcon className='icontable' onClick={() => handleDeleteClick(fournisseur._id)} />
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
      </Container>
      {selectedRow !== null && (
        <div className="selected-row-details">
          <h3>Détails du fournisseur sélectionné</h3>
          <p>Nom: {fournisseurs[selectedRow].nom}</p>
          <p>Email: {fournisseurs[selectedRow].email}</p>
          <p>Adresse: {fournisseurs[selectedRow].adresse}</p>
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

export default FournisseursTable;
