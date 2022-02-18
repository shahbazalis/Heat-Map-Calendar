import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Divider } from "@mui/material";

import { UpdatedUserActivityInfo } from "../../interfaces/UpdatedUserActivityInfo";

interface UserInfoDialog {
  open: boolean;
  onClose: (value: boolean) => void;
  userInfoObject: UpdatedUserActivityInfo | undefined;
}

const UserInfo = (props: UserInfoDialog) => {
  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardHeader
        subheader=""
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            U
          </Avatar>
        }
        title="UserInfo"
      />
      <CardMedia
        component="img"
        height="200"
        image={props.userInfoObject?.img}
        alt="user"
      />

      <CardContent>
        <Divider />
        <Typography gutterBottom variant="h6" component="div">
          Name: {props.userInfoObject?.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          Id:{props.userInfoObject?.id}
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          Contributions:
          {props.userInfoObject?.contributions}
        </Typography>
        <Divider />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => props.onClose(false)}>
          <Typography variant="button" display="block" gutterBottom>
            Close
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserInfo;
