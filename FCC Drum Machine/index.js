const AUDIO_FILES = [
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
];
const SAMPLE_IDS = [
  "HEATER-1",
  "HEATER-2",
  "HEATER-3",
  "HEATER-4",
  "CLAP",
  "OHH",
  "KICK-HAT",
  "KICK",
  "CHH",
];

const LETTERS = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playingSound: false };
    this.triggerSample = this.triggerSample.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(event) {
    const letter = event.key.toUpperCase();
    const audioTag = document.getElementById(letter);
    if (LETTERS.includes(letter)) {
      document.getElementById("display-text").innerHTML =
        SAMPLE_IDS[LETTERS.indexOf(letter)];
      audioTag.pause();
      audioTag.currentTime = 0;
      audioTag.play();
    } else {
      document.getElementById("display-text").innerHTML = ".....";
    }
  }

  triggerSample(event) {
    const buttonID = event.target.id;
    document.getElementById("display-text").innerHTML = buttonID;
    const audioTag = document.getElementById(
      LETTERS[SAMPLE_IDS.indexOf(buttonID)]
    );
    audioTag.pause();
    audioTag.currentTime = 0;
    audioTag.play();
  }

  render() {
    return (
      <div id="drum-machine" className={"box-wrapper"}>
        <div className={"grid-container"}>
          <Buttons triggerSample={this.triggerSample} />
        </div>
        <div className={"right-container"}>
          <Display />
        </div>
      </div>
    );
  }
}

const Buttons = (props) => {
  const rows = [];
  for (let i = 0; i < 9; i++) {
    rows.push(
      <button
        key={SAMPLE_IDS[i]}
        id={SAMPLE_IDS[i]}
        className={"btn btn-primary drum-pad"}
        onClick={props.triggerSample}
      >
        <audio className={"clip"} id={LETTERS[i]} src={AUDIO_FILES[i]} />
        {LETTERS[i]}
      </button>
    );
  }

  return <div>{rows}</div>;
};

const Display = () => {
  return (
    <div id="display">
      <span id="display-text">.....</span>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
