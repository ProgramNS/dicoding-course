import React from "react";
import { createRoot } from "react-dom/client";

class CounterApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0
        };

        this.onIncreaseEventHandle = this.onIncreaseEventHandle.bind(this);
        this.onResetEventHanlde = this.onResetEventHanlde.bind(this);
    }

    onIncreaseEventHandle() {
        this.setState((previousState) => {
            return {
                count: previousState.count + 1
            };
        });
    };

    onResetEventHanlde() {
        this.setState(() => {
            return {
                count: 0
            }
        })
    }


    render() {
        return (
            <div>
                <IncreaseButton increase={this.onIncreaseEventHandle}></IncreaseButton>
                <CounterDisplay count={this.state.count}></CounterDisplay>
                <ResetButton reset={this.onResetEventHanlde}></ResetButton>
            </div>
        );
    }
}

function CounterDisplay({count}){
    if(count === 0 ){
        return <p>{count}</p>;
    }

    if(count % 5 === 0 && count % 7 === 0){
        return <p>FizzBuzz</p>
    }

    if(count % 5 === 0){
        return <p>Fizz</p>
    }

    if(count % 7 === 0 ){
        return <p>Buzz</p>
    }

    return <p>{count}</p>
}

function IncreaseButton({increase}){
    return (
        <div><button onClick={increase}>+ increase</button></div>
    );
}

function ResetButton({reset}){
    return (
        <div><button onClick={reset}>- reset</button></div>
    );
}


const root = createRoot(document.getElementById('root'));
root.render(<CounterApp />);