import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";
import { getUserActivityData } from "../../models/userActivityApi";
import moment from "moment";
import { UserActivityInfo } from "../../interfaces/UserActivityInfo";
import { UpdatedUserActivityInfo } from "../../interfaces/UpdatedUserActivityInfo";
import UserInfo from "./userInfo";
import Dialog from "@mui/material/Dialog";
import { GitActivityColors } from "../../interfaces/GitActivityColors";
import ErrorAlert from "../../components/errorAlert";

const HeatMapCalendar = () => {
  // Initializing state variables
  const [heatMapData, setHeatMapData] = useState<UserActivityInfo[]>([]);
  const [userInfoObject, setUserInfoObject] =
    useState<UpdatedUserActivityInfo>();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [openAlert, setOpenAlert] = useState(false);

  const currentDate = new Date();

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
            project: value.name,
          };
        }
      );

      //setting state using setState function
      setHeatMapData(updatedDataArr);
    } catch (error: unknown) {
      //Catch clause variable type annotation must be 'any' or 'unknown' if specified
      console.log(error);
      if (error instanceof Error) setErrorMessage(error.message);
      setOpenAlert(true);
    }
  };

  useEffect(() => {
    apiResponseData();
  }, []);

  //function to set colors based on activity
  const githubActivityColors = (val: GitActivityColors) => {
    const colors: GitActivityColors = {
      "0": "color-github-1",
      "1": "color-github-2",
      "2": "color-github-3",
      "3": "color-github-4",
      default: "color-empty",
    };
    return !val ? colors["default"] : colors[val.contributions] || colors["3"];
  };

  //function to set tooltip for activity
  const toolTipAttrs = (value: UpdatedUserActivityInfo) => {
    return !value.date
      ? {
          "data-tip": `No data available`,
        }
      : {
          "data-tip": `${value.contributions} contributions on ${value.date}`,
        };
  };

  //function handles dialog open
  const handleOpen = (value: UpdatedUserActivityInfo) => {
    setUserInfoObject(value);
    if (value) setOpen(true);
  };

  //function handles dialog close
  const handleClose = () => {
    setOpen(false);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
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
            tooltipDataAttrs={(value: UpdatedUserActivityInfo) =>
              toolTipAttrs(value)
            }
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
      <ErrorAlert
        errorMessage={errorMessage}
        open={openAlert}
        onClose={handleAlertClose}
      />
    </div>
  );
};

export default HeatMapCalendar;
