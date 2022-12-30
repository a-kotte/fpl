import React from "react";
import TopNManagers from "./TopNManagers";

export default class ManagersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { num_managers: 1 };
  }

  changeNumManagers(n) {
    this.setState({ num_managers: n });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ num_managers: 1 })}>
          View top Manager
        </button>
        <button onClick={() => this.setState({ num_managers: 5 })}>
          View top 5
        </button>
        <button onClick={() => this.setState({ num_managers: 10 })}>
          View top 10
        </button>
        <button onClick={() => this.setState({ num_managers: 20 })}>
          View top 20
        </button>

        <div>
          {this.state.num_managers > 1 ? (
            <h2> Top {this.state.num_managers} managers right now are </h2>
          ) : (
            <h2> Top manager right now is </h2>
          )}
          {this.state.num_managers === 1 && <TopNManagers num_managers={1} />}
          {this.state.num_managers === 5 && <TopNManagers num_managers={5} />}
          {this.state.num_managers === 10 && <TopNManagers num_managers={10} />}
          {this.state.num_managers === 20 && <TopNManagers num_managers={20} />}
        </div>
      </div>
    );
  }
}
