import React, { useState } from "react";

function App() {
  const [country, setCountry] = useState("DE");
  const [vatNumber, setVatNumber] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const countryList = [
    { code: "AT", name: "Österreich" },
    { code: "BE", name: "Belgien" },
    { code: "BG", name: "Bulgarien" },
    { code: "CY", name: "Zypern" },
    { code: "CZ", name: "Tschechien" },
    { code: "DE", name: "Deutschland" },
    { code: "DK", name: "Dänemark" },
    { code: "EE", name: "Estland" },
    { code: "EL", name: "Griechenland" },
    { code: "ES", name: "Spanien" },
    { code: "FI", name: "Finnland" },
    { code: "FR", name: "Frankreich" },
    { code: "HR", name: "Kroatien" },
    { code: "HU", name: "Ungarn" },
    { code: "IE", name: "Irland" },
    { code: "IT", name: "Italien" },
    { code: "LT", name: "Litauen" },
    { code: "LU", name: "Luxemburg" },
    { code: "LV", name: "Lettland" },
    { code: "MT", name: "Malta" },
    { code: "NL", name: "Niederlande" },
    { code: "PL", name: "Polen" },
    { code: "PT", name: "Portugal" },
    { code: "RO", name: "Rumänien" },
    { code: "SE", name: "Schweden" },
    { code: "SI", name: "Slowenien" },
    { code: "SK", name: "Slowakei" }
  ];

  const checkVAT = async () => {
    setStatus("loading");
    setResult(null);

    try {
      const response = await fetch("https://vat-api-x33m.onrender.com/vat-checker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          country: country,
          number: vatNumber
        })
      });

      const data = await response.json();
      setResult(data);
      setStatus("success");
    } catch (error) {
      console.error("Fehler:", error);
      setStatus("error");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2>EU-USt-IdNr. Prüfer</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Land auswählen: </label>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          {countryList.map((item) => (
            <option key={item.code} value={item.code}>
              {item.code} : {item.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>USt-IdNr.: </label>
        <input
          type="text"
          value={vatNumber}
          onChange={(e) => setVatNumber(e.target.value)}
          placeholder="z.B. 123456789"
        />
      </div>

      <button onClick={checkVAT}>Prüfen</button>

      <div style={{ marginTop: "2rem" }}>
        {status === "loading" && <p>🔄 Überprüfung läuft...</p>}
        {status === "error" && <p style={{ color: "red" }}>❗ Es ist ein Fehler aufgetreten. Bitte erneut versuchen.</p>}
        {status === "success" && result && (
          <div>
            <p><strong>Gültigkeit:</strong> {result.valid ? "✅ gültig" : "❌ ungültig"}</p>
            <p><strong>Name:</strong> {result.name || "(keine Angabe)"}</p>
            <p><strong>Adresse:</strong> {result.address || "(keine Angabe)"}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;