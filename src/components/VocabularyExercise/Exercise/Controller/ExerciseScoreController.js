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

import {STORE_OPTION_CHOSEN} from "../reducer/types";
import {updateOptionScore} from "../vocabularyExerciseActions";

export default function(listenStore) {
    listenStore.addListener(STORE_OPTION_CHOSEN, ({action, getState, dispatch}) => {
        let state = getState();
        let progress = state.vocabularyExercise.exerciseProgress;
        let progressLength = progress.length;
        if (progressLength === 0) return;
        let lastGuess = progress[progressLength-1];
        let lastGuessCorrect = lastGuess.queryIndex+'' === lastGuess.optionIndex+'';
        let scoreDelta;
        if (lastGuessCorrect) {
            scoreDelta = 1;
        } else {
            scoreDelta = -1;
        }
        updateOptionScore(dispatch, {index: lastGuess.queryIndex, scoreDelta: scoreDelta});
    })
}
