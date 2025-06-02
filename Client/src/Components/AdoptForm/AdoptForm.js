import React, { useState } from "react";

const AddPetSection = ({ onPetAdded }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [area, setArea] = useState("");
  const [justification, setJustification] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("Dog");
  const [picture, setPicture] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPicture(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate fields
    if (!name || !age || !area || !justification || !email || !phone || !fileName) {
      setError("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("area", area);
    formData.append("justification", justification);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("type", type);
    formData.append("picture", picture);

    try {
      const response = await fetch("http://localhost:5001/approvedPets", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add pet.");
      }

      setSuccess("Pet added successfully!");
      setName("");
      setAge("");
      setArea("");
      setJustification("");
      setEmail("");
      setPhone("");
      setType("Dog");
      setPicture(null);
      setFileName("");

      if (onPetAdded) onPetAdded();
    } catch (err) {
      setError("Error adding pet.");
    }
  };

  return (
    <div className="add-pet-section">
      <h2>Add a Pet</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="input-box">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter pet's name"
          />
        </div>
        <div className="input-box">
          <label>Age:</label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter pet's age"
          />
        </div>
        <div className="input-box">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Bird">Bird</option>
            <option value="Fish">Fish</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="input-box">
          <label>Picture:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {fileName && <p>Selected file: {fileName}</p>}
        </div>
        <div className="input-box">
          <label>Location:</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter location"
          />
        </div>
        <div className="input-box">
          <label>Justification:</label>
          <textarea
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            placeholder="Why are you giving this pet?"
          ></textarea>
        </div>
        <div className="input-box">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="input-box">
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
};

export default AddPetSection;