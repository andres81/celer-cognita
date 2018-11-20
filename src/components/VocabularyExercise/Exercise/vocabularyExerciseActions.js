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

import {
    REPLACE_PAIR_INDEX,
    SET_LEVEL,
    SET_LEVEL_PROGRESS,
    SET_NEW_QUERY,
    SET_RANDOM_OPTION_PAIRS,
    SET_VOCABULARY,
    SHOW_CREATOR,
    SHOW_DETAILS,
    SHOW_LOADER,
    SHUFFLE_PAIRS,
    STORE_OPTION_CHOSEN,
    TOGGLE_OPTION_PAIR,
    UPDATE_EXERCISE_OPTIONS,
    UPDATE_OPTION_SCORE
} from './reducer/types'

export function showDetails() {
    return dispatch => {
        dispatch({
            type: SHOW_DETAILS, payload: {showDetails: true}
        });
    }
}

export function closeDetails() {
    return dispatch => {
        dispatch({
            type: SHOW_DETAILS, payload: {showDetails: false}
        });
    }
}

export function showLoader() {
    return dispatch => {
        dispatch({
            type: SHOW_LOADER, payload: {showLoader: true}
        });
    }
}

export function showCreator() {
    return dispatch => {
        dispatch({
            type: SHOW_CREATOR, payload: {showCreator: true}
        });
    }
}

export function closeCreator() {
    return dispatch => {
        dispatch({
            type: SHOW_CREATOR, payload: {showCreator: false}
        });
    }
}

export function shufflePairs(dispatch) {
    dispatch({
        type: SHUFFLE_PAIRS
    })
}

export function closeLoader() {
    return dispatch => {
        dispatch({
            type: SHOW_LOADER, payload: {showLoader: false}
        });
    }
}

export function toggleVocabularyPair(pairIndex) {
    return dispatch => {
        dispatch({
            type: TOGGLE_OPTION_PAIR, payload: {pairIndex: pairIndex}
        });
    }
}

export function updateExerciseOptions(data) {

    let state = {};
    if (data) {
        if (data.hasOwnProperty('queryType')) state.queryType = data.queryType;
        if (data.hasOwnProperty('queryColumn')) state.queryColumn = data.queryColumn;
        if (data.hasOwnProperty('optionsType')) state.optionsType = data.optionsType;
        if (data.hasOwnProperty('optionsColumn')) state.optionsColumn = data.optionsColumn;
        if (data.hasOwnProperty('optionInputType')) state.optionInputType = data.optionInputType;
        if (data.hasOwnProperty('loadedVocabulary')) state.loadedVocabulary = data.loadedVocabulary;
    }

    return dispatch => {
        dispatch({
            type: UPDATE_EXERCISE_OPTIONS, payload: state
        });
    }
}

export function setNewQueryIndex(queryIndex) {
    return dispatch => {
        dispatch({
            type: SET_NEW_QUERY, payload: queryIndex
        })
    }
}

export function dispatchNewQueryIndex(dispatch, queryIndex) {
    dispatch({
        type: SET_NEW_QUERY, payload: queryIndex
    })
}

export function updateOptionScore(dispatch, optionScoreDelta) {
    dispatch({
        type: UPDATE_OPTION_SCORE, payload: optionScoreDelta
    })
}

export function dispatchStoreOptionChosen(dispatch, optionIndex, queryIndex, timestamp) {
    dispatch({
        type: STORE_OPTION_CHOSEN, payload: {
            optionIndex: optionIndex,
            queryIndex: queryIndex,
            timestamp: timestamp
        }
    })
}

export function setLevelProgress(dispatch, levelProgress) {
    dispatch({
        type: SET_LEVEL_PROGRESS, payload: {
            levelProgress: levelProgress
        }
    })
}

export function setLevel(dispatch, level) {
    dispatch({
        type: SET_LEVEL, payload: {
            level: level
        }
    })
}

export function setRandomOptionPairs(dispatch) {
    dispatch({
        type: SET_RANDOM_OPTION_PAIRS
    })
}

export function dispatchReplacePairIndex(dispatch, oldPairIndex, newPairIndex) {
    dispatch({
        type: REPLACE_PAIR_INDEX, payload: {
            newPairIndex: newPairIndex
            ,oldPairIndex: oldPairIndex
        }
    })
}

export function optionChosen(optionIndex) {
    return dispatch => {
        dispatch({
            type: "OPTION_CHOSEN",
            payload: optionIndex
        })
    }
}

export function setExercise(loadedVocabulary) {
    return dispatch => {
        return dispatch({
            type: SET_VOCABULARY, payload: loadedVocabulary
        })
    }
}
