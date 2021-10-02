import { Dialog, DialogContent } from "@material-ui/core";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./notificationDialog.css";

const NotificationDialog = ({ status, open, handleClose, content }) => {
  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogContent className="errDialog">
          <div className="errDialogContent">
            {status === "error" ? (
              <ErrorIcon htmlColor="red" />
            ) : (
              <CheckCircleIcon htmlColor="green" />
            )}
            <span className="errDialogText">{content}</span>
          </div>
          <button className="errDialogBtn" onClick={handleClose}>
            Oke
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationDialog;
