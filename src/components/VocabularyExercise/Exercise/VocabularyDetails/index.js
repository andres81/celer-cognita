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

import React from "react";
import {connect} from "react-redux";

import TableRow from "./TableElements/TableRow";

import {closeDetails} from "../vocabularyExerciseActions";

import './style.css'

class VocabularyDetails extends React.Component {

    render() {
        let vocabularyPairs = [];
        this.props.loadedVocabulary.pairs.forEach(function(elem, index) {
            vocabularyPairs.push(<TableRow key={index} rowIndex={index} vocPair={elem} />);
        })

        return (
            <div>
                <span onClick={this.props.closeDetails} className="vocabulary-details-modal-close-button">
                    <i className="fa fa-times-circle"></i>
                </span>
                <table className="table table-striped vocabulary-details-table">
                    <tbody>
                        {vocabularyPairs}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        queryType: state.vocabularyExercise.queryType,
        queryColumn: state.vocabularyExercise.queryColumn,
        optionsType: state.vocabularyExercise.optionsType,
        optionsColumn: state.vocabularyExercise.optionsColumn,
        optionInputType: state.vocabularyExercise.optionInputType,
        loadedVocabulary: state.vocabularyExercise.loadedVocabulary,
        pairIndexes: state.vocabularyExercise.pairIndexes
    };
}

export default connect(mapStateToProps, {closeDetails})(VocabularyDetails);