import React, { useState } from "react";

function NewPlantForm({ setPlants }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Keep price as string
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      ...formData,
      price: formData.price, // Ensure price remains a string
    };
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON", // Match test expectation
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((newPlant) => {
        setPlants((prevPlants) => [...prevPlants, newPlant]);
        setFormData({ name: "", image: "", price: "" });
      })
      .catch((error) => console.error("Error adding plant:", error));
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;