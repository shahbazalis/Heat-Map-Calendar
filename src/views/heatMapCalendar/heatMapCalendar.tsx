import CalendarHeatmap from "react-calendar-heatmap";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";
import { getData } from "../../models/api";
import { useEffect, useState } from "react";
import moment from "moment"; 

const HeatMapCalendar = () => {
  const [heatMapData, setHeatMapData] = useState([]); // useState is the hook which allows to have state variables in react funtional components
  const today = new Date();

  //calling the function to get api response data
  const apiResponseData = async () => {
    const response: any = await getData();
    const updatedDataArr: any = response.map((value: any) => {
      return {
        date: moment(value.updated_at).format("YYYY-MM-DD"), // formatting date into the required date format using moment
        contributions: value.watchers_count,
      };
    });
    setHeatMapData(updatedDataArr); //setting state using setState function, when state changes component re-renders
  };

  // useEffect is the hook which is used to perform action based on sideeffects, it is called whenever component renders
  useEffect(() => {
    apiResponseData();
  }, []);

  return (
    <div>
      <Paper>
        <h1>Heat Map Calendar</h1>
        <Grid container spacing={2}>
          <CalendarHeatmap
            startDate={new Date("2021-01-01")}
            endDate={today}
            gutterSize={5}
            showWeekdayLabels={true}
            values={heatMapData}
            classForValue={(value) => {
              return !value
                ? "color-empty"
                : value.contributions === 0
                ? `color-github-1`
                : value.contributions === 1
                ? `color-github-2`
                : value.contributions === 2
                ? `color-github-3`
                : `color-github-4`;
            }}
            tooltipDataAttrs={(value: any) => {
              return !value.date
                ? {
                    "data-tip": `No data available`,
                  }
                : {
                    "data-tip": `${value.contributions} contributions on ${value.date}`,
                  };
            }}
          />
          <ReactTooltip />
        </Grid>
      </Paper>
    </div>
  );
};

export default HeatMapCalendar;
