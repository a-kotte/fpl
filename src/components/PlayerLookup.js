import React from "react";
import axios from "axios";

export default class PlayerLookup extends React.Component {
  total_players = 0;
  players = [];
  player_name = "";
  state = {
    players: [],
  };

  componentDidMount() {
    axios
      .get(`https://fantasy.premierleague.com/api/bootstrap-static/`)
      .then((res) => {
        const results = res.data;
        let players = results.elements;
        this.players = players;
        this.setState({ players });
        for (let i = 0; i < players.length; i++) {
          if (players[i].id === this.props.player_id) {
            this.player_name =
              players[i].first_name + " " + players[i].second_name;
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  render() {
    return <div>{this.player_name}</div>;
  }
}
