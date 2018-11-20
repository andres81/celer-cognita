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

import {OPTION_CHOSEN} from "../reducer/types";
import {
    dispatchNewQueryIndex,
    dispatchStoreOptionChosen,
    setRandomOptionPairs,
    shufflePairs
} from "../vocabularyExerciseActions";

export default function(listenStore) {
    listenStore.addListener(OPTION_CHOSEN, ({action, getState, dispatch}) => {
        let state = getState();
        let vocExec = state.vocabularyExercise;
        let queryIndex = vocExec.queryIndex;
        dispatchStoreOptionChosen(dispatch, action.payload, queryIndex, Date.now());
        if (action.payload !== ''+queryIndex) {
            return;
        }
        levelDependantActions(dispatch, vocExec.level);
        var copyArray = getState().vocabularyExercise.pairIndexes.slice();
        var index = copyArray.indexOf(parseInt(action.payload, 10));
        if (index > -1) {
            copyArray.splice(index, 1);
            var newQueryIndex = copyArray[Math.floor(Math.random()*copyArray.length)];
            dispatchNewQueryIndex(dispatch, newQueryIndex);
        }
    })
}

function levelDependantActions(dispatch, level) {
    switch(level) {
        case 1:
            shufflePairs(dispatch);
            break;
        case 2:
            setRandomOptionPairs(dispatch);
            break;
        default:
            return;
    }
}
