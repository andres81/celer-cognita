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

import {UPDATE_OPTION_SCORE} from "../reducer/types";
import {dispatchReplacePairIndex} from "../vocabularyExerciseActions";

export default function(listenStore) {
    listenStore.addListener(UPDATE_OPTION_SCORE, ({action, getState, dispatch}) => {
        let state = getState();
        let exe = state.vocabularyExercise;
        let scores = exe.exerciseUserScores;
        let replacePairIndex = getFirstWithHighEnoughScore(scores);
        if (replacePairIndex === -1) {
            return;
        }
        let voc = exe.loadedVocabulary;
        let vocPairsSize = voc.pairs.length;
        let indexArray = intArray(vocPairsSize);
        let newOptionsArray = removeElementsFromArray(indexArray, exe.pairIndexes);
        let newOptionIndex = Math.floor(Math.random() * newOptionsArray.length);
        dispatchReplacePairIndex(dispatch, replacePairIndex, newOptionsArray[newOptionIndex]);
    })
}

function getFirstWithHighEnoughScore(scores) {
    let indexesWithScore = Object.keys(scores);
    for (let i=0;i<indexesWithScore.length;++i) {
        let score = indexesWithScore[i];
        if (scores[score] > 5) {
            return score;
        }
    }
    return -1;
}

function intArray(size) {
    let intArray = [];
    for (var i=0;i<size;++i) {
        intArray.push(i);
    }
    return intArray;
}

function removeElementsFromArray(sourceArray, removablesArray) {
    let removedFromArray = sourceArray.slice();
    for (var i=0;i<removablesArray.length;++i) {
        let index = removedFromArray.indexOf(removablesArray[i]);
        if (index<0) continue;
        removedFromArray.splice(index, 1);
    }
    return removedFromArray;
}