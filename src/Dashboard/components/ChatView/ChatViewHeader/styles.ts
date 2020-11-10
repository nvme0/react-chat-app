import { makeStyles } from "@material-ui/core";
import theme from "../../../../theme";

const useStyles = makeStyles({
  chatHeader: {
    width: "100%",
    minHeight: theme.spacing(8),
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default useStyles;
