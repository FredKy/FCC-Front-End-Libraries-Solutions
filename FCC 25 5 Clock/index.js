
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerLabel: "Session",
      sessionTimer: "25:00",
      timeRunning: false,
    };
    this.secondsLeft = 1500;
    this.timer = null;
    this.handleClick = this.handleClick.bind(this);
    this.checkTimer = this.checkTimer.bind(this);
  }

  checkTimer() {

    if (this.secondsLeft === 0) {
      clearInterval(this.timer);
      this.timer = null;
      const audioTag = document.getElementById("beep");
      audioTag.play();

      let timerLabel = this.state.timerLabel;
      if (timerLabel === "Session") {
        this.setState({
          ...this.state,
          timerLabel: "Break",
        });
        this.secondsLeft = this.state.breakLength * 60 + 1;
        this.timer = setInterval(() => {
          this.secondsLeft--;
          const seconds = this.secondsLeft % 60;
          const minutes = Math.floor((this.secondsLeft / 60) % 60);
          this.setState({
            ...this.state,
            sessionTimer:
              (minutes > 9 ? minutes : "0" + minutes) +
              ":" +
              (seconds > 9 ? seconds : "0" + seconds),
          });
        }, 1000);
      } else {
        this.setState({
          ...this.state,
          timerLabel: "Session",
        });
        this.secondsLeft = this.state.sessionLength * 60 + 1;
        this.timer = setInterval(() => {
          this.secondsLeft--;
          const seconds = this.secondsLeft % 60;
          const minutes = Math.floor((this.secondsLeft / 60) % 60);
          this.setState({
            ...this.state,
            sessionTimer:
              (minutes > 9 ? minutes : "0" + minutes) +
              ":" +
              (seconds > 9 ? seconds : "0" + seconds),
          });
        }, 1000);
      }
    }
  }

  handleClick(event) {
    const id = event.target.id;
    console.log(event.target);
    switch (id) {
      case "start_stop":
        if (this.timer === null) {
          this.setState({ ...this.state, timeRunning: true });
          this.timer = setInterval(() => {
            this.secondsLeft--;
            const seconds = this.secondsLeft % 60;
            const minutes = Math.floor((this.secondsLeft / 60) % 60);
            this.setState({
              ...this.state,
              sessionTimer:
                (minutes > 9 ? minutes : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds),
            });
          }, 1000);
        } else {
          clearInterval(this.timer);
          this.timer = null;
          this.setState({
            ...this.state,
            timeRunning: false,
          });
        }
        break;
      case "reset":
        clearInterval(this.timer);
        this.timer = null;
        const audioTag = document.getElementById("beep");
        audioTag.pause();
        audioTag.currentTime = 0;

        this.secondsLeft = 1500;
        this.setState({
          ...this.state,
          breakLength: 5,
          sessionLength: 25,
          sessionTimer: "25:00",
          timeRunning: false,
          timerLabel: "Session",
        });
        break;
      case "break-decrement":
        if (this.state.breakLength > 1) {
          var newLength = this.state.breakLength - 1;
          this.setState({ ...this.state, breakLength: newLength });
        }
        break;
      case "break-increment":
        if (this.state.breakLength < 60) {
          var newLength = this.state.breakLength + 1;
          this.setState({ ...this.state, breakLength: newLength });
        }
        break;
      case "session-decrement":
        if (this.state.sessionLength > 1) {
          this.secondsLeft = this.state.sessionLength * 60;
          var newLength = this.state.sessionLength - 1;
          this.secondsLeft -= 60;
          console.log(this.state.timeRunning);
          console.log(this.secondsLeft);

          let minutes = Math.floor((this.secondsLeft / 60) % 60);
          console.log(minutes);
          this.setState({
            ...this.state,
            sessionLength: newLength,
            sessionTimer: (minutes > 9 ? minutes : "0" + minutes) + ":00",
          });
        }
        break;
      case "session-increment":
        if (this.state.sessionLength < 60) {
          this.secondsLeft = this.state.sessionLength * 60;
          var newLength = this.state.sessionLength + 1;
          this.secondsLeft += 60;
          console.log(this.secondsLeft);
          let minutes;
          this.secondsLeft === 3600
            ? (minutes = 60)
            : (minutes = Math.floor((this.secondsLeft / 60) % 60));
          console.log(minutes);
          this.setState({
            ...this.state,
            sessionLength: newLength,
            sessionTimer: (minutes > 9 ? minutes : "0" + minutes) + ":00",
          });
        }
        break;
      default:
    }
  }

  render() {
    return (
      <div className={"wrapper"}>
        <div>
          <h1 className={"center-h"}>25 + 5 Clock</h1>
        </div>
        <UpperButtonsAndDisplays
          handleClick={this.handleClick}
          breakLength={this.state.breakLength}
          sessionLength={this.state.sessionLength}
        />
        <div className={"display-container"}>
          <LowerDisplay
            timerLabel={this.state.timerLabel}
            sessionTimer={this.state.sessionTimer}
            checkTimer={this.checkTimer}
          />
        </div>
        <StartStopResetButtons
          handleClick={this.handleClick}
          timeRunning={this.state.timeRunning}
        />
      </div>
    );
  }
}

const UpperButtonsAndDisplays = (props) => {
  return (
    <div className={"buttons-wrapper"}>
      <div className={"length-box"}>
        <p id="break-label" className={"center-h length-p"}>
          Break Length
        </p>
        <p id={"break-length"} className={"mini-display"}>
          {props.breakLength}
        </p>
        <div className={"horizontal-buttons center-h"}>
          <button
            id={"break-decrement"}
            className={"btn btn-primary btn-style"}
            onClick={props.handleClick}
          >
            {"▼"}
          </button>
          <button
            id={"break-increment"}
            className={"btn btn-primary btn-style"}
            onClick={props.handleClick}
          >
            {"▲"}
          </button>
        </div>
      </div>
      <div className={"length-box"}>
        <p id="session-label" className={"center-h length-p"}>
          Session Length
        </p>
        <p id={"session-length"} className={"mini-display"}>
          {props.sessionLength}
        </p>
        <div className={"horizontal-buttons center-h"}>
          <button
            id={"session-decrement"}
            className={"btn btn-primary btn-style"}
            onClick={props.handleClick}
          >
            {"▼"}
          </button>
          <button
            id={"session-increment"}
            className={"btn btn-primary btn-style"}
            onClick={props.handleClick}
          >
            {"▲"}
          </button>
        </div>
      </div>
    </div>
  );
};

const LowerDisplay = (props) => {
  return (
    <div id="display">
      <span id="timer-label">{props.timerLabel}</span>
      <span id="time-left" onChange={props.checkTimer()}>
        {props.sessionTimer}
        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
      </span>
    </div>
  );
};

const StartStopResetButtons = (props) => {
  let startStopButton;
  if (props.timeRunning) {
    startStopButton = (
      <button
        id="start_stop"
        className={"btn btn-primary lower-btn-style fa fa-pause fa-3x"}
        onClick={props.handleClick}
      ></button>
    );
  } else {
    startStopButton = (
      <button
        id="start_stop"
        className={"btn btn-primary lower-btn-style fa fa-play fa-3x"}
        onClick={props.handleClick}
      ></button>
    );
  }
  return (
    <div>
      <div className={"lower-buttons center-h"}>
        {startStopButton}
        <button
          id="reset"
          className={"btn btn-primary lower-btn-style"}
          onClick={props.handleClick}
        >
          {"↺"}
        </button>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
