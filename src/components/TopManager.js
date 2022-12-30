import React from "react";
import axios from "axios";

export default class TopManager extends React.Component {
  top = " ";
  top5 = [];

  componentDidMount() {
    axios
      .get(
        `https://fantasy.premierleague.com/api/leagues-classic/314/standings`
      )
      .then((res) => {
        // const persons = res.data;
        // const results = persons.standings.results;
        // const topManager = results[0];
        // let topManagerName = topManager.player_name;

        const results = res.data.standings.results;
        const topManagerName = results[0].player_name;

        this.setState({});
        this.top = topManagerName;
        this.top5 = results.slice(0, 5 + 1);
        console.log(this.top5);
        // console.log(topManager.player_name);
        // console.log(this.state.persons);
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
        Top manager right now is {this.top}
        <div>
          Here are the top{" "}
          <ul>
            {this.top5.map((person) => (
              <li key={person.id}>{person.player_name}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
