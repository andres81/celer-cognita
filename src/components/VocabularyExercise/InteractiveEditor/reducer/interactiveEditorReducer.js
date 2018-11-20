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
import {INTERACTIVE_MOVE_ROW, INTERACTIVE_DELETE_ROW, INTERACTIVE_ADD_ROW, INTERACTIVE_UDPATE_COLUMN} from "./types";

const newRow = {
    "left": {
        "image": "",
        "audio": "",
        "text": ""
    },
    "right": {
        "image": "",
        "audio": "",
        "text": ""
    }
};

const initialState =  {
    "pairs": [
        {
            "left": {
                "image": "",
                "audio": "",
                "text": ""
            },
            "right": {
                "image": "",
                "audio": "",
                "text": ""
            }
        }
    ]
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case INTERACTIVE_MOVE_ROW:
            return Object.assign({}, state, {
                pairs: moveRow(state.pairs, action.payload.oldIndex, action.payload.newIndex)
            });
        case INTERACTIVE_DELETE_ROW:
            return Object.assign({}, state, {
                pairs: deleteRow(state.pairs, action.payload.rowIndex)
            });
        case INTERACTIVE_ADD_ROW:
            return Object.assign({}, state, {
                pairs: addRow(state.pairs)
            });
        case INTERACTIVE_UDPATE_COLUMN:
            return Object.assign({}, state, {
                pairs:  updateCol(
                    state.pairs,
                    action.payload.rowIndex,
                    action.payload.colIndex,
                    action.payload.type,
                    action.payload.newValue)
            });
        default:
            return state;
    }
}

function updateCol(pairs, rowIndex, col, type, value) {
    let newPairs = JSON.parse(JSON.stringify(pairs));
    newPairs[rowIndex][col][type] = value;
    return newPairs;
}

function moveRow(pairs, oldIndex, newIndex) {
    let newPairs = JSON.parse(JSON.stringify(pairs));
    let element = newPairs[oldIndex];
    newPairs.splice(oldIndex, 1);
    newPairs.splice(newIndex, 0, element);
    return newPairs;
}

function deleteRow(pairs, rowIndex) {
    let newPairs = JSON.parse(JSON.stringify(pairs));
    newPairs.splice(rowIndex, 1);
    return newPairs;
}

function addRow(pairs) {
    let newPairs = JSON.parse(JSON.stringify(pairs));
    let newPair = Object.assign({}, newRow);
    newPairs.push(newPair);
    return newPairs;
}