import React from "react";

const Login = ({
  onUsernameChange,
  onFriendlySubmit,
  onRandomSubmit,
  onLeaderboardSubmit,
}) => {
  return (
    <form>
      <h3>Chess Game</h3>

      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter username"
          onChange={(e) => onUsernameChange(e.target.value)}
        />
      </div>

      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
        </div>
      </div>

      <div>
        <button
          onClick={onFriendlySubmit}
          type="submit"
          className="btn btn-primary btn-block"
        >
          Friendly
        </button>

        <button
          onClick={onRandomSubmit}
          type="submit"
          className="btn btn-primary btn-block"
        >
          Random
        </button>

        <button
          onClick={onLeaderboardSubmit}
          type="submit"
          className="btn btn-primary btn-block"
        >
          Leaderboard
        </button>
      </div>
    </form>
  );
};

export default Login;
