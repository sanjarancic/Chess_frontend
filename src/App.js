import React from "react";
import "./bootstrap.min.css";
import "./App.css";
import io from "socket.io-client";

import Login from "./components/Login";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";

class App extends React.Component {
  state = {
    username: "",
    socket: io("http://127.0.0.1:5000/"),
    id: new URLSearchParams(window.location.search).get("id"),
    redirect: null,
    color: "",
    match_started: false,
    match_created: false,
    rep: null,
    open: false,
    player_white: "",
    player_black: "",
    stats: '',
    //stats:'[{"username":"sanja","n_points":5}]'
  };

  componentDidMount() {
    this.state.socket.on("match_created", (data) => {
      this.setState({ id: data.id, match_created: true });
    });

    this.state.socket.on("match_started", (data) => {
      if (
        this.state.username !== data.white_player &&
        this.state.username !== data.black_player
      )
        return;
      if (this.state.username === data.white_player) {
        this.setState({ color: "w" });
      } else if (this.state.username === data.black_player) {
        this.setState({ color: "b" });
      }
      this.setState({ match_started: true, id: data.id });
      this.setState({
        player_white: data.white_player,
        player_black: data.black_player,
      });
    });

    this.state.socket.on("leaderboard", (data) => {
      this.setState({ stats: data });
    });

    this.state.socket.on('empty_username', () => {
      alert('Unesi username')
    })
  }

  onFriendlySubmit = (event) => {
    event.preventDefault();
    if (!this.state.username) {
      alert("Unesi username");
      return;
    }
    if (!this.state.id) {
      this.state.socket.emit("join_match", {
        username: this.state.username,
        match_type: "friendly",
      });
    } else {
      this.state.socket.emit("join_match", {
        username: this.state.username,
        match_type: "friendly",
        id: this.state.id,
      });
    }
  };

  onRandomSubmit = (event) => {
    event.preventDefault();
    if (!this.state.username) {
      alert("Unesi username");
      return;
    }
    this.state.socket.emit("join_match", {
      username: this.state.username,
      match_type: "random",
    });
  };

  onUsernameChange = (username) => {
    this.setState({ username: username });
  };

  onLeaderboardSubmit = (event) => {
    event.preventDefault();
    this.isOver();
    this.state.socket.emit("get_leaderboard");
  };

  isOver = () => {
    this.setState({
      username: "",
      match_started: false,
      match_created: false,
      color: "",
      stats: "",
      id: new URLSearchParams(window.location.search).get("id"),
    });
  };

  render() {
    var isLoggedIn = this.state.username && this.state.match_started;
    //isLoggedIn=true;
    const aName = isLoggedIn ? "game" : "login";
    const iName = isLoggedIn ? "game-inner" : "login-inner";
    return (
      <div className={`App ${aName}`}>
        <div className="auth-wrapper">
          <div className={`auth-inner ${iName}`}>
            {this.state.stats && (
              <Leaderboard stats={this.state.stats} onOver={this.isOver} />
            )}
            {!isLoggedIn && !this.state.match_created && !this.state.stats && (
              <Login
                onUsernameChange={this.onUsernameChange}
                onFriendlySubmit={this.onFriendlySubmit}
                onRandomSubmit={this.onRandomSubmit}
                onLeaderboardSubmit={this.onLeaderboardSubmit}
              />
            )}
            {!isLoggedIn && this.state.match_created && !this.state.stats && (
              <div>Mec kreiran na localhost:3000/?id={this.state.id}. Cekam protivnika</div>
            )}
            {isLoggedIn && !this.state.stats && (
              <Game
                color={this.state.color}
                id={this.state.id}
                username={this.state.username}
                socket={this.state.socket}
                onOver={this.isOver}
                white_player={this.state.player_white}
                black_player={this.state.player_black}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
