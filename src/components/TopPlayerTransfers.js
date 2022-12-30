import React from "react";
import axios from "axios";
import PlayerLookup from "./PlayerLookup";

export default class TopPlayerTransfers extends React.Component {
  old = [];
  new = [];
  test = 5;
  difference = [];
  transferredIn = [];
  transferredOut = [];
  state = {
    oldTeam: [],
    currTeam: [],
  };

  componentDidMount() {
    axios
      .get(`https://fantasy.premierleague.com/api/entry/6033938/event/7/picks/`)
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

    axios
      .get(`https://fantasy.premierleague.com/api/entry/6033938/event/8/picks/`)
      .then((res) => {
        const results = res.data;
        const picks = results.picks;
        this.setState({ picks });

        // populate old team
        for (let i = 0; i < picks.length; i++) {
          this.new[i] = picks[i].element;
        }
        this.difference = this.old
          .filter((x) => !this.new.includes(x))
          .concat(this.new.filter((x) => !this.old.includes(x)));
        this.transferredIn = this.new.filter((x) => !this.old.includes(x));
        this.transferredOut = this.old.filter((x) => !this.new.includes(x));
        //console.log("dif is " + this.difference);
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
