import logo from "./logo.svg";
import "./App.css";
import ManagersView from "./components/ManagersView";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ManagersView />
      </header>
    </div>
  );
}

export default App;
