import React from "react";
import axios from "axios";
import PlayerLookup from "./PlayerLookup";

// expects 2 parms:
/*
Input:
1. managerid
2. gameweek number
*/
export default class ManagerTransfers extends React.Component {
  old = [];
  new = [];
  manager_id = this.props.manager_id;
  gameweek = this.props.gameweek;
  transferredIn = [];
  transferredOut = [];
  state = {
    madeTransfers: false,
  };

  componentDidMount() {
    let endpointOld =
      "https://fantasy.premierleague.com/api/entry/" +
      this.manager_id +
      "/event/" +
      (this.gameweek - 1) +
      "/picks/";
    axios
      .get(endpointOld)
      .then((res) => {
        const results = res.data;
        const picks = results.picks;

        // populate old team
        for (let i = 0; i < picks.length; i++) {
          this.old[i] = picks[i].element;
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

    let endpointNew =
      "https://fantasy.premierleague.com/api/entry/" +
      this.manager_id +
      "/event/" +
      this.gameweek +
      "/picks/";
    axios
      .get(endpointNew)
      .then((res) => {
        const results = res.data;
        const picks = results.picks;
        // this.setState({ picks });

        // populate old team
        for (let i = 0; i < picks.length; i++) {
          this.new[i] = picks[i].element;
        }
        // populate transfer ins
        this.transferredIn = this.new.filter((x) => !this.old.includes(x));
        // populate transfer outs
        this.transferredOut = this.old.filter((x) => !this.new.includes(x));
        let madeTrasfers = true;
        this.setState({ madeTrasfers });
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
        <div>
          <table>
            <thead>
              <tr>
                <th>In</th>
                <th>Out</th>
              </tr>
            </thead>
            <tbody>
              {this.transferredIn.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    {" "}
                    <PlayerLookup player_id={item} />{" "}
                  </td>
                  <td>
                    <PlayerLookup player_id={this.transferredOut[idx]} />{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
