            
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  loadingState: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rightBar: {
    background: theme.palette.primary.main[100],
    color: "#000000",

    height: "100%",
  },
  follow: {
    background: "transparent",
    color: theme.palette.primary.main,
    borderRadius: 50,
    border: "2px solid",
    borderColor: theme.palette.primary.main,
    // padding: "2px 5px",
    minWidth: 80,
    height: 30,
    marginLeft: "auto",
    cursor: "pointer",
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: "50%",
    background: "var(--borderLLight)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginRight: 10,
  },
  User: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    borderBottom: "1px solid rgba(0,0,0,0.2)",
  },
}));
export default useStyles