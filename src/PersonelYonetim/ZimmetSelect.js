import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import * as envanterServices from '../services/envanterServices'; 
import * as personelServices from '../services/personelServices'; 

const ZimmetSelect = ({ open, onClose, onSubmit }) => {
  const [envanterList, setEnvanterList] = useState([]);
  const [personelList, setPersonelList] = useState([]);
  const [selectedEnvanter, setSelectedEnvanter] = useState('');
  const [selectedPersonel, setSelectedPersonel] = useState('');
  const [alımTarihi, setAlımTarihi] = useState('');
  const [teslimTarihi, setTeslimTarihi] = useState('');

  useEffect(() => {
    envanterServices.getEnvanter().then(response => setEnvanterList(response.data));
    personelServices.getPersonel().then(response => setPersonelList(response.data));
  }, []);

  const handleSubmit = () => {
    if (selectedEnvanter && selectedPersonel && alımTarihi) {
      const newZimmet = {
        envanterId: selectedEnvanter,
        personelSicilNo: selectedPersonel,
        envanterAlimTarihi: alımTarihi,
        envanterTeslimTarihi: teslimTarihi,
        statu: 'PERSONEL'  // Sabit değer olarak 'PERSONEL' ayarlıyoruz
      };
      onSubmit(newZimmet);
    } else {
      alert('Lütfen tüm gerekli alanları doldurun.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Yeni Zimmet Ekle</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Envanter</InputLabel>
          <Select
            value={selectedEnvanter}
            onChange={(e) => setSelectedEnvanter(e.target.value)}
            label="Envanter"
          >
            {envanterList.map((envanter) => (
              <MenuItem key={envanter.envanterSeriNo} value={envanter.envanterSeriNo}>
                {envanter.envanterSeriNo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Personel</InputLabel>
          <Select
            value={selectedPersonel}
            onChange={(e) => setSelectedPersonel(e.target.value)}
            label="Personel"
          >
            {personelList.map((personel) => (
              <MenuItem key={personel.personelSicilNo} value={personel.personelSicilNo}>
                {personel.personelName} {personel.personelSurname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="Alım Tarihi"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={alımTarihi}
          onChange={(e) => setAlımTarihi(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Teslim Tarihi"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={teslimTarihi}
          onChange={(e) => setTeslimTarihi(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          İptal
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ZimmetSelect;
