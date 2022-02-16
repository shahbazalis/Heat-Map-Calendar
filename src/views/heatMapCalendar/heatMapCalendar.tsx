import CalendarHeatmap from "react-calendar-heatmap";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";

const HeatMapCalendar = () => {
  const today = new Date();

  const data = [
    {
      date: "2021-01-02",
      contributions: 10,
      details: {
        visits: 16,
        submissions: 5,
        notebooks: 1,
        discussions: 4,
      },
    },
    {
      date: "2021-01-03",
      contributions: 15,
      details: {
        visits: 16,
        submissions: 5,
        notebooks: 1,
        discussions: 4,
      },
    },
    {
      date: "2021-01-05",
      contributions: 5,
      details: {
        visits: 16,
        submissions: 5,
        notebooks: 1,
        discussions: 4,
      },
    },
    {
      date: "2021-02-05",
      contributions: 3,
      details: {
        visits: 16,
        submissions: 5,
        notebooks: 1,
        discussions: 4,
      },
    },
  ];

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
            values={data}
            classForValue={(value) => {
              return !value
                ? "color-empty"
                : value.contributions >= 1 && value.contributions <= 3
                ? `color-github-1`
                : value.contributions >= 4 && value.contributions <= 6
                ? `color-github-2`
                : value.contributions >= 7 && value.contributions <= 9
                ? `color-github-3`
                : `color-github-4`;
            }}
            tooltipDataAttrs={(value: any) => {
              return !value.date
                ? {
                    "data-tip": `No contributions`,
                  }
                : {
                    "data-tip": `${value.contributions} contributions on ${value.date}`,
                  };
            }}
            // onClick={(value) => {
            //   if (!value) {
            //     alert(`No contribution`);
            //   } else {
            //     alert(`${value.contributions} contributions on ${value.date}`);
            //   }
            // }}
          />
          <ReactTooltip />
        </Grid>
      </Paper>
    </div>
  );
};

export default HeatMapCalendar;
