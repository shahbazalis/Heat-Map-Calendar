import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { UpdatedUserActivityInfo } from "../../interfaces/UpdatedUserActivityInfo";

interface UserInfoDialog {
  open: boolean;
  onClose: (value: boolean) => void;
  userInfoObject: UpdatedUserActivityInfo | undefined;
}
const UserInfo = (props: UserInfoDialog) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader subheader="" title="UserInfo" />
      <CardContent>
        <Typography gutterBottom variant="body2" color="text.secondary">
          Name:{!props.userInfoObject ? "" : props.userInfoObject.name}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          Id:{!props.userInfoObject ? "" : props.userInfoObject.id}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          Contributions:
          {!props.userInfoObject ? "" : props.userInfoObject.contributions}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          Project:
          {!props.userInfoObject ? "" : props.userInfoObject.project}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => props.onClose(false)}>
          Close
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserInfo;
