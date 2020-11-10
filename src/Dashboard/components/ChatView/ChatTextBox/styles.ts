import { makeStyles } from "@material-ui/core/styles";
import theme from "../../../../theme";

const useStyles = makeStyles(() => ({
  sendButton: {
    cursor: "pointer"
  },
  chatTextBoxContainer: {
    width: "100%",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  },
  chatTextBox: {
    width: "100%",
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(1),
    "&.drag-active": {
      color: theme.palette.text.primary,
      "& textarea": {
        textAlign: "center"
      },
      "& fieldset": {
        borderColor: theme.palette.primary.main,
        borderRadius: 0,
        borderWidth: "2px"
      }
    }
  },
  chatTextActions: {
    display: "flex",
    justifyContent: "flex-end"
  }
}));

export default useStyles;
