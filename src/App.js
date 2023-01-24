import fplLogo from "./epl-premierleague-logo.svg";
import "./App.css";
import ManagersView from "./components/ManagerView/ManagersView";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Navbar sx={{ top: 0 }} /> */}
        <img src={fplLogo} className="App-logo" alt="logo" />
        <ManagersView />
      </header>
    </div>
  );
}

export default App;
