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
import {INTERACTIVE_DELETE_ROW, INTERACTIVE_MOVE_ROW, INTERACTIVE_ADD_ROW, INTERACTIVE_UDPATE_COLUMN} from "./types";

export function moveRow(oldIndex, newIndex) {
    return dispatch => {
        dispatch({type:INTERACTIVE_MOVE_ROW, payload: {oldIndex: oldIndex, newIndex: newIndex}})
    }
}

export function deleteRow(rowIndex) {
    return dispatch => {
        dispatch({type: INTERACTIVE_DELETE_ROW, payload: {rowIndex: rowIndex}})
    }
}

export function addRow() {
    return dispatch => {
        dispatch({type:INTERACTIVE_ADD_ROW})
    }
}

export function updateColumnValue(rowIndex, colIndex, type, value) {
    return dispatch => {
        dispatch({type:INTERACTIVE_UDPATE_COLUMN, payload: {rowIndex: rowIndex, colIndex: colIndex, type: type, newValue: value}})
    }
}
