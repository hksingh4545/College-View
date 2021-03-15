import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme ,withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import CardHeader from '@material-ui/core/CardHeader'
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();

  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  
  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const useStyles2 = makeStyles((theme) =>({
  table: {
    minWidth: 500,
    
  },
  container: {
    maxHeight: 420,

    
  },
  paper: {
    padding: theme.spacing(1),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    maxHeight:480,
    Height: 480,
    Width: 500,
  },
  paper1: {
    position: 'absolute',
    minWidth: 650,
    color: theme.palette.text.secondary,
  }
}));

export default function CustomPaginationActionsTable({Studentdata,handleSchoolSelected,college}) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const [Name, setName] = React.useState("");
  const [Batch, setBatch] = React.useState("");
  const [College, setCollege] = React.useState("");
  const [Skills, setSkills] = React.useState("");
  const [modalStyle] = React.useState(getModalStyle);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (data) => {
    console.log("id:",data)
    fetch(`student/${data}`)
    .then(r=>r.json())
    .then(r=>{console.log(r.student);
      setOpen(true);setId(r.student.id);
      setName(r.student.name);
      setBatch(r.student.batch);
      setCollege(r.student.college_id.name)
      setSkills(r.student.skills.join(" "))
    })
    
  };
  const body = (
    <paper style={modalStyle} className={classes.paper1}>
      <Card className={classes.root1}>
      <CardHeader
                title="About"/>
      <CardContent
                style={{
                  marginLeft: '30px',
                  marginRight: '30px',
                }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant="overline"> Name</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className={classes.profileText}>
                          {Name}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="overline">ID</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className={classes.profileText}>
                          {id}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="overline">Batch</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className={classes.profileText}>
                          
                            {Batch}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="overline">College</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className={classes.profileText}>
                          {College}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="overline">Skills</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className={classes.profileText}>
                         {Skills}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    
                  </TableBody>
                </Table>
              </CardContent>
              </Card>
    </paper>
  );
  return (
    <Paper className={classes.paper} elevation={3}>
      {college!=="" && <CardHeader title={"Student in "+college}  style={{ color: 'black' }} />}
      {college==="" && <CardHeader title={"Student in College"}  style={{ color: 'black' }} />}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        {body}
      </Modal>
      {Studentdata.length!==0 &&
    <TableContainer className={classes.container}>
      <Table stickyHeader className={classes.table} >
      <TableHead>
          <TableRow>
            <StyledTableCell>Student Name</StyledTableCell>
            <StyledTableCell align="right">Year of joining</StyledTableCell>
            <StyledTableCell align="right">Stiudent ID</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? Studentdata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : Studentdata
          ).map((row) => (
            <TableRow key={row.id} style={{cursor:'pointer'}} onClick={()=>handleOpen(row._id)}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.batch}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.id}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
}
    </Paper>
  );
}
