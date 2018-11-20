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
    RESET_OPTION_SCORES,
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
} from './types'

const initialState =  {
    showDetails : false,
    textString: '',
    imageUrl: '',
    audioUrl: '',
    queryIndex: 0,
    pairIndexes: [0,1,2,3,4],
    level: 0,
    levelProgress: 0,
    queryType: 'text',
    queryColumn: 'left',
    optionsType: 'text',
    optionsColumn: 'right',
    optionInputType: 'options',

    loadedVocabulary: {
        "name":"tutorial lesson",
        "version":"1.0",
        "pairs": [
            {
                "left":{
                    "image":"https://s3-eu-west-1.amazonaws.com/fast-learning-website/eng/yellowsquare.jpeg",
                    "audio":"http://packs.shtooka.net/eng-wcp-us/ogg/En-us-yellow.ogg",
                    "text":"yellow"
                },
                "right":{
                    "image":"https://s3-eu-west-1.amazonaws.com/fast-learning-website/eng/yellowsquare.jpeg",
                    "audio":"http://packs.shtooka.net/fra-balm-voc/ogg/fra-02a671d2.ogg",
                    "text":"jaune"
                }
            },
            {
                "left":{
                    "image":"https://s3-eu-west-1.amazonaws.com/fast-learning-website/eng/orangesquare.jpeg",
                    "audio":"http://packs.shtooka.net/eng-balm-emmanuel/ogg/eng-1dc5b178.ogg",
                    "text":"orange"
                },
                "right":{
                    "image":"https://s3-eu-west-1.amazonaws.com/fast-learning-website/eng/orangesquare.jpeg",
                    "audio":"http://packs.shtooka.net/fra-balm-voc/ogg/fra-1dc5b178.ogg",
                    "text":"orange"
                }
            },
            {
                "left":{
                    "image":"https://s3-eu-west-1.amazonaws.com/fast-learning-website/eng/greensquare.jpeg",
                    "audio":"http://packs.shtooka.net/eng-wcp-us/ogg/En-us-green.ogg",
                    "text":"green"
                },
                "right":{
                    "image":"https://s3-eu-west-1.amazonaws.com/fast-learning-website/eng/greensquare.jpeg",
                    "audio":"http://packs.shtooka.net/fra-balm-frank/ogg/fra-6b6d87c6.ogg",
                    "text":"vert"
                }
            },
            {
                "left":{
                    "image":"https://s3-eu-west-1.amazonaws.com/fast-learning-website/eng/redsquare.jpeg",
                    "audio":"http://packs.shtooka.net/eng-wcp-us/ogg/En-us-red.ogg",
                    "text":"red"
                },
                "right":{
                    "image":"https://s3-eu-west-1.amazonaws.com/fast-learning-website/eng/redsquare.jpeg",
                    "audio":"http://packs.shtooka.net/fra-balm-voc/ogg/fra-632b61eb.ogg",
                    "text":"rouge"
                }
            },
            {
                "left":{
                    "image":"https://s3-eu-west-1.amazonaws.com/fast-learning-website/eng/purplesquare.jpeg",
                    "audio":"http://packs.shtooka.net/eng-balm-emmanuel/ogg/eng-ea8572e6.ogg",
                    "text":"purple"
                },
                "right":{
                    "image":"https://s3-eu-west-1.amazonaws.com/fast-learning-website/eng/purplesquare.jpeg",
                    "audio":"http://packs.shtooka.net/fra-balm-voc/ogg/fra-0c825381.ogg",
                    "text":"pourpre"
                }
            },
            {
                "left":{
                    "image":"https://s3-eu-west-1.amazonaws.com/fast-learning-website/eng/bluesquare.jpeg",
                    "audio":"http://packs.shtooka.net/eng-wcp-us/ogg/En-us-blue.ogg",
                    "text":"blue"
                },
                "right":{
                    "image":"https://s3-eu-west-1.amazonaws.com/fast-learning-website/eng/bluesquare.jpeg",
                    "audio":"http://packs.shtooka.net/fra-balm-voc/ogg/fra-c943c881.ogg",
                    "text":"bleu"
                }
            }
        ]
    }
};

export default (state = initialState, action = {}) => {

    const DEFAULT_OPTION_SCORE = 0;

    switch(action.type) {
        case SHOW_DETAILS:
            return Object.assign({}, state, {
                showDetails : action.payload.showDetails
            });
        case SHOW_LOADER:
            return Object.assign({}, state, {
                showLoader : action.payload.showLoader
            });
        case SHOW_CREATOR:
            return Object.assign({}, state, {
                showCreator : action.payload.showCreator
            });
        case TOGGLE_OPTION_PAIR:
            var newPairIndexes = updatePairIndexes(state.pairIndexes, action.payload.pairIndex);
            return Object.assign({}, state, {
                pairIndexes : newPairIndexes
                ,queryIndex : newPairIndexes[0]
            });
        case UPDATE_EXERCISE_OPTIONS:
            return Object.assign({}, state, action.payload);
        case SET_NEW_QUERY:
            return Object.assign({}, state, {queryIndex : action.payload});
        case SET_VOCABULARY:
            return Object.assign({}, state, newVocabulary(action.payload));
        case STORE_OPTION_CHOSEN:
            var oldHistory = state.exerciseProgress ? state.exerciseProgress : [];
            var newHistory = oldHistory.slice();
            newHistory.push(action.payload);
            return Object.assign({}, state, {exerciseProgress: newHistory});
        case UPDATE_OPTION_SCORE:
            let updatedScores = Object.assign({}, state.exerciseUserScores ? state.exerciseUserScores : {});
            let oldScore = updatedScores[action.payload.index] !== undefined ? updatedScores[action.payload.index] : DEFAULT_OPTION_SCORE;
            updatedScores[action.payload.index] = oldScore + action.payload.scoreDelta;
            return Object.assign({}, state, {exerciseUserScores: updatedScores});
        case RESET_OPTION_SCORES:
            return resetOptionScores(state);
        case REPLACE_PAIR_INDEX:
            var replacedPairIndexes = state.pairIndexes.slice();
            replacePairIndex(replacedPairIndexes, action.payload.oldPairIndex, action.payload.newPairIndex);
            return Object.assign({}, state, {
                pairIndexes : replacedPairIndexes
                ,queryIndex : replacedPairIndexes[0]
            });
        case SET_LEVEL_PROGRESS:
            return Object.assign({}, state, {levelProgress: action.payload.levelProgress});
        case SET_LEVEL:
            return Object.assign({}, resetOptionScores(state), {
                level: action.payload.level
                ,levelProgress: 0
            });
        case SHUFFLE_PAIRS:
            return Object.assign({}, state, {pairIndexes: shuffle(state.pairIndexes)});
        case SET_RANDOM_OPTION_PAIRS:
            let pairIndexes = getRandomPairIndexes(state);
            let queryIndex = pairIndexes[Math.floor(Math.random()*5)];
            return Object.assign({}, state, {
                pairIndexes: pairIndexes
                ,queryIndex: queryIndex
            });
        default:
            return state;
    }
}

var getRandomPairIndexes = function(state) {
    return randomArrayIndexes(state.loadedVocabulary.pairs, 5);
}

var randomArrayIndexes = function(array, nofIndexes) {
    let length = array.length;
    if (length === 0 || nofIndexes <= 0) {
        return [];
    }
    let indexArray = [];
    array.forEach((elem, index) => indexArray.push(index));
    let indexes = [];
    for (let i=0;i<nofIndexes;++i) {
        let index = Math.floor(Math.random()*indexArray.length);
        indexes.push(indexArray[index]);
        indexArray.splice(index, 1);
    }
    return indexes;
}

var resetOptionScores = function(state) {
    let oldScores = Object.assign({}, state.exerciseUserScores ? state.exerciseUserScores : {});
    Object.keys(oldScores).forEach(elem => oldScores[elem] = 0);
    return Object.assign({}, state, {exerciseUserScores: oldScores});
}

var shuffle = function(array) {
    var copy = array.slice();
    var i = 0
        , j = 0
        , temp = null
    for (i = copy.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = copy[i]
        copy[i] = copy[j]
        copy[j] = temp
    }
    return copy;
}

var updatePairIndexes = function(pairIndexes, pairIndex) {
    var indexOf = pairIndexes.indexOf(pairIndex);
    if (indexOf !== -1) {
        pairIndexes.splice(indexOf,1);
        pairIndexes = pairIndexes.slice();
    } else {
        pairIndexes.push(pairIndex);
        pairIndexes.reverse();
        pairIndexes = pairIndexes.slice(0,5);
        pairIndexes.reverse();
    }
    return pairIndexes;
}

var replacePairIndex = function(pairIndexes, oldPairIndex, newPairIndex) {
    let index = pairIndexes.indexOf(parseInt(oldPairIndex, 10));
    if (index === -1) return;
    pairIndexes[index] = newPairIndex;
}

var newVocabulary = function(loadedVocabulary) {

    if (!loadedVocabulary ||
            !loadedVocabulary.pairs)
        return {};
    var length = loadedVocabulary.pairs.length;

    var pairIndexes = [];
    for (var i=0;i<5&&i<length;++i) {
        pairIndexes.push(i);
    }

    var newVoc = {
        textString: '',
        imageUrl: '',
        audioUrl: '',
        queryIndex: 0,
        pairIndexes: pairIndexes,
        queryType: 'text',
        queryColumn: 'left',
        optionsType: 'text',
        optionsColumn: 'right',
        loadedVocabulary: loadedVocabulary
    }

    return newVoc;
}