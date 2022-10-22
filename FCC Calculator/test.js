const n = "234-/x345-++678/435-234134";
const n2 = "3+5x6-2/4";

function evaluteExpression(e) {
  const operator_symbols = ["+", "-", "/", "x"];
  var numbers = e.split(/[+\-x/]/);
  const operators = [];
  e.split("").forEach((element) => {
    if (operator_symbols.includes(element)) {
      operators.push(element);
    }
  });
  //console.log(operators);
  //console.log(numbers);

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
  console.log(new_operators);
  new_operators.shift();

  //    234  -/x   345   -  '' + '' +   678  /  435   x '' -  234134

  console.log(rev_numbers);
  console.log(rev_operators);
  console.log(new_numbers);
  console.log(new_operators);

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

console.log(evaluteExpression(n));
