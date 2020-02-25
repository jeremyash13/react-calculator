import React from "react";

import Display from "./components/Display";

import "typeface-montserrat";
import "./App.css";
import Button from "./components/Button";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: "",
      miniDisplayValue: "",
      allowedKeys: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "/",
        "*",
        "-",
        "+",
        ".",
        "Backspace",
        "back",
        "Enter",
        "ce",
        "="
      ]
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", e => {
      this.handleDisplay(e);
    });
    document.querySelector(".App").addEventListener("click", e => {
      this.handleDisplay(e);
    });
  }

  handleDisplay = e => {
    // e.preventDefault to bypass firefox's quickfind feature on "/" keypress
    e.preventDefault();

    // clear display on input if an error is present on the display.
    if (this.state.displayValue === "Invalid expression") {
      this.setDisplay("", "ce");
    }

    // assign "key" to value of either keypress or a Button's value attribute.
    const key = e.key || e.target.value;

    //Logic for "keydown" & "click" events
    if (key && this.state.allowedKeys.includes(key.toString())) {
      if (key === "Enter" || key === "=") {
        try {
          // evaluate the expression
          // eslint-disable-next-line
          const answer = eval(this.state.displayValue);
          this.setDisplay(answer, "=");
        } catch {
          // display error if the expression cannot be evaluated
          this.setState({
            displayValue: "Invalid expression"
          });
        }
      } else if (key === "Backspace" || key === "back") {
        this.setDisplay(key, "-");
      } else if (key === "ce") {
        this.setDisplay(key, "ce");
      } else {
        this.setDisplay(key, "+");
      }
    }
  };

  setDisplay = (value, delta) => {
    // setDisplay updates the state of the expression display.
    // the value arg should be what value to update the display with.
    // the delta arg can be: +, -, =, ce. this tells setDisplay to:
    // (+) add to display, (-) subtract from display,
    // (=) display calculated expression, (ce) clear the display.

    if (delta === "+") {
      // add character to the expression
      this.setState(prevState => {
        return {
          displayValue: (prevState.displayValue += value)
        };
      });
    } else if (delta === "=") {
      // calculate the expression
      this.setState({
        displayValue: value.toString()
      });
    } else if (delta === "-") {
      // remove last character from the expression
      const slicedValue = this.state.displayValue.slice(0, -1);
      this.setState({
        displayValue: slicedValue.toString()
      });
    } else if (delta === "ce") {
      // clear the expression
      this.setState({
        displayValue: ""
      });
    }
  };

  render() {
    return (
      <div className="App wrapper flex-col">
        <Display displayValue={this.state.displayValue} miniDisplayValue={this.state.miniDisplayValue} />
        <Button id="clear" value="ce">
          CE
        </Button>
        <Button id="back" value="back">
          BACK
        </Button>
        <Button id="seven" value="7">
          7
        </Button>
        <Button id="eight" value="8">
          8
        </Button>
        <Button id="nine" value="9">
          9
        </Button>
        <Button id="divide" value="/">
          ÷
        </Button>
        <Button id="four" value="4">
          4
        </Button>
        <Button id="five" value="5">
          5
        </Button>
        <Button id="six" value="6">
          6
        </Button>
        <Button id="multiply" value="*">
          ×
        </Button>
        <Button id="one" value="1">
          1
        </Button>
        <Button id="two" value="2">
          2
        </Button>
        <Button id="three" value="3">
          3
        </Button>
        <Button id="subtract" value="-">
          -
        </Button>
        <Button id="enter" value="=">
          =
        </Button>
        <Button id="zero" value="0">
          0
        </Button>
        <Button id="decimal" value=".">
          .
        </Button>
        <Button id="add" value="+">
          +
        </Button>
      </div>
    );
  }
}
