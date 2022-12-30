import React from "react";
import axios from "axios";
import ManagerDetails from "./ManagerDetails";

export default class TopNManagers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { viewed: false };
  }
  topN = [];
  currentGW = 0;

  viewTransferClick() {
    this.setState({ viewed: !this.state.viewed });
  }

  componentDidMount() {
    // grab the standings from overall league (id=314)
    axios
      .get(
        `https://fantasy.premierleague.com/api/leagues-classic/314/standings`
      )
      .then((res) => {
        const results = res.data.standings.results;

        this.setState({});

        this.topN = results.slice(0, this.props.num_managers);
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
        <ul>
          {this.topN.map((person) => (
            <li key={person.id}>
              <ManagerDetails manager={person} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
