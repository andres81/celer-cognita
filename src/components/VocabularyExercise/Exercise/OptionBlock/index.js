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

import React from 'react'
import {connect} from 'react-redux'

import "./optionblock.css";
import {optionChosen, setNewQueryIndex} from "../vocabularyExerciseActions";

class OptionBlock extends React.Component {

    constructor() {
        super();
        this.getTextOptions = this.getTextOptions.bind(this);
        this.getImageOptions = this.getImageOptions.bind(this);
        this.optionClicked = this.optionClicked.bind(this);
    }

    optionClicked(e) {
        var optionIndex = e.target.getAttribute('data-uid');
        this.props.optionChosen(optionIndex);
    }

    render() {
        let options;
        switch(this.props.optionsType) {
            case 'image':
                options = this.getImageOptions();
                break;
            case 'text':
            default:
                options = this.getTextOptions();
        }
        return (
            <div className="row exercise_options">
                {options}
            </div>
        )
    }

    getTextOptions() {
        var options = [];
        var vocabulary = this.props.loadedVocabulary;
        var vocSize = vocabulary.pairs.length;
        this.props.pairIndexes.forEach(
            function(elem, index) {
                if (vocSize <= index) return options;
                var option = this.props.loadedVocabulary.pairs[elem][this.props.optionsColumn];
                options.push(
                    <div key={index} className={"col-sm-12"}>
                        <div>
                            <button onClick={this.optionClicked} data-uid={elem} type="button" className="btn btn-primary exercise_option_button">{option.text}</button>
                        </div>
                    </div>
                );
            }.bind(this)
        );
        return options;
    }

    getImageOptions() {
        var options = this.props.loadedVocabulary.pairs;
        var pairIndexes = this.props.pairIndexes;
        var nofOptions = pairIndexes.length;
        var optionsHtml = [];
        if (nofOptions === 0) return optionsHtml;
        var unEven = !!(nofOptions%2);
        optionsHtml.push(
            <table className="imageOptionsTable" key={1}>
                <tbody>
                    {(nofOptions>=2) && <tr>
                        <td>
                            <img onClick={this.optionClicked} data-uid={pairIndexes[0]} src={options[pairIndexes[0]][this.props.optionsColumn].image} alt="" />
                        </td>
                        <td>
                            <img onClick={this.optionClicked} data-uid={pairIndexes[1]} src={options[pairIndexes[1]][this.props.optionsColumn].image} alt="" />
                        </td>
                    </tr>}
                    {(nofOptions>=4) && <tr>
                        <td>
                            <img onClick={this.optionClicked} data-uid={pairIndexes[2]} src={options[pairIndexes[2]][this.props.optionsColumn].image} alt="" />
                        </td>
                        <td>
                            <img onClick={this.optionClicked} data-uid={pairIndexes[3]} src={options[pairIndexes[3]][this.props.optionsColumn].image} alt="" />
                        </td>
                    </tr>}
                    {unEven && <tr>
                        <td colSpan={2}>
                            <img onClick={this.optionClicked} data-uid={pairIndexes[nofOptions-1]} src={options[pairIndexes[nofOptions-1]][this.props.optionsColumn].image} alt="" />
                        </td>
                    </tr>}
                </tbody>
            </table>
        );
        return optionsHtml;
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

export default connect(mapStateToProps, {setNewQueryIndex, optionChosen})(OptionBlock);