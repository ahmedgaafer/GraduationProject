import React, { useEffect, useContext, useState} from 'react';
import {AuthContext} from '../index.js'
import {Redirect, Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Nav from '../components/Nav';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import SendIcon from '@material-ui/icons/Send';
import '../App.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '85%',
  },
  container: {
    maxHeight: 440,
  },
  button: {
    margin: theme.spacing(1),
  },
}));


const routeToHistory = id => {
  
}

const columns = [
  { id: 'id', label: 'Patient ID', minWidth: 15 },
  { 
    id: 'name',
    label: 'Patient Name',
    minWidth: 20,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'Email',
    label: 'Patient Email',
    minWidth: 50,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'history',
    label: 'View Patient History',
    minWidth: 90,
    align: 'center',
  },
];


 function getPatients(id){
  const rows = []
  fetch(`/api/list-doctor-patients/${id}/`)
  .then(res => res.json())
  .then(res => {
    res.forEach(p => {
      const {id, FirstName, LastName, Email } = p;
      const name = `${FirstName} ${LastName}`
      rows.push({id, name, Email})
    })
  })
  return rows
}

const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms));


export default function DoctorPatients() {

  const classes = useStyles();
  const [user, setUser] = useContext(AuthContext);
  const [redirectWithState, setRedirect] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [state, setState] = useState({id : user.id || null, rows: getPatients(user.id || null)})

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  useEffect(() => {
    if(!user || !user.email) {
      const token = localStorage.getItem('token') || null;
      const email = localStorage.getItem('email') || null;
      const id = localStorage.getItem('id') || null;
      const type = localStorage.getItem('type') || null;
      setUser({email, token, id, type});

      console.log(id)
      setState({id: id, rows:getPatients(id)})
      sleep(1000)
      .then(() => {
        setRowsPerPage(10)
      })
    }
    if(user && user.id){
      setState({id: user.id, rows:getPatients(user.id)})
      sleep(1500)
      .then(() => {
        setRowsPerPage(10)
      })
    }
  }, [])


  return (
    <div className="App">
      {
        (user && user.email && user.type !== "doctor")?
          <Redirect to="/home"/>:false    
      }

        { redirectWithState && <Redirect 
         to={{
          pathname: '/view',
           state: redirectWithState
             }}
          />
         }
      <Nav />
      <header className="App-header">
          <h3>Patients</h3>
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
                  console.log(row)
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        let value = row[column.id];
                        if(column.id == "history"){
                          value = <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<SendIcon/>}
                                    onClick={() => {
                                      setRedirect({ redirectWithState: {
                                          id: row.id
                                      }})
                                    }}
                                  >
                                    View History
                                  </Button>
                        }
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
      </header>
    </div>
    )}