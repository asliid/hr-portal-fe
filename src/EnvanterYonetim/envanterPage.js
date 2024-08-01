import React, { useState, useEffect } from "react";
import * as services from "../services/envanterServices";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const columns = [
  { id: 'envanterSeriNo', label: 'Envanter Seri No', minWidth: 170 },
  { id: 'tip', label: 'Envanter Tipi', minWidth: 170 },
  { id: 'envanterMarkasi', label: 'Envanter Markası', minWidth: 170 },
  { id: 'envanterModel', label: 'Envanter Model', minWidth: 170 },
];

export default function EnvanterPage() {
  const [envanterList, setEnvanterList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1000);
  const [newEnvanterOpen, setNewEnvanterOpen] = useState(false);
  const [envanterSeriNo, setEnvanterSeriNo] = useState('');
  const [tip, setTip] = useState('');
  const [envanterMarkasi, setEnvanterMarkasi] = useState('');
  const [envanterModel, setEnvanterModel] = useState('');

  useEffect(() => {
    services.getEnvanter().then((res) => {
      setEnvanterList(res.data);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleNewEnvanterOpen = () => {
    setNewEnvanterOpen(true);
  };

  const handleNewEnvanterClose = () => {
    setNewEnvanterOpen(false);
    setEnvanterSeriNo('');
    setTip('');
    setEnvanterMarkasi('');
    setEnvanterModel('');
  };

  const handleCreateEnvanter = () => {
    const newEnvanter = {
      envanterSeriNo,
      tip,
      envanterMarkasi,
      envanterModel,
    };
    // Envanter oluşturma işlemi burada yapılacak
    services.createEnvanter(newEnvanter).then(() => {
      services.getEnvanter().then((res) => {
        setEnvanterList(res.data);
      });
    });
    handleNewEnvanterClose();
  };
console.log(rowsPerPage,envanterList)
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Button variant="contained" color="primary" onClick={handleNewEnvanterOpen}>
        Yeni Envanter Ekle
      </Button>
      <TableContainer sx={{ maxHeight: '50%' }}>
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
            {envanterList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.envanterSeriNo}>
                  {columns.map((column) => {
                    let value = row[column.id];
                    if (column.id === 'actions') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {/* Actions,  düzenleme veya silme butonları buraya eklenebilir */}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1000]}
        component="div"
        count={envanterList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={newEnvanterOpen} onClose={handleNewEnvanterClose}>
        <DialogTitle>Yeni Envanter Ekle</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lütfen yeni envanter bilgilerini girin.
          </DialogContentText>
          <TextField
            margin="dense"
            id="tip"
            label="Envanter Tipi"
            type="text"
            fullWidth
            variant="outlined"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
          />
          <TextField
            margin="dense"
            id="envanterMarkasi"
            label="Envanter Markası"
            type="text"
            fullWidth
            variant="outlined"
            value={envanterMarkasi}
            onChange={(e) => setEnvanterMarkasi(e.target.value)}
          />
          <TextField
            margin="dense"
            id="envanterModel"
            label="Envanter Model"
            type="text"
            fullWidth
            variant="outlined"
            value={envanterModel}
            onChange={(e) => setEnvanterModel(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewEnvanterClose} color="primary">
            İptal
          </Button>
          <Button onClick={handleCreateEnvanter} color="primary">
            Oluştur
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
