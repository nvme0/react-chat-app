import { makeStyles } from "@material-ui/core/styles";
import theme from "../theme";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "100vh",
    display: "flex",
    flexDirection: "row"
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "300px",
    flexShrink: 0
  },
  sidebarHeader: {
    width: "100%",
    minHeight: theme.spacing(8),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  newChatButton: {
    "&:hover": {
      backgroundColor: theme.palette.background.default
    }
  }
}));

export default useStyles;
