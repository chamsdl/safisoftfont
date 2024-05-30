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
        <h3>Êtes-vous sûr de vouloir supprimer cet Depot ?</h3>
        <div className="modal-buttons">
          <DoneOutlineIcon className='iconinfo1' onClick={onConfirm}>Oui</DoneOutlineIcon>
          <XIcon className='iconinfo1' onClick={onClose}>Non</XIcon>
        </div>
      </div>
  );
};
function DepotsTable({ depots: propDepots }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [depots, setDepots] = useState(propDepots);
  const [editableRow, setEditableRow] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    async function fetchDepots() {
      try {
        const response = await axios.get(`http://localhost:3000/touslesdepots`);
        setDepots(response.data);
      } catch (error) {
        console.error('Error fetching depots:', error);
      }
    }

    fetchDepots();
  }, []);

  const handleEditClick = (index) => {
    setEditableRow(index);
  };

  const handleSaveClick = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/updatedepot/${id}`, editedValues);
      const response = await axios.get('http://localhost:3000/touslesdepots');
      setDepots(response.data);
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
      await axios.delete(`http://localhost:3000/deletedepot/${itemToDelete}`);
      const response = await axios.get('http://localhost:3000/touslesdepots');
      setDepots(response.data);
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

  // Filter depots based on searchQuery
  const filteredDepots = depots.filter(depot =>
    depot.nom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!depots || !depots.length) return null;

  return (
    <section className="content">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Tous les Depots</h3>
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
                <th>Adresse</th>
                <th>Nom du responsable</th>
                <th>Capacité maximale</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepots.map((depot, index) => (
                <tr key={index}>
                  {editableRow === index ? (
                    <>
                      <td><input type="text" value={editedValues.nom !== undefined ? editedValues.nom : depot.nom} onChange={(e) => handleEditChange('nom', e.target.value)} /></td>
                      <td><input type="text" value={editedValues.adresse !== undefined ? editedValues.adresse : depot.adresse} onChange={(e) => handleEditChange('adresse', e.target.value)} /></td>
                      <td><input type="text" value={editedValues.nomresponsable !== undefined ? editedValues.nomresponsable : depot.nomresponsable} onChange={(e) => handleEditChange('nomresponsable', e.target.value)} /></td>
                      <td><input type="number" value={editedValues.capaciteMax !== undefined ? editedValues.capaciteMax : depot.capaciteMax} onChange={(e) => handleEditChange('capaciteMax', e.target.value)} /></td>
                      <td>
                        <BrowserUpdatedIcon className='icontable' onClick={() => handleSaveClick(depot._id)} />
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{depot.nom}</td>
                      <td>{depot.adresse}</td>
                      <td>{depot.nomresponsable}</td>
                      <td>{depot.capaciteMax}</td>
                      <td>
                        <EditIcon className='icontable' onClick={() => handleEditClick(index)} />
                        <DeleteIcon className='icontable' onClick={() => handleDeleteClick(depot._id)} />
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
      {selectedRow !== null && (
        <div className="selected-row-details">
          <h3>Détails du dépôt sélectionné</h3>
          <p>Nom: {depots[selectedRow].nom}</p>
          <p>Adresse: {depots[selectedRow].adresse}</p>
          <p>Nom du responsable: {depots[selectedRow].nomresponsable}</p>
          <p>Capacité maximale: {depots[selectedRow].capaciteMax}</p>
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

export default DepotsTable;
