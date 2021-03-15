import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
    Chart,
    PieSeries,
    Title,
    Legend,
    Tooltip
  } from '@devexpress/dx-react-chart-material-ui';
import { Animation ,EventTracker, HoverState} from '@devexpress/dx-react-chart';
import Paper from '@material-ui/core/Paper';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    maxHeight:470,
  },
}));

export default function FullWidthTabs({data,handleClick,data_course}) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [targetItem, changeTargetItem] = React.useState(undefined);
  const [title_state, setTitle] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const handleChangetooltip=(targetItem)=>{
    if(targetItem!==null)
    { 
      setTitle(data[targetItem.point]._id)
      // changeTargetItem(data[targetItem.point]._id)
    }else{
      setTitle("")
    }
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} style={{width: '100%',maxHeight:470}} elevation={3}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Colleges per State" {...a11yProps(0)} />
          <Tab label="Colleges per Course" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        
            <Chart
            data={data}
            style={{maxHeight:450}}
            >
              <PieSeries
                valueField="count"
                argumentField="_id"
                innerRadius={0.3}
                outerRadius={0.5}
              />
              <EventTracker onClick={handleClick}/>
              <HoverState />
              {/* <Legend style={{maxHeight:20}}/> */}
              {/* <SelectionState selection={selection} /> */}
              <Title
                text={title_state}
              />
              <Tooltip targetItem={targetItem} onTargetItemChange={handleChangetooltip} />
              <Animation />
            </Chart>
         
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <Chart
            data={data_course}
            style={{maxHeight:450}}
            >
              <PieSeries
                valueField="count"
                argumentField="course"
                innerRadius={0.4}
                outerRadius={0.6}
              />
              <HoverState />
              <Legend />
              {/* <SelectionState selection={selection} /> */}
              {/* <Title
                text="School in Course"
              /> */}
              <Animation />
            </Chart>
        </TabPanel>
      </SwipeableViews>
      </Paper>
    </div>
  );
}