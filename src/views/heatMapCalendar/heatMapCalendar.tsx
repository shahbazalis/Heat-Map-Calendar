import CalendarHeatmap from "react-calendar-heatmap";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const HeatMapCalendar = () => {
  const today = new Date();

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
            values={[
              { date: "2022-01-01" },
              { date: "2022-01-22" },
              { date: "2022-01-30" },
            ]}
          />
        </Grid>
      </Paper>
    </div>
  );
};

export default HeatMapCalendar;
