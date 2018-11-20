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

import modal from "../../../utils/modal";

import TypingBlock from "./TypingBlock/index";
import QueryBlock from "./QueryBlock/index";
import ExerciseMenu from "./ExerciseMenu";
import VocabularyDetails from "./VocabularyDetails"
import VocabularyLoader from "./VocabularyLoader"
import InteractiveEditor from "./../InteractiveEditor"
import OptionBlock from "./OptionBlock"
import ProgressBar from "../../ProgressBar";

import {closeCreator, updateExerciseOptions} from "./vocabularyExerciseActions";

import "./style.css";

class Exercise extends React.Component {

    render() {

        let editorStyle = {
            maxWidth: '95%'
            ,maxHeight: '95%'
        };

        const {optionInputType} = this.props;
        return (
            <div className="exercise-container">
                <ExerciseMenu />
                <ProgressBar currentLevel={this.props.level} progressPercentage={this.props.levelProgress}/>
                <QueryBlock/>
                {optionInputType === 'typing' && <TypingBlock/>}
                {optionInputType === 'options' && <OptionBlock />}
                { this.props.showDetails && modal(VocabularyDetails)}
                { this.props.showLoader && modal(VocabularyLoader)}
                { this.props.showCreator && modal(InteractiveEditor, ()=>this.props.closeCreator(), null, {content: editorStyle})}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        optionInputType: state.vocabularyExercise.optionInputType,
        showDetails: state.vocabularyExercise.showDetails,
        showLoader: state.vocabularyExercise.showLoader,
        showCreator: state.vocabularyExercise.showCreator,
        level: state.vocabularyExercise.level,
        levelProgress: state.vocabularyExercise.levelProgress,
    };
}

export default connect(mapStateToProps, {updateExerciseOptions, closeCreator})(Exercise);