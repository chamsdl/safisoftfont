import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';

function StockStatus({ quantiteStock }) {
  if (quantiteStock <= 0) {
    return <span style={{ color: 'red' }}>Épuisé</span>;
  } else if (quantiteStock < 10) {
    return <span style={{ color: 'orange' }}>Stock Faible</span>;
  } else {
    return <span style={{ color: 'green' }}>En Stock</span>;
  }
}

function ProduitsStockTable() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    async function fetchProduits() {
      try {
        const response = await axios.get('http://localhost:3000/produits');
        setProduits(response.data);
      } catch (error) {
        console.error('Error fetching produits:', error);
      }
    }

    fetchProduits();
  }, []);

  return (
    <section className="content">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Liste des Produits avec le Stock Actuel</h3>
        </div>
        <div className="card-body table-responsive p-0">
          <table className="table table-hover text-nowrap">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Prix</th>
                <th>Quantité en Stock</th>
                <th>Statut du Stock</th>
              </tr>
            </thead>
            <tbody>
              {produits.map((produit, index) => (
                <tr key={index}>
                  <td>{produit.nom}</td>
                  <td>{produit.description}</td>
                  <td>{produit.prix} DT</td>
                  <td>{produit.quantiteStock}</td>
                  <td><StockStatus quantiteStock={produit.quantiteStock} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ProduitsStockTable;
