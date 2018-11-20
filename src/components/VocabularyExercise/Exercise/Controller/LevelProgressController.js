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
import {setLevel, setLevelProgress} from "../vocabularyExerciseActions";

export default function(listenStore) {
    listenStore.addListener(UPDATE_OPTION_SCORE, ({action, getState, dispatch}) => {

        let state = getState();
        let voc = state.vocabularyExercise;
        let nofPairs = voc.loadedVocabulary.pairs.length;
        let userScores = voc.exerciseUserScores;
        let scoreIndexes = Object.keys(userScores);
        let totalScore = 0;

        scoreIndexes.forEach(index => {
            let userScore = userScores[index];
            totalScore += userScore >= 5 ? 5 : userScore;
        });

        totalScore = totalScore < 0 ? 0 : totalScore;

        let levelProgress = Math.floor(totalScore / (nofPairs * 5) * 100);

        if (levelProgress >= 100) {
            setLevel(dispatch, ++voc.level);
        } else {
            setLevelProgress(dispatch, levelProgress);
        }
    });
}