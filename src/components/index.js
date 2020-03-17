import React from "react";
import './style.css';
import Number from "./nubmer";

class Calculate extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            numbers: ['7','8','9','4','5','6','1','2','3','0','00'],
            operators: ['/','*','<','+','-'],
            result : '0',
        }
    }
    addSymbol = (e) =>{
        let valueSymbol = e.target.value;
        console.log(valueSymbol+' valueSymbol');
        console.log(this.state.result+' this.state.result');
        if((valueSymbol === '0' || valueSymbol === '00') && this.state.result === '0'){
                valueSymbol = '0';
        }else{
            if(this.state.result === '0'){
                valueSymbol = e.target.value;
            }else{
                valueSymbol = this.state.result  + e.target.value;
            }
        }
        this.setState({
            result: valueSymbol,
        });

    }

    addDot = (e) =>{
        let valueSymbol = e.target.value;
        let lastElement = 1;
        let allResultLastElement = this.state.result.split('');
        this.state.operators.forEach((arrayElement) => {
            if(allResultLastElement[allResultLastElement.length - 1] === arrayElement ){
                return lastElement = 0;
            }
        });


        if(this.state.result.length < 2){
            valueSymbol = '0' + e.target.value;
        }else if(lastElement === 0){
            valueSymbol = this.state.result + '0' + e.target.value;
        }else{
            valueSymbol = this.state.result  + e.target.value;
            let allResult = this.state.result.split('+').join(',').split('-').join(',').split('/').join(',').split('*').join(',').split(',');

            let lastElement = allResult[allResult.length - 1].split('.');
            if(lastElement.length>1){
                valueSymbol = this.state.result;
            }else {
                valueSymbol = this.state.result + e.target.value;
            }
        }

        this.setState({
            result: valueSymbol,
        });

    }

    addOperators = (e) =>{
        let valueSymbol = this.state.result + e.target.value;
        let allResultLastElement = this.state.result.split('');
        console.log(allResultLastElement+' allResultLastElement');

        this.state.operators.forEach((arrayElement) => {
            if(allResultLastElement[allResultLastElement.length - 1] === arrayElement ){
                return valueSymbol = this.state.result.substring(0, this.state.result.length - 1) + e.target.value;
            }
        });

        this.setState({
            result:valueSymbol,
        });
    }

    clearResult = () =>{
        this.setState({
            result: '0',
        });
    }

    showResult = (e) =>{
        // alert(e.target.value);
        let result = eval(this.state.result);
        this.setState({
            result: result
        });
    }

    render(){
        const {result, numbers, operators} = this.state;
        return(
            <div className="calc_wrap">
                <div className="calc_wr">
                    <div className="container">
                        <div className="view_wr">
                            <input type="text" className="view" value={result}/>
                        </div>
                        <div className="calc_cont">
                            <div className="keyboard">
                                {
                                    numbers.map((arrayElement) => (
                                        <Number buttonClick={this.addSymbol} className={'keyboard-key'} key={arrayElement} value={arrayElement} />
                                    ))
                                }
                                <Number buttonClick={this.addDot} className={'keyboard-key'} value="." />
                            </div>

                            <div className="keyboard_soft">
                                <Number buttonClick={this.clearResult} className={'keyboard-key soft'} value="C" />
                                {
                                    operators.map((arrayElement) => (
                                        <Number buttonClick={this.addOperators} className={'keyboard-key soft'} key={arrayElement} value={arrayElement} />
                                    ))
                                }

                                <Number buttonClick={this.showResult} className={'keyboard-key soft'} value="=" />
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Calculate;