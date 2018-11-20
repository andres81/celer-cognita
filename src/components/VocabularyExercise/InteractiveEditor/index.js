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
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import InteractiveEditorRow from "./InteractiveEditorRow";
import './style.css'
import connect from "react-redux/es/connect/connect";
import {addRow, moveRow} from "./reducer/interactiveEditorActions";
import fileDownload from 'js-file-download';
import modal from "../../../utils/modal";
import StringPrompt from "../../StringPrompt";
import {modalStyle} from "../../StringPrompt/modal-style";

const SortableItem = SortableElement(({value, sortIndex}) =>
    <InteractiveEditorRow index={sortIndex} value={value}/>
);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} sortIndex={index} index={index} value={value} />
            ))}
        </ul>
    );
});

class InteractiveEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.props.moveRow(oldIndex, newIndex);
    };

    onAddRowClicked = () => {
        this.props.addRow();
    }

    onDownloadActiveVocabulary = () => {
        this.setState({showSaver: true});
    }

    closeSaver = (fileName) => {
        this.setState({showSaver: false});
        if (fileName && fileName !== null) {
            fileDownload(JSON.stringify(this.props.vocabulary), fileName);
        }
    }

    render() {

        let items = Array(this.props.pairs.length).fill(0);

        let promptProps = {
            title: "Save exercise"
            ,promptLabel: "File name:"
            ,saveCallback: this.closeSaver
            ,cancelCallback: this.closeSaver
        }

        return (
            <div className="editor-content-wrapper">
                <div className='interactive-editor'>
                    <div className='interactive-editor-context-menu'>
                        <span>
                            <i onClick={this.onAddRowClicked} className="interactive-editor-add-row fas fa-plus-circle" />
                            &nbsp;&nbsp;
                            <i onClick={this.onDownloadActiveVocabulary} className="interactive-editor-download fas fa-download" />
                        </span>
                    </div>
                    <SortableList items={items} onSortEnd={this.onSortEnd} lockToContainerEdges={true} lockAxis='y' useDragHandle={true} helperClass="sortable-item-helper" />
                    {this.state.showSaver && modal(StringPrompt, (fileName)=>this.props.closeSaver(fileName), promptProps, modalStyle)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pairs: state.interactiveEditor.pairs
        ,vocabulary: state.interactiveEditor
    }
};

export default connect(mapStateToProps,{moveRow, addRow})(InteractiveEditor);