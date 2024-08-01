import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import * as zimmetServices from '../services/zimmetServices';
import * as envanterServices from '../services/envanterServices';
import * as personelServices from '../services/personelServices';
import ZimmetSelect from './ZimmetSelect';
import { findSubElement } from './findSubElement'; // adjust path as needed

const ZimmetPage = () => {
  const [zimmetList, setZimmetList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedZimmet, setSelectedZimmet] = useState(null);
  const [envanterList, setEnvanterList] = useState([]);
  const [personelList, setPersonelList] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'
  const [sortBy, setSortBy] = useState('envanterModel'); // Column to sort by

  const columns = [
    { id: 'zimmetId', label: 'Zimmet Id', minWidth: 170 },
    { id: 'statu', label: 'Statu', minWidth: 100 },
    { id: 'envanterDto.tip', label: 'Envanter Tipi', minWidth: 170 },
    { id: 'envanterDto.envanterMarkasi', label: 'Envanter Markası', minWidth: 170 },
    { id: 'envanterDto.envanterModel', label: 'Envanter Modeli', minWidth: 170 },
    { id: 'personelDto.personelSicilNo', label: 'Personel SicilNo', minWidth: 170 },
    { id: 'personelDto.personelName', label: 'Personel Adı', minWidth: 170 },
    { id: 'personelDto.personelSurname', label: 'Personel Soyadı', minWidth: 170 },
    { id: 'personelDto.personelBirimi', label: 'Personel Birimi', minWidth: 170 },
    { id: 'personelDto.personelGorevi', label: 'Personel Görevi', minWidth: 170 },
    { id: 'actions', label: 'Actions', minWidth: 170 },
  ];

  useEffect(() => {
    zimmetServices.getAllZimmet().then(response => {
      const sortedList = sortZimmetList(response.data, sortBy, sortDirection);
      setZimmetList(sortedList);
    });
    envanterServices.getEnvanter().then(response => setEnvanterList(response.data));
    personelServices.getPersonel().then(response => setPersonelList(response.data));
  }, [sortDirection, sortBy]);

  const handleOpenDialog = () => {
    setSelectedZimmet(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedZimmet(null);
  };

  const handleSubmit = (newZimmet) => {
    zimmetServices.createZimmet(newZimmet).then(() => {
      zimmetServices.getAllZimmet().then(response => {
        const sortedList = sortZimmetList(response.data, sortBy, sortDirection);
        setZimmetList(sortedList);
      });
      handleCloseDialog();
    });
  };

  const handleGeriAl = (zimmetId) => {
    zimmetServices.geriAlZimmet(zimmetId).then(() => {
      zimmetServices.getAllZimmet().then(response => {
        const sortedList = sortZimmetList(response.data, sortBy, sortDirection);
        setZimmetList(sortedList);
      });
    });
  };

  const renderCellValue = (row, column) => {
    const tempRow = findSubElement({ field: column.id }, row);
    return tempRow ? tempRow.value : '';
  };

  const sortZimmetList = (list, sortBy, direction) => {
    const enumOrder = {
      'PERSONEL': 1,
      'DEPO': 2,
    };
  
    return [...list].sort((a, b) => {
      let valueA;
      let valueB;
  
      if (sortBy === 'envanterDto.envanterModel') {
        valueA = (a.envanterDto?.envanterModel || '').toString();
        valueB = (b.envanterDto?.envanterModel || '').toString();
      } else if (sortBy === 'zimmetId') {
        valueA = parseInt(a.zimmetId, 10);
        valueB = parseInt(b.zimmetId, 10);
      } else if (sortBy === 'statu') {
        valueA = enumOrder[a.statu] || 0;
        valueB = enumOrder[b.statu] || 0;
      }
  
      if (direction === 'asc') {
        return (valueA > valueB ? 1 : (valueA < valueB ? -1 : 0));
      } else {
        return (valueA < valueB ? 1 : (valueA > valueB ? -1 : 0));
      }
    });
  };
  

  const handleSort = (columnId) => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    setSortBy(columnId);

    const sortedList = sortZimmetList(zimmetList, columnId, newDirection);
    setZimmetList(sortedList);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpenDialog} style={{ margin: '20px' }}>
        Yeni Zimmet Ekle
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
              <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
              {column.label}
              {['envanterDto.envanterModel', 'zimmetId', 'statu'].includes(column.id) && (
                <Button onClick={() => handleSort(column.id)} style={{ marginLeft: '10px' }}>
                  {sortDirection === 'asc' ? '▼' : '▲'}
                </Button>
              )}
            </TableCell>
            
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {zimmetList.map((row) => (
              <TableRow key={row.zimmetId}>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.id === 'actions' ? (
                      <>
                        <Button onClick={() => handleGeriAl(row.zimmetId)} style={{ marginLeft: '10px' }}>
                          Geri Al
                        </Button>
                      </>
                    ) : (
                      renderCellValue(row, column)
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ZimmetSelect
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        envanterList={envanterList}
        personelList={personelList}
      />
    </>
  );
};

export default ZimmetPage;
