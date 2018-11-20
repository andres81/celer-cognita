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
import {SortableHandle} from 'react-sortable-hoc';
import './style.css'
import InteractiveEditorColumn from "./InteractiveEditorColumn";
import connect from "react-redux/es/connect/connect";
import {deleteRow} from "../reducer/interactiveEditorActions";

const DragHandle = SortableHandle(() => <i className="interactive-editor-row-handle fas fa-bars"></i>); // This can be any component you want

class InteractiveEditorRow extends React.Component {

    onDeleteRowClick = () => {
        this.props.deleteRow(this.props.index);
    }

    render() {

        const {index} = this.props;

        return (
            <div className='interactive-editor-row'>
                <DragHandle />
                <i onClick={this.onDeleteRowClick} className="interactive-editor-row-close-button fa fa-times" />
                <InteractiveEditorColumn rowIndex={index} colIndex={0}/>
                <InteractiveEditorColumn rowIndex={index} colIndex={1}/>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {}
}

export default connect(mapStateToProps, {deleteRow})(InteractiveEditorRow);