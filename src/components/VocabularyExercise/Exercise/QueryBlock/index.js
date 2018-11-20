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

import './style.css'

class QueryBlock extends React.Component {

    constructor() {
        super();
        this.playAudio = this.playAudio.bind(this);
    }

    playAudio(query) {
        this.audio = new Audio(query);
        this.audio.play();
    }

    isPairsEmpty(pairs, queryIndex, queryColumn) {
        return typeof pairs === 'undefined' ||
            typeof pairs[queryIndex] === 'undefined' ||
            typeof pairs[queryIndex][queryColumn] === 'undefined';
    }

    render() {
        var queryType = this.props.queryType;
        var image = queryType === "image";
        var text = queryType === "text";
        var audio = queryType === "audio";

        var queryIndex = this.props.queryIndex;
        var queryColumn = this.props.queryColumn;
        var query = '';
        if (!this.isPairsEmpty(this.props.loadedVocabulary.pairs, queryIndex, queryColumn)) {
            query = this.props.loadedVocabulary.pairs[queryIndex][queryColumn][queryType];
        }
        if (audio) {
            this.playAudio(query);
        }

        return (
            <div className="exercise_query">
                {text && <span className="exercise_query_text">{query}</span>}
                {image && <img src={query} alt=""/>}
                {audio && <button onClick={this.playAudio} type="button" className="btn btn-primary">
                              <i className="fa fa-music" aria-hidden="true"></i>
                          </button>
                }
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
        loadedVocabulary: state.vocabularyExercise.loadedVocabulary,
        showDetails: state.vocabularyExercise.showDetails,
        queryIndex: state.vocabularyExercise.queryIndex,
        pairIndexes: state.vocabularyExercise.pairIndexes
    };
}

export default connect(mapStateToProps)(QueryBlock);