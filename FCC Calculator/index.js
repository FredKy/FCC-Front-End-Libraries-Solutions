const SYMBOLS = [
  { s: "AC", id: "clear" },
  { s: "<", id: "remove" },
  { s: "π", id: "pi" },
  { s: "/", id: "divide" },
  { s: "7", id: "seven" },
  { s: "8", id: "eight" },
  { s: "9", id: "nine" },
  { s: "x", id: "multiply" },
  { s: "4", id: "four" },
  { s: "5", id: "five" },
  { s: "6", id: "six" },
  { s: "-", id: "subtract" },
  { s: "1", id: "one" },
  { s: "2", id: "two" },
  { s: "3", id: "three" },
  { s: "+", id: "add" },
  { s: "0", id: "zero" },
  { s: ".", id: "decimal" },
  { s: "=", id: "equals" },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: "0",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    function evaluteExpression(e) {
      const operator_symbols = ["+", "-", "/", "x"];
      var numbers = e.split(/[+\-x/]/);
      const operators = [];
      e.split("").forEach((element) => {
        if (operator_symbols.includes(element)) {
          operators.push(element);
        }
      });

      var rev_numbers = [...numbers].reverse();
      var rev_operators = [...operators].reverse();

      //Filter out redundant operators, and change sign of positive numbers if they're preceded by at least 2 operators
      //and the group of operators ends with a minus sign, i.e. "++/-".

      var new_numbers = [];
      var new_operators = [];
      for (var i = 0; i < rev_numbers.length; i++) {
        if (rev_numbers[i] !== "") {
          console.log(i);
          console.log(new_numbers);
          new_numbers.unshift(rev_numbers[i]);
          console.log(new_numbers);
          if (rev_operators[i] !== "-") {
            new_operators.unshift(rev_operators[i]);
          } else {
            if (rev_numbers[i + 1] === "") {
              console.log(new_numbers);
              new_numbers[0] = "-" + new_numbers[0];
              new_operators.unshift(rev_operators[i + 1]);
            } else {
              new_operators.unshift(rev_operators[i]);
            }
          }
        }
      }
      new_operators.shift();

      //Evalute preprocessed expression from left to right, no operators take precedence over others.

      new_operators.forEach((op) => {
        var t1 = parseFloat(new_numbers.shift());
        var t2 = parseFloat(new_numbers.shift());
        switch (op) {
          case "+":
            new_numbers.unshift(t1 + t2);
            break;
          case "-":
            new_numbers.unshift(t1 - t2);
            break;
          case "/":
            new_numbers.unshift(t1 / t2);
            break;
          case "x":
            new_numbers.unshift(t1 * t2);
            break;
          default:
        }
      });
      return new_numbers.toString();
    }

    console.log(event.target);
    const id = event.target.id;
    const s = event.target.innerHTML;
    switch (id) {
      case "clear":
        this.setState({
          expression: "0",
        });
        break;
      case "remove":
        if (this.state.expression !== "0") {
          this.setState(function (state) {
            const tmp = state.expression;
            if (tmp.length === 1) {
              return { expression: "0" };
            }
            return { expression: tmp.substring(0, tmp.length - 1) };
          });
        }
        break;
      case "decimal":
        const temp = this.state.expression;
        const numbers = temp.split(/[+\-x/]/);
        function count(str, find) {
          return str.split(find).length - 1;
        }
        if (count(numbers.pop(), ".") < 1 && temp !== "0") {
          this.setState((state) => ({
            expression: state.expression + s,
          }));
        }
        break;
      //Random Pi approximation.
      case "pi":
        if (this.state.expression === "0") {
          var pi = [
            "22/7",
            "333/106",
            "355/113",
            "103993/33102",
            "104348/33215",
          ][Math.floor(Math.random() * 5)];
          this.setState({
            expression: pi,
          });
          break;
        }
        this.setState((state) => ({
          expression: state.expression + "3",
        }));
        break;
      case "add":
      case "subtract":
      case "multiply":
      case "divide":
        this.setState((state) => ({
          expression: state.expression + s,
        }));
        break;
      case "equals":
        const tempor = this.state.expression;
        const lst =
          tempor.length > 1
            ? tempor.substring(tempor.length - 1, tempor.length)
            : tempor;
        if (
          lst !== "0" &&
          lst !== "+" &&
          lst !== "-" &&
          lst !== "/" &&
          lst !== "x"
        ) {
          const answer = evaluteExpression(this.state.expression);
          this.setState({ expression: answer });
        }
        break;
      default:
        if (this.state.expression === "0") {
          this.setState({
            expression: s,
          });
          break;
        }
        this.setState((state) => ({
          expression: state.expression + s,
        }));
    }
  }

  render() {
    return (
      <div className={"box-wrapper"}>
        <Display expression={this.state.expression} />
        <Buttons handleClick={this.handleClick} />
      </div>
    );
  }
}

const Buttons = (props) => {
  const rows = [];
  for (let i = 0; i < 19; i++) {
    if (i !== -1) {
      rows.push(
        <button
          key={SYMBOLS[i].id}
          id={SYMBOLS[i].id}
          className={"btn btn-primary btn-style grid-item-" + (i + 1)}
          onClick={props.handleClick}
        >
          {SYMBOLS[i].s}
        </button>
      );
    }
  }

  return <div className={"grid-container grid-layout"}>{rows}</div>;
};

const Display = (props) => {
  return (
    <div id="display">
      <span id="display-text">{props.expression}</span>
    </div>
  );
};

/* ReactDOM.render(<App />, document.getElementById("root")); */

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
