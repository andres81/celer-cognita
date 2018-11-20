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

import React from "react";

export default class ExerciseMenuBarButtonGroup extends React.Component {

    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(e) {
        this.props.handler(e.currentTarget.dataset.value);
    }

    render() {

        const {buttonTypeClass, icons, values, checked} = this.props;

        var buttons = [];
        for (var i=0;i<icons.length;++i) {
            var activeClass = checked===i ? " active" : "";
            buttons.push(
                <button key={i} onClick={this.clickHandler} data-value={values[i]} type="button" className={buttonTypeClass + " btn" + activeClass}><i className={icons[i]}></i></button>
            );
        }

        return (
            <div className="btn-group" role="group" data-toggle="buttons">
                {buttons}
            </div>
        )
    }
}