import React, { useState, useEffect } from "react";
import { getZimmetlerByPersonel, geriAlZimmet } from "../services/zimmetServices";

const ZimmetDetailPage = (props) => {
  const [zimmetList, setZimmetList] = useState([]);
  const [selectedZimmet, setSelectedZimmet] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [personelSicilNo, setPersonelSicilNo] = useState();

  useEffect(() => {
    setPersonelSicilNo(props?.personelSicilNo);
  }, [props]);

  useEffect(() => {
    if (personelSicilNo) {
      const fetchZimmetler = async () => {
        try {
          const response = await getZimmetlerByPersonel(personelSicilNo);
          setZimmetList(response.data);
        } catch (error) {
          console.error("Zimmet verileri çekme hatası:", error);
        }
      };

      fetchZimmetler();
    }
  }, [personelSicilNo]);

  const handleGeriAl = (zimmetId) => {
    setSelectedZimmet(zimmetId);
    setOpenDialog(true);
  };

  const handleGeriAlSubmit = async () => {
    try {
      await geriAlZimmet(selectedZimmet);
      // Refresh zimmet list after returning the item
      const response = await getZimmetlerByPersonel(personelSicilNo);
      setZimmetList(response.data);
      setOpenDialog(false);
    } catch (error) {
      console.error("Geri alma işlemi hatası:", error);
    }
  };

  const filteredZimmetList = zimmetList.filter(zimmet => zimmet. statu === 'PERSONEL');

  return (
    <div>
      <h1>Zimmet Detayları</h1>
      <table>
        <thead>
          <tr>
            <th>Envanter Tipi</th>
            <th>Envanter Markası</th>
            <th>Envanter Modeli</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredZimmetList.map((zimmet) => (
            <tr key={zimmet.zimmetId}>
              <td>{zimmet?.tip}</td>
              <td>{zimmet?.envanterMarka}</td>
              <td>{zimmet?.envanterModel}</td>
              <td>
                <button onClick={() => handleGeriAl(zimmet.zimmetId)}>
                  Geri Al
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openDialog && (
        <div className="dialog">
          <h2>Zimmet Geri Al</h2>
          <label>
            Teslim Alınan Tarih:
            <input type="date" />
          </label>
          <button onClick={handleGeriAlSubmit}>Gönder</button>
          <button onClick={() => setOpenDialog(false)}>İptal</button>
        </div>
      )}
    </div>
  );
};

export default ZimmetDetailPage;
