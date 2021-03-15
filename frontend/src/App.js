import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar'
import {
  Chart,
  PieSeries,
  Title,
  Legend
} from '@devexpress/dx-react-chart-material-ui';
import { Animation ,EventTracker, HoverState} from '@devexpress/dx-react-chart';
import Collegedata from './college_data.json'
import Studentdata from './student_data.json'
import CollegeTable from './collegetable'
import StudentTable from './studenttable'
import MyCharts from './charts'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CollegeinStateTable from './studentincollege'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const data = [
  { region: 'Asia', val: 4119626293 },
  { region: 'Africa', val: 1012956064 },
  { region: 'Northern America', val: 344124520 },
  { region: 'Latin America and the Caribbean', val: 590946440 },
  { region: 'Europe', val: 727082222 },
  { region: 'Oceania', val: 35104756 },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // background: 'rgb(9,9,121)',
    // background: 'linear-gradient(90deg, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 0%, rgba(0,230,210,1) 100%)',
    height:'100%',
    width:'100vw',
    position:'relative',
    
    '&::before': {
      content: '""',
      position:'absolute',
      height: "100%",
      width:'100%',
      background: 'rgb(9,9,121)',
      background: 'linear-gradient(90deg, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 0%, rgba(0,230,210,1) 100%)',
      top: 0,
      left:0,
      clipPath: 'circle(50% at 26% 11%)',

      zIndex:"-1",
    }
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxHeight:550,
    Height: 550,
    

  },
  mainContainer:{
    // background: 'rgb(9,9,121)',
    // background: 'linear-gradient(90deg, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 0%, rgba(0,230,210,1) 100%)'
  }
}));

const App =  () =>{
  const classes = useStyles();
  const [select_state,setState]=useState("")
  const [select_college,setCollege]=useState("")
  const [college_data_state,setCollegeDataState]=useState([]);
  const [college_data,setCollegeData]=useState([]);
  const [student_data,setStudentData]=useState([]);
  const [chart_data,setChartData ]=useState([])
  const [chart_data_course,setChartDataCourse ]=useState([])
  const data3=[]
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  useEffect(()=>{
    let data= []
    fetch("college/count/state")
    .then(r=>r.json())
    .then(r=>{setChartData(r.college);})

    fetch("college/all")
    .then(r=>r.json())
    .then(r=>{
      let data2=[]
      setCollegeData(r.college);
      let data3=[]
      
      
      data=r.college
      for(let x in data){
      for(let k in data[x].courses){
        if(data2[data[x].courses[k]]===undefined){
          data2[data[x].courses[k]]=1;
        }else{
          data2[data[x].courses[k]]++;
        }
      }

    }
      for(let x in data2){
        data3.push({"course":x,'count':data2[x]})
      }
      setChartDataCourse(data3)
      })
    
    
  },[])
  
  const handleClick=({targets})=>{
    setState(chart_data[targets[0].point]._id)
    setCollege("")
    setStudentData([])
    fetch(`/college/state/${chart_data[targets[0].point]._id}`)
    .then(r=>r.json())
    .then(r=>{setCollegeDataState(r.college)})
  }
  const handleSchoolSelected=(data)=>{
    setCollege(data.name)
    fetch(`college/${data.id}/students`)
    .then(r=>r.json())
    .then(r=>{setStudentData(r.students)})
    const data1=[]
    for(let x in Studentdata){
      if(Studentdata[x].college_id===data){
        data1.push(Studentdata[x]);
      }
    }
    setStudentData(data1)
    
  }
  const handleCollegeStateSelected=(data)=>{
    setCollege(data.name)
    fetch(`college/${data.id}/students`)
    .then(r=>r.json())
    .then(r=>{setStudentData(r.students)})
    setState(data.state)
    fetch(`/college/state/${data.state}`)
    .then(r=>r.json())
    .then(r=>{setCollegeDataState(r.college)})
  }
  let data2=[]

  for(let x in Collegedata){
    if(data2[Collegedata[x].state]===undefined){
      data2[Collegedata[x].state]=1;
    }else{
      data2[Collegedata[x].state]++;
    }
  }
  
  for(let x in data2){
    data3.push({"state":x,'no_school':data2[x]})
  }
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <ThemeProvider theme={theme}>

    <div className={classes.root}>
      {/* <AppBar position="static" style={{opacity: 0.5,backgroundColor:'white',zIndex:'-1'}}>
      <Toolbar variant="dense"> */}
        <div style={{postion:'absolute',display:'inline-block',fontSize:30,color:"rgba(0,212,255,1)",fontWeight:'bold',backgroundColor:'white',width:150,marginTop:20,marginLeft:20,textAlign:'center',borderRadius:20}}>
          College Details
        </div>
      {/* </Toolbar>
    </AppBar> */}
      <Toolbar/>
      <Container maxWidth="lg" className={classes.mainContainer}>
      <Grid container item spacing={4}>
        <Grid item lg={6} xs={12}>
            <CollegeTable Collegedata={college_data} handleCollegeStateSelected={handleCollegeStateSelected}/>

          
        </Grid>
        <Grid item lg={6} xs={12}>
          
          <MyCharts handleClick={handleClick} data={chart_data} data_course={chart_data_course}/>
        </Grid>
        <Grid item lg={6} xs={12}>
              <CollegeinStateTable Collegedata={college_data_state} state={select_state} handleSchoolSelected={handleSchoolSelected}/>

        </Grid>
        <Grid item lg={6} xs={12}>
          
            <StudentTable Studentdata={student_data} college={select_college} handleSchoolSelected={handleSchoolSelected}/>
         
        </Grid>
      </Grid>
      </Container>
    </div>
    </ThemeProvider>

  );
}
export default App;