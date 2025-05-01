import React from "react";

function PlantList({ plants, setPlants }) {
  const toggleStock = (id) => {
    setPlants(
      plants.map((plant) =>
        plant.id === id ? { ...plant, inStock: !plant.inStock } : plant
      )
    );
  };

  return (
    <ul className="cards">
      {plants.map((plant) => (
        <li key={plant.id} data-testid="plant-item">
          <h4>{plant.name}</h4>
          <img src={plant.image} alt={plant.name} />
          <p>Price: {plant.price}</p>
          <button onClick={() => toggleStock(plant.id)}>
            {plant.inStock ? "In Stock" : "Out of Stock"} {/* Updated to match test */}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PlantList;