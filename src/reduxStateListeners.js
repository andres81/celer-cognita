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

import optionListener from './components/VocabularyExercise/Exercise/Controller/OptionChosenListener';
import exerciseScoreController from "./components/VocabularyExercise/Exercise/Controller/ExerciseScoreController";
import activeOptionsController from "./components/VocabularyExercise/Exercise/Controller/ActiveOptionsController";
import levelProgressController from "./components/VocabularyExercise/Exercise/Controller/LevelProgressController"

const reduxListeners = [
    optionListener
    ,exerciseScoreController
    ,activeOptionsController
    ,levelProgressController
];

export default function(listenStore) {
    reduxListeners.forEach((e) => {
        e(listenStore);
    });
}