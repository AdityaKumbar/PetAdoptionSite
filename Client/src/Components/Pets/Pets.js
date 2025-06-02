import React, { useEffect, useState } from "react";

const Pets = () => {
  const [petsData, setPetsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add Pet Section state
  const [name, setName] = useState("");
  const [type, setType] = useState("Dog");
  const [age, setAge] = useState("");
  const [area, setArea] = useState("");
  const [justification, setJustification] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [picture, setPicture] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchPets = async () => {
  setLoading(true);
  try {
    const response = await fetch("http://localhost:5001/pets");
    const data = await response.json();
    console.log('Fetched Pets:', data); // Log the fetched pets
    setPetsData(data);
  } catch (error) {
    console.error('Error fetching pets:', error);
    setPetsData([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchPets();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPicture(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleAddPet = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !type || !age || !area || !justification || !email || !phone || !fileName) {
      setError("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("age", age);
    formData.append("area", area);
    formData.append("justification", justification);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("picture", picture);

    try {
      const response = await fetch("http://localhost:5001/pets", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add pet.");
      }

      setSuccess("Pet added successfully!");
      setName("");
      setType("Dog");
      setAge("");
      setArea("");
      setJustification("");
      setEmail("");
      setPhone("");
      setPicture(null);
      setFileName("");
      fetchPets();
    } catch (err) {
      console.error("Error adding pet:", err);
      setError("Error adding pet.");
    }
  };

  return (
    <div className="pets-main-container" style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24, fontWeight: 700, fontSize: 28, letterSpacing: 1 }}>
        Add a Pet
      </h2>
      <form
        onSubmit={handleAddPet}
        encType="multipart/form-data"
        className="add-pet-form"
        style={{
          background: "#f9f9f9",
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: 32,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 40,
        }}
      >
        <div className="input-box" style={{ gridColumn: "span 2" }}>
          <label style={{ fontWeight: 600 }}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter pet's name"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: 14,
            }}
          />
        </div>
        <div className="input-box">
          <label style={{ fontWeight: 600 }}>Age:</label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter pet's age"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: 14,
            }}
          />
        </div>
        <div className="input-box">
          <label style={{ fontWeight: 600 }}>Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: 14,
            }}
          >
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Bird">Bird</option>
            <option value="Fish">Fish</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="input-box" style={{ gridColumn: "span 2" }}>
          <label style={{ fontWeight: 600 }}>Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: 14,
            }}
          />
          {fileName && <p style={{ fontSize: 12, color: "#888" }}>Selected file: {fileName}</p>}
        </div>
        <div className="input-box">
          <label style={{ fontWeight: 600 }}>Location:</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter location"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: 14,
            }}
          />
        </div>
        <div className="input-box" style={{ gridColumn: "span 2" }}>
          <label style={{ fontWeight: 600 }}>Justification:</label>
          <textarea
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            placeholder="Why are you giving this pet?"
            rows="3"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: 14,
            }}
          ></textarea>
        </div>
        <div className="input-box">
          <label style={{ fontWeight: 600 }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: 14,
            }}
          />
        </div>
        <div className="input-box">
          <label style={{ fontWeight: 600 }}>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: 14,
            }}
          />
        </div>
        {error && (
          <p style={{ gridColumn: "span 2", color: "red", fontSize: 14, textAlign: "center" }}>{error}</p>
        )}
        {success && (
          <p style={{ gridColumn: "span 2", color: "green", fontSize: 14, textAlign: "center" }}>{success}</p>
        )}
        <button
          type="submit"
          style={{
            gridColumn: "span 2",
            padding: "12px 0",
            borderRadius: 10,
            background: "#fea034",
            color: "#fff",
            border: "none",
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: 1,
            cursor: "pointer",
          }}
        >
          Add Pet
        </button>
      </form>

      <div className="pet-container" style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
        {loading ? (
          <p>Loading...</p>
        ) : petsData.length > 0 ? (
          petsData.map((pet, idx) => (
            <div
              key={idx}
              className="pet-card"
              style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 8px #eee",
                padding: 20,
                minWidth: 220,
                maxWidth: 260,
                flex: "1 1 220px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              {pet.picture && (
                <img
                  src={`http://localhost:5001/images/${pet.picture}`}
                  alt={pet.name}
                  style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8, marginBottom: 10 }}
                />
              )}
              <h3 style={{ margin: "0 0 8px 0", color: "#fea034" }}>{pet.name}</h3>
              <div style={{ marginBottom: 6 }}>
                <b>Type:</b> {pet.type}
              </div>
              <div style={{ marginBottom: 6 }}>
                <b>Age:</b> {pet.age}
              </div>
              <div style={{ marginBottom: 6 }}>
                <b>Area:</b> {pet.area}
              </div>
              <div style={{ marginBottom: 6 }}>
                <b>Description:</b> {pet.justification}
              </div>
              <div style={{ marginTop: 10, fontSize: 13, color: "#888" }}>
                <b>Contact:</b> {pet.email} / {pet.phone}
              </div>
            </div>
          ))
        ) : (
          <p>No pets available</p>
        )}
      </div>
    </div>
  );
};

export default Pets;
