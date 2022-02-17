import CalendarHeatmap from "react-calendar-heatmap";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";
import { getUserActivityData } from "../../models/api";
import { useEffect, useState } from "react";
import moment from "moment";
import { UserActivityInfo } from "../../interfaces/UserActivityInfo";
import { UpdatedUserActivityInfo } from "../../interfaces/UpdatedUserActivityInfo";
import UserInfo from "./userInfo";
import Dialog from "@mui/material/Dialog";

const HeatMapCalendar = () => {
  const [heatMapData, setHeatMapData] = useState<UserActivityInfo[]>([]); // Initializing useState
  const [userInfoObject, setUserInfoObject] =
    useState<UpdatedUserActivityInfo>();
  const currentDate = new Date();
  const [open, setOpen] = useState(false);

  //The function to get api response data
  const apiResponseData = async () => {
    try {
      const response = await getUserActivityData();
      const updatedDataArr: UserActivityInfo[] = response.map(
        (value: UserActivityInfo) => {
          return {
            date: moment(value.updated_at).format("YYYY-MM-DD"),
            contributions: value.watchers_count,
            name: value.owner.login,
            id: value.id,
          };
        }
      );
      setHeatMapData(updatedDataArr); //setting state using setState function
    } catch (error) {
      console.log(error);
    }
  };

  const githubActivityColors = (val: UpdatedUserActivityInfo) => {
    const colors: any = {
      "0": "color-github-1",
      "1": "color-github-2",
      "2": "color-github-3",
      "3": "color-github-4",
      default: "color-empty",
    };
    return !val ? colors["default"] : colors[val.contributions] || colors["3"];
  };

  useEffect(() => {
    apiResponseData();
  }, []);

  const handleOpen = (value: UpdatedUserActivityInfo) => {
    setUserInfoObject(value);
    if (value) setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Paper>
        <h1>Heat Map Calendar</h1>
        <Grid container spacing={2}>
          <CalendarHeatmap
            startDate={new Date("2021-01-01")}
            endDate={currentDate}
            gutterSize={5}
            showWeekdayLabels={true}
            values={heatMapData}
            classForValue={(value) => githubActivityColors(value)}
            tooltipDataAttrs={(value: UpdatedUserActivityInfo) => {
              return !value.date
                ? {
                    "data-tip": `No data available`,
                  }
                : {
                    "data-tip": `${value.contributions} contributions on ${value.date}`,
                  };
            }}
            onClick={(value) => handleOpen(value)}
          />
          <ReactTooltip />
        </Grid>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <UserInfo
          open={open}
          onClose={handleClose}
          userInfoObject={userInfoObject}
        />
      </Dialog>
    </div>
  );
};

export default HeatMapCalendar;
