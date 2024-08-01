import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import * as zimmetServices from "../services/zimmetServices";
import * as envanterServices from "../services/envanterServices";
import * as personelServices from "../services/personelServices";
import ZimmetDetailPage from "../ZimmetYonetim/ZimmetDetailPage";
import ZimmetSelect from "./ZimmetSelect";

const PersonelSearchPage = () => {
  const [sicilNo, setSicilNo] = useState("");
  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [personelSicilNo, setPersonelSicilNo] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [envanterList, setEnvanterList] = useState([]);
  const [personelList, setPersonelList] = useState([]);

  const handleSearch = () => {
    zimmetServices.filterPersonel(sicilNo, name)
      .then((res) => {
        setSearchResults(res.data);
        setPersonelSicilNo(null);
      })
      .catch((error) => {
        console.error("Personel arama hatası:", error);
      });
  };

  const handleOpenDialog = () => {
    envanterServices.getEnvanter().then(response => setEnvanterList(response.data));
    personelServices.getPersonel().then(response => setPersonelList(response.data));
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = (newZimmet) => {
    zimmetServices.createZimmet(newZimmet).then(() => {
      zimmetServices.getAllZimmet().then(response => {
        const sortedList = response.data.filter(zimmet => zimmet.status === 'PERSONEL');
        setSearchResults(sortedList);
      });
      handleCloseDialog();
    });
  };

  return (
    <div>
      <h1>Personel Ara</h1>
      <div>
        <label>
          Sicil No:
          <input
            type="text"
            value={sicilNo}
            onChange={(e) => setSicilNo(e.target.value)}
          />
        </label>
        <label>
          Ad:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button onClick={handleSearch}>Ara</button>
      </div>
      {searchResults?.length > 0 && (
        <div style={{ marginTop: "50px" }}>
          <h2>Arama Sonuçları</h2>
          <table>
            <thead>
              <tr>
                <th>Sicil No</th>
                <th>Ad</th>
                <th>Soyad</th>
                <th>Birim</th>
                <th>Görev</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((personel) => (
                <tr key={personel.personelSicilNo}>
                  <td>{personel.personelSicilNo}</td>
                  <td>{personel.personelName}</td>
                  <td>{personel.personelSurname}</td>
                  <td>{personel.personelBirimi}</td>
                  <td>{personel.personelGorevi}</td>
                  <td>
                    <button
                      onClick={() => {
                        setPersonelSicilNo(personel.personelSicilNo);
                      }}
                      type="button"
                    >
                      Zimmet İşlemleri
                    </button>
                    <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                      Yeni Zimmet Ekle
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {personelSicilNo && (
        <div style={{ marginTop: "50px" }}>
          <ZimmetDetailPage personelSicilNo={personelSicilNo} />
        </div>
      )}

      <ZimmetSelect
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        envanterList={envanterList}
        personelList={personelList}
      />
    </div>
  );
};

export default PersonelSearchPage;
