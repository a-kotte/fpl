import React from "react";
import axios from "axios";
import PlayerLookup from "./PlayerLookup";

// expects 2 parms:
/*
Input:
1. managerid
2. gameweek number
*/
export default class MTEST extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldTeam: [],
      currTeam: [],
    };

    this.old = [];

    let endpointOld =
      "https://fantasy.premierleague.com/api/entry/" +
      this.manager_id +
      "/event/" +
      (this.gameweek - 1) +
      "/picks/";
    axios
      .get(endpointOld)
      .then((res) => {
        const picks = res.data.picks;

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

    this.new = [];
    this.manager_id = this.props.manager_id;
    this.gameweek = this.props.gameweek;
    this.transferredIn = [];
    this.transferredOut = [];
  }

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
        this.setState({ picks });

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
