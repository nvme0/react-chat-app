import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  list: {
    height: "100%",
    width: "100%"
  },
  listItem: {
    cursor: "pointer"
  },
  unreadMessage: {
    color: "red",
    position: "absolute",
    top: "0",
    right: "5px"
  }
}));

export default useStyles;
