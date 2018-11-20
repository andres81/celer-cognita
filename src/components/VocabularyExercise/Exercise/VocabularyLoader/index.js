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
import {closeLoader, setExercise, updateExerciseOptions} from "../vocabularyExerciseActions";

import JSONPretty from 'react-json-pretty';

import "./style.css"

class VocabularyLoader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            exerciseList: []
        }

        this.exerciseChosen = this.exerciseChosen.bind(this);
        this.readSingleFile = this.readSingleFile.bind(this);
    }

    exerciseChosen(e) {
        this.props.loadExercise(e.target.dataset["name"]);
    }

    readSingleFile(e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            var contents = e.target.result;
            try {
                let loadedVoc = JSON.parse(contents);
                this.props.setExercise(loadedVoc);
            } catch(e) {
                alert(e); // error in the above string (in this case, yes)!
                return;
            }
            this.props.closeLoader();
        }.bind(this);
        reader.readAsText(file);
    }

    render() {

        let jsonExmple = {"pairs":[{"left":{"image":"your url to an image","audio":"your url to an audio file","text":"yellow"},"right":{"image":"your url to an image","audio":"your url to an audio file","text":"geel"}},{"left":{"image":"your url to an image","audio":"your url to an audio file","text":"orange"},"right":{"image":"your url to an image","audio":"your url to an audio file","text":"oranje"}}]};

        return (
            <div>
                <span onClick={this.props.closeLoader} className="modal-close-button">
                    <i className="fa fa-times-circle"></i>
                </span>
                <h1>Load exercise</h1>
                <br/>
                <button type="button" className="btn btn-outline-primary">
                    <label className="custom-file-upload">
                        <input className="display-none" type="file" accept=".json" onChange={this.readSingleFile}/>
                        Filesystem <i className="fa fa-folder-open"></i>
                    </label>
                </button><br/>
                <br/>

                <div>
                    <h2>File format exercise files</h2>
                    <p>
                        Exercise files are json files with extension: ".json". The json has the following format, where each pair represents word in pair in a vocabulary:
                    </p>
                    <JSONPretty id="json-pretty" json={jsonExmple}></JSONPretty>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        optionInputType: state.vocabularyExercise.optionInputType,
        showDetails: state.vocabularyExercise.showDetails,
        showLoader: state.vocabularyExercise.showLoader
    };
}

export default connect(mapStateToProps, {updateExerciseOptions, closeLoader, setExercise})(VocabularyLoader);
