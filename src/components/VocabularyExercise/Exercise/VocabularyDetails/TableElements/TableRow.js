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

import TableCell from './TableCell'

import '../../style.css'
import {toggleVocabularyPair} from "../../vocabularyExerciseActions";

class TableRow extends React.Component {

    constructor() {
        super();
        this.trClicked = this.trClicked.bind(this);
    }

    trClicked() {
        this.props.toggleVocabularyPair(this.props.rowIndex);
    }

    render() {
        const {vocPair, pairIndexes} = this.props;
        let selected = pairIndexes.indexOf(this.props.rowIndex) !== -1;
        return (
            <tr onClick={this.trClicked} className={selected ? "vocabularyDetailsRow" : undefined}>
                <TableCell cellContent={vocPair.left} />
                <TableCell cellContent={vocPair.right} />
            </tr>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pairIndexes: state.vocabularyExercise.pairIndexes,
    };
}

export default connect(mapStateToProps, {toggleVocabularyPair})(TableRow);