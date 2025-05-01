import React, { useState, useEffect } from "react";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) =>
        setPlants(
          data.map((plant) => ({
            ...plant,
            inStock: plant.inStock !== false, // Ensure inStock is true by default
          }))
        )
      )
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <h1>
          Plantsy <span className="logo" role="img">🌱</span>
        </h1>
      </header>
      <main>
        <NewPlantForm setPlants={setPlants} />
        <Search search={search} setSearch={setSearch} />
        <PlantList plants={filteredPlants} setPlants={setPlants} />
      </main>
    </div>
  );
}

export default App;