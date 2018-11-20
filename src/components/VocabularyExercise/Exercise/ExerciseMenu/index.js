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

import ExerciseMenuBarButtonGroup from "./ExerciseMenuBarButtonGroup/index";

import './style.css'
import {showCreator, showDetails, showLoader, updateExerciseOptions} from "../vocabularyExerciseActions";


class ExerciseMenu extends React.Component {

    render() {

        const {optionInputType, queryType, queryColumn, optionsType, optionsColumn} = this.props;

        const leftRight = ["left", "right"];
        const optionsTyping = ["options", "typing"];
        const audioImageText = ["audio", "image", "text"];
        const imageText = ["image", "text"];

        const queryTypeChanged = (value) => this.props.updateExerciseOptions({queryType:value});
        const queryColumnChanged = (value) => this.props.updateExerciseOptions({queryColumn:value});
        const optionsTypeChanged = (value) => this.props.updateExerciseOptions({optionsType:value});
        const optionsColumnChanged = (value) => this.props.updateExerciseOptions({optionsColumn:value});
        const optionInputTypeChanged = (value) => this.props.updateExerciseOptions({optionInputType:value});

        return (
            <div style={{minWidth:'250px'}}>
                <div className="exercise-menu">
                    <ExerciseMenuBarButtonGroup handler={queryTypeChanged} values={audioImageText} checked={audioImageText.indexOf(queryType)} buttonTypeClass={"btn-warning"} icons={["fa fa-music", "fa fa-picture-o", "fa fa-file-text"]} />
                    &nbsp;
                    <ExerciseMenuBarButtonGroup handler={queryColumnChanged} values={leftRight} checked={leftRight.indexOf(queryColumn)} buttonTypeClass={"btn-warning"} icons={["fa fa-align-left", "fa fa-align-right"]} />
                    &nbsp;
                    <ExerciseMenuBarButtonGroup handler={optionsTypeChanged} values={imageText} checked={imageText.indexOf(optionsType)} buttonTypeClass={"btn-primary"} icons={["fa fa-picture-o", "fa fa-file-text"]} />
                    &nbsp;
                    <ExerciseMenuBarButtonGroup handler={optionsColumnChanged} values={leftRight} checked={leftRight.indexOf(optionsColumn)} buttonTypeClass={"btn-primary"} icons={["fa fa-align-left", "fa fa-align-right"]} />
                    &nbsp;
                    <ExerciseMenuBarButtonGroup handler={optionInputTypeChanged} values={optionsTyping} checked={optionsTyping.indexOf(optionInputType)} buttonTypeClass={"btn-info"} icons={["fa fa-bars", "fa fa-keyboard-o"]} />
                </div>

                <div className="exercise-menu">
                    <button onClick={this.props.showDetails} type="button" className="btn btn-danger">
                        <i className="fa fa-sitemap"></i>
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={this.props.showLoader} type="button" className="btn btn-success">
                        <i className="fa fa-folder-open"></i>
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={this.props.showCreator} type="button" className="btn btn-success">
                        <i className="fa fa-pencil-square-o"></i>
                    </button>
                </div>
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
        showDetails: state.vocabularyExercise.showDetails,
        pairIndexes: state.vocabularyExercise.pairIndexes,
        exerciseProgress: state.vocabularyExercise.exerciseProgress
    };
}

export default connect(mapStateToProps, {updateExerciseOptions, showDetails, showLoader, showCreator})(ExerciseMenu);