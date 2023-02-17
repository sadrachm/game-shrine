import CreateIcon from '@mui/icons-material/Create';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";

const Header = () => {
    return <div
    style={{
      display: "flex",
      flex: "2",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "8px 0 11px 10px",
      backgroundColor:"#ffecdb",
      borderBottom:"1px solid black"
    }}
  >
    <Link to="/recipe" style={{ flex: "1", textDecoration: "none", alignItems:'center' }}>
      <h1 className="" style={{ fontFamily: "Playfair Display", margin:0 }}>
        Home
      </h1>
    </Link>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flex: "1",
        justifyContent: "space-evenly",
        alignItems:'center',
      }}
    >
      <Link to="/recipe/create"><button><CreateIcon /></button></Link>
      <Link to=""><button><AccountCircleIcon /></button></Link>
    </div>
  </div>
}

export default Header;