import React from "react";
import axios from "axios";
import ManagerTransfers from "./ManagerTransfers";

function playerProfileURL(player_id, gw) {
  window.open(
    "https://fantasy.premierleague.com/entry/" + player_id + "/event/" + gw
  );
}

// function getCurrentGameweek() {
//   axios
//     .get("https://fantasy.premierleague.com/api/event-status/")
//     .then((res) => {
//       return res.data.status[0].event;
//     })
//     .catch(function (error) {
//       console.log(error);
//     })
//     .finally(function () {
//       // always executed
//     });
// }

export default class ManagerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { viewed: false };
  }
  manager = this.props.manager;
  currentGW = 0;

  viewTransferClick() {
    this.setState({ viewed: !this.state.viewed });
  }

  componentDidMount() {
    // grab the current gameweek
    axios
      .get("https://fantasy.premierleague.com/api/event-status/")
      .then((res) => {
        this.currentGW = res.data.status[0].event;
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }
  render() {
    return (
      <div>
        {this.manager.player_name} with {this.manager.total} points.
        <sub> test</sub>
        <button
          onClick={() => playerProfileURL(this.manager.entry, this.currentGW)}
        >
          Peep team
        </button>
        <button onClick={() => this.viewTransferClick()}>View transfers</button>
        {this.state.viewed === true && (
          <ManagerTransfers
            manager_id={this.manager.entry}
            gameweek={this.currentGW}
          />
        )}
      </div>
    );
  }
}
