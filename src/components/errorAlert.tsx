import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface ErrorAlertInterface {
  open: boolean;
  onClose: (value: boolean) => void;
  errorMessage: String;
}

const ErrorAlert = (props: ErrorAlertInterface) => {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={props.open}
        autoHideDuration={5000}
        onClose={() => props.onClose(false)}
      >
        <Alert onClose={() => props.onClose(false)} severity="error">
          {props.errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ErrorAlert;
