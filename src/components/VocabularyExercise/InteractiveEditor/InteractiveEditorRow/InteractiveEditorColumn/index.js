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
import './style.css'
import connect from "react-redux/es/connect/connect";
import {moveRow, updateColumnValue} from "../../reducer/interactiveEditorActions";
import {INTERACTIVE_TYPE_AUDIO, INTERACTIVE_TYPE_IMAGE, INTERACTIVE_TYPE_TEXT} from "../../reducer/types";

class InteractiveEditorColumn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columnTypeSelected: INTERACTIVE_TYPE_TEXT
        };
    }

    onColumnTypeClick = (type) => {
        this.setState({
            columnTypeSelected: type
        });
    }

    render() {

        const {colIndex, rowIndex} = this.props;

        let col = colIndex === 0 ? 'left' : 'right';

        return (
            <div className='interactive-editor-row-column'>
                <input onChange={(e) => {this.props.updateColumnValue(rowIndex, col, this.state.columnTypeSelected, e.target.value)}} type='text' placeholder="url..." value={this.props.pairs[rowIndex][col][this.state.columnTypeSelected]} />
                <i onClick={() => this.onColumnTypeClick(INTERACTIVE_TYPE_AUDIO)} className={`${this.state.columnTypeSelected === INTERACTIVE_TYPE_AUDIO && "selected"} fa fa-music`} />
                <i onClick={() => this.onColumnTypeClick(INTERACTIVE_TYPE_IMAGE)} className={`${this.state.columnTypeSelected === INTERACTIVE_TYPE_IMAGE && "selected"} fa fa-picture-o`} />
                <i onClick={() => this.onColumnTypeClick(INTERACTIVE_TYPE_TEXT)} className={`${this.state.columnTypeSelected === INTERACTIVE_TYPE_TEXT && "selected"} fa fa-file-text`} />
                <i className="fas fa-globe" />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {pairs: state.interactiveEditor.pairs}
};

export default connect(mapStateToProps,{moveRow, updateColumnValue})(InteractiveEditorColumn);