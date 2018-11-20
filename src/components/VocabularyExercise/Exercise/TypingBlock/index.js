/*
 * Copyright 2018 André Schepers
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";

import "./style.css"
import {connect} from "react-redux";
import {setNewQueryIndex} from "../vocabularyExerciseActions";

class TypingBlock extends React.Component {

    domInput;

    constructor(props) {
        super(props);

        this.state = {inputValue: ''};

        this.inputOnChange = this.inputOnChange.bind(this);
        this.focusInput = this.focusInput.bind(this);
        this.checkWord = this.checkWord.bind(this);
        this.getLetterRowsArray = this.getLetterRowsArray.bind(this);
        this.getLettersArray = this.getLettersArray.bind(this);
    }

    checkWord() {
        var inputText = this.props.loadedVocabulary.pairs[this.props.queryIndex][this.props.optionsColumn].text.replace(/\s/g, '');

        if (inputText !== this.state.inputValue) return;

        this.setState({inputValue: ''});

        var copyArray = this.props.pairIndexes.slice();
        var index = copyArray.indexOf(parseInt(this.props.queryIndex, 10));
        if (index > -1) {
            copyArray.splice(index, 1);
            var newQueryIndex = copyArray[Math.floor(Math.random()*copyArray.length)];
            this.props.setNewQueryIndex(newQueryIndex);
        }
    }

    componentDidUpdate() {
        this.checkWord();
    }

    componentDidMount() {
        this.domInput.focus();
        this.domInput.click();
    }

    inputOnChange(e) {
        this.setState({inputValue : e.target.value.replace(/\s/g, '')});
    }

    focusInput() {
        this.domInput.focus();
        this.domInput.click();
    }

    render() {

        let inputText = this.props.loadedVocabulary.pairs[this.props.queryIndex][this.props.optionsColumn].text;

        var letterRows = this.getLetterRowsArray(inputText);

        return (
            <div style={{textAlign:"center"}}
                 onTouchEnd={this.focusInput}
                 onClick={this.focusInput}>
                <div style={{marginLeft:"auto", marginRight:"auto"}}>
                    {letterRows}
                </div>
                <br/>
                <br/>
                <input className="invisibleInput"
                       maxLength={inputText.length}
                       ref={input => this.domInput = input}
                       onChange={this.inputOnChange}
                       value={this.state.inputValue} />
            </div>
        )
    }

    getLetterRowsArray(inputText) {
        if (inputText.length <= 16) return this.getLettersArray(inputText, 0);
        var remainder = inputText;
        var indexCounter = 0;
        var array = [];
        var offset = 0;
        while (remainder.length > 0) {
            if (remainder.length <= 16) {
                array.push(<div key={indexCounter}>{this.getLettersArray(remainder, offset)}</div>);
                break;
            }
            var firstPart = remainder.slice(0, 16);
            var lastSpaceIndex = firstPart.lastIndexOf(' ');
            firstPart = firstPart.slice(0, lastSpaceIndex);
            array.push(<div key={indexCounter++}>{this.getLettersArray(firstPart, offset)}</div>);
            offset += firstPart.replace(/\s/g, '').length;
            remainder = remainder.slice(firstPart.length+1, remainder.length);
        }
        return array;
    }

    getLettersArray(inputText, offset) {
        var letters = [];
        if (inputText && inputText !== null) {
            var letterIndex = 0+offset;
            [...inputText].forEach(function (elem, index) {
                if (!elem.replace(/\s/g, '').length) {
                    letters.push(<span key={index} className="space"> </span>)
                } else {
                    letters.push(<div key={index} className="letterDiv">{this.state.inputValue[letterIndex]}</div>)
                    letterIndex++;
                }
            }.bind(this));
        }
        return letters;
    }
}

const mapStateToProps = (state) => {
    return {
        queryType: state.vocabularyExercise.queryType,
        queryColumn: state.vocabularyExercise.queryColumn,
        optionsType: state.vocabularyExercise.optionsType,
        optionsColumn: state.vocabularyExercise.optionsColumn,
        loadedVocabulary: state.vocabularyExercise.loadedVocabulary,
        showDetails: state.vocabularyExercise.showDetails,
        pairIndexes: state.vocabularyExercise.pairIndexes,
        queryIndex: state.vocabularyExercise.queryIndex
    };
}

export default connect(mapStateToProps, {setNewQueryIndex})(TypingBlock);