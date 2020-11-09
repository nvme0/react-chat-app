import { makeStyles } from "@material-ui/core";
import theme from "../../../../theme";

const useStyles = makeStyles({
  content: {
    height: "100%",
    overflowY: "scroll",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(2)
  },
  userSent: {
    float: "right",
    clear: "both",
    padding: theme.spacing(2),
    wordWrap: "break-word",
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
    maxWidth: "80%",
    borderRadius: theme.spacing(1)
  },
  friendSent: {
    float: "left",
    clear: "both",
    padding: theme.spacing(2),
    wordWrap: "break-word",
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    maxWidth: "80%",
    borderRadius: theme.spacing(1)
  }
});

export default useStyles;
