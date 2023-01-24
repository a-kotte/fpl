import React from "react";
import axios from "axios";
import ManagerTransfers from "./ManagerTransfers";
import { Button, Modal, Box, Typography } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

function playerProfileURL(player_id, gw) {
  window.open(
    "https://fantasy.premierleague.com/entry/" + player_id + "/event/" + gw
  );
}

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
        <a>
          {this.manager.player_name} with {this.manager.total} points.
          <Button
            sx={{ margin: 1 }}
            variant="contained"
            size="small"
            onClick={() => this.viewTransferClick()}
          >
            View transfers
          </Button>
          <Modal
            open={this.state.viewed}
            onClose={() => this.viewTransferClick()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Transfers for the most recent gameweek
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, marginLeft: 6 }}
              >
                <ManagerTransfers
                  manager_id={this.manager.entry}
                  gameweek={this.currentGW}
                />
              </Typography>
            </Box>
          </Modal>
          <Button
            sx={{ margin: 1 }}
            variant="outlined"
            endIcon={<LaunchIcon />}
            size="small"
            onClick={() => playerProfileURL(this.manager.entry, this.currentGW)}
          >
            Peep team
          </Button>
        </a>
      </div>
    );
  }
}
