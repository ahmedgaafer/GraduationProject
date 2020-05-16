import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {AuthContext} from '../index.js';

const useStyles = makeStyles({
  root: {
    width: '85%',
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: 'id', label: 'Case ID', minWidth: 15 },
  { 
    id: 'specialization',
    label: 'Case Type',
    minWidth: 50,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'case_name',
    label: 'Diagnoses',
    minWidth: 50,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'case_description',
    label: 'Doctor comments',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
];


function getPatientHistory(id){
  const rows = []
  if(! id) return rows

  console.log(id, "IN!!")
  fetch(`/api/list-patient-cases/${id}/`)
  .then(res => res.json())
  .then(data => {
    data.forEach( Case => {
      let {id, specialization, case_name, case_description} = Case;
      case_description = case_description || 'Wating';
      rows.push( {id, specialization, case_name, case_description})

    })
  })
  console.log(rows)
  return rows
}

export default function Patient() {
  const classes = useStyles();
  const [user, setUser] = useContext(AuthContext);
  const [state, setState] = useState({id : null, rows: []})
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(100);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  
  React.useEffect(() => {
    if(!user || !user.email) {
      const id = localStorage.getItem('id') || null;
      setState({id: id, rows: getPatientHistory(id)})
      setTimeout(() => {

        setRowsPerPage(10)
      }, 1000)
    }
  }, [])

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, i) => (
                <TableCell
                  key={i}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {state.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={state.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
)}