import React from "react";
import TopNManagers from "./TopNManagers";
import { Button } from "@mui/material";

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
        <Button
          sx={{ margin: 0.3 }}
          variant="contained"
          onClick={() => this.setState({ num_managers: 1 })}
        >
          View top Manager
        </Button>
        <Button
          sx={{ margin: 0.3 }}
          variant="contained"
          onClick={() => this.setState({ num_managers: 5 })}
        >
          View top 5
        </Button>
        <Button
          sx={{ margin: 0.3 }}
          className="buttons"
          variant="contained"
          onClick={() => this.setState({ num_managers: 10 })}
        >
          View top 10
        </Button>
        <Button
          sx={{ margin: 0.3 }}
          className="buttons"
          variant="contained"
          onClick={() => this.setState({ num_managers: 20 })}
        >
          View top 20
        </Button>

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
        <div></div>
      </div>
    );
  }
}

// const SelectedButton =
//   styled(Button) <
//   SelectedButton >
//   (({}) => ({
//     width: 200,
//   }));

// const UnselectedButton =
//   styled(Button) <
//   UnselectedButton >
//   (({}) => ({
//     width: 300,
//   }));
