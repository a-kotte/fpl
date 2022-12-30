import React from "react";
import axios from "axios";
import PlayerLookup from "./PlayerLookup";

const testFunc = (props) => {
  let players = [];

  let endpointOld =
    "https://fantasy.premierleague.com/api/entry/" +
    this.manager_id +
    "/event/" +
    this.gameweek +
    "/picks/";
  axios
    .get(endpointOld)
    .then((res) => {
      const results = res.data;
      const picks = results.picks;
      //this.setState({ picks });

      // populate old team
      for (let i = 0; i < picks.length; i++) {
        players[i] = picks[i].element;
      }
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

  return <h1>Hello, {players[0]}</h1>;
};

export default testFunc;
