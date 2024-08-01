import React, { useState, useEffect } from "react";
import * as services from "../services/personelServices";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const columns = [
  { id: "personelName", label: "Personel Adı", minWidth: 170 },
  { id: "personelSurname", label: "Personel Soyadı", minWidth: 170 },
  { id: "personelSicilNo", label: "Personel Sicil No", minWidth: 170 },
  { id: "personelBirimi", label: "Personel Birimi", minWidth: 170 },
  { id: "personelGorevi", label: "Personel Görevi", minWidth: 170 },
];

export default function PersonelPage() {
  const [personelList, setPersonelList] = useState([]);
  const [open, setOpen] = useState(false);
  const [newPersonel, setNewPersonel] = useState({
    personelName: "",
    personelSurname: "",
    personelSicilNo: "",
    personelBirimi: "",
    personelGorevi: "",
    personelGender: "",
    personelBirthday: "",
    medeniDurum: "",
    personelTc: "",
    personelEdu: "",
    activity: "",
    photo: "",
    iseGirisTarihi: "",
    iseCikisTarihi: "",
    ilkPozisyon: "",
    ilkUnvan: "",
    ayrilmaNedeni: "",
  });

  useEffect(() => {
    services.getPersonel().then((res) => {
      setPersonelList(res.data);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewPersonel({
      personelName: "",
      personelSurname: "",
      personelSicilNo: "",
      personelBirimi: "",
      personelGorevi: "",
      personelGender: "",
      personelBirthday: "",
      medeniDurum: "",
      personelTc: "",
      personelEdu: "",
      activity: "",
      photo: "",
      iseGirisTarihi: "",
      iseCikisTarihi: "",
      ilkPozisyon: "",
      ilkUnvan: "",
      ayrilmaNedeni: "",
    });
  };

  const handleChange = (e) => {
    setNewPersonel({
      ...newPersonel,
      [e.target.name]: e.target.value,
    });
  };
  const handleDeletePersonel = (sicilNo) => {
    services.deletePersonel(sicilNo).then(() => {
      services.getPersonel().then((res) => {
        setPersonelList(res.data);
      });
    });
  };

  const handleCreatePersonel = () => {
    let tempPerson = {
      personelSicilNo: newPersonel?.personelSicilNo || "12",
      personelName: newPersonel?.personelName || "ss",
      personelSurname: newPersonel?.personelSurname || "ss",
      personelBirimi: newPersonel?.personelBirimi || "YazilimGelistirme",
      personelBirthday: newPersonel?.personelBirthday || "2020",
      personelTc: newPersonel?.personelTc || "17467084412",
      personelGorevi: newPersonel?.personelGorevi || "YazilimGelistirmeUzmani",
      personelEdu: newPersonel?.personelEdu || "LISANS",
      personelGender: newPersonel?.personelGender || "F",
      medeniDurum: newPersonel?.medeniDurum || "BEKAR",
      activity: newPersonel?.activity || "PASIF",
    };

    services.createPersonel(tempPerson).then(() => {
      // Refresh personel list after creation
      services.getPersonel().then((res) => {
        setPersonelList(res.data);
      });
      handleClose();
    });
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Yeni Personel Ekle
      </Button>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="table-red-hat">
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {personelList.map((row) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.personelSicilNo}
              >
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {row[column.id]}
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeletePersonel(row.personelSicilNo)}
                  >
                    Sil
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Yeni Personel Ekle</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="personelName"
            name="personelName"
            label="Personel Adı"
            type="text"
            fullWidth
            variant="outlined"
            value={newPersonel.personelName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="personelSurname"
            name="personelSurname"
            label="Personel Soyadı"
            type="text"
            fullWidth
            variant="outlined"
            value={newPersonel.personelSurname}
            onChange={handleChange}
          />

          <InputLabel id="personelBirimi-label">Personel Birimi</InputLabel>
          <Select
            labelId="personelBirimi-label"
            id="personelBirimi"
            name="personelBirimi"
            value={newPersonel.personelBirimi}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="YazilimGelistirme">YazilimGelistirme</MenuItem>
            <MenuItem value="ARGE">ARGE</MenuItem>
            {/* Add other birim options */}
          </Select>
          <InputLabel id="personelGorevi-label">Personel Görevi</InputLabel>
          <Select
            labelId="personelGorevi-label"
            id="personelGorevi"
            name="personelGorevi"
            value={newPersonel.personelGorevi}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="YazilimGelistirmeUzmani">
              YazilimGelistirmeUzmani
            </MenuItem>
            <MenuItem value="YonetmenYardimcisi">YonetmenYardimcisi</MenuItem>
            <MenuItem value="Yonetmen">Yonetmen</MenuItem>
            {/* Add other gorev options */}
          </Select>
          <InputLabel id="personelGender-label">Cinsiyet</InputLabel>
          <Select
            labelId="personelGender-label"
            id="personelGender"
            name="personelGender"
            value={newPersonel.personelGender}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="M">Erkek</MenuItem>
            <MenuItem value="F">Kadın</MenuItem>
            {/* Add other gender options if needed */}
          </Select>
          <TextField
            margin="dense"
            id="personelBirthday"
            name="personelBirthday"
            label="Doğum Yılı"
            type="number"
            fullWidth
            variant="outlined"
            value={newPersonel.personelBirthday}
            onChange={handleChange}
          />
          <InputLabel id="activity-label">Çalışma Durumu</InputLabel>
          <Select
            labelId="activity-label"
            id="activity"
            name="activity"
            value={newPersonel.activity}
            onChange={handleChange}
            fullWidth
          >
        
            <MenuItem value="AKTIF">AKTIF</MenuItem>
            <MenuItem value="PASIF">PASIF</MenuItem>
            {/* Add other medeni durum options if needed */}
          </Select>
          <TextField
            margin="dense"
            id="personelTc"
            name="personelTc"
            label="TC Kimlik No"
            type="text"
            fullWidth
            variant="outlined"
            value={newPersonel.personelTc}
            onChange={handleChange}
          />
           <InputLabel id="medeniDurum-label">Medeni Durum</InputLabel>
          <Select
            labelId="medeniDurum-label"
            id="medeniDurum"
            name="medeniDurum"
            value={newPersonel.medeniDurum}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="BEKAR">Bekar</MenuItem>
            <MenuItem value="EVLI">Evli</MenuItem>
            {/* Add other medeni durum options if needed */}
          </Select>
          <InputLabel id="personelEdu-label">Eğitim Durumu</InputLabel>
          <Select
            labelId="personelEdu-label"
            id="personelEdu"
            name="personelEdu"
            value={newPersonel.personelEdu}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="LISANS">Lisans</MenuItem>
            <MenuItem value="ONLISANS">Önlisans</MenuItem>
            <MenuItem value="YUKSEKLISANS">Yüksek Lisans</MenuItem>
            <MenuItem value="DOKTORA">Doktora</MenuItem>
            {/* Add other education options if needed */}
          </Select>
          <TextField
            margin="dense"
            id="photo"
            name="photo"
            label="Fotoğraf URL"
            type="text"
            fullWidth
            variant="outlined"
            value={newPersonel.photo}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="iseGirisTarihi"
            name="iseGirisTarihi"
            label="İşe Giriş Tarihi"
            type="date"
            fullWidth
            variant="outlined"
            value={newPersonel.iseGirisTarihi}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            id="iseCikisTarihi"
            name="iseCikisTarihi"
            label="İşten Çıkış Tarihi"
            type="date"
            fullWidth
            variant="outlined"
            value={newPersonel.iseCikisTarihi}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            id="ilkPozisyon"
            name="ilkPozisyon"
            label="İlk Pozisyon"
            type="text"
            fullWidth
            variant="outlined"
            value={newPersonel.ilkPozisyon}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="ilkUnvan"
            name="ilkUnvan"
            label="İlk Unvan"
            type="text"
            fullWidth
            variant="outlined"
            value={newPersonel.ilkUnvan}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="ayrilmaNedeni"
            name="ayrilmaNedeni"
            label="Ayrılma Nedeni"
            type="text"
            fullWidth
            variant="outlined"
            value={newPersonel.ayrilmaNedeni}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            İptal
          </Button>
          <Button onClick={handleCreatePersonel} color="primary">
            Ekle
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
