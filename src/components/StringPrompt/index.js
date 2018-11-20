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

import './style.css'

export default class StringPrompt extends React.Component {

    constructor(props) {
        super(props);

        this.state = {promptValue: ""};
    }

    onPromptChange = (e) => {
        this.setState({promptValue: e.target.value});
    }

    render() {

        const {title, promptLabel} = this.props;

        return (
            <div>
                <h1>{title}</h1>
                <br/>
                {promptLabel}
                &nbsp;&nbsp;&nbsp;
                <input className="string-prompt" onChange={this.onPromptChange} value={this.state.promptValue}/>
                <br/><br/>
                <button onClick={() => this.props.cancelCallback()} className="btn pull-right">Cancel</button>
                <button onClick={() => this.props.saveCallback(this.state.promptValue)} style={{marginRight: '20px'}} className="btn btn-info pull-right">Save</button>
            </div>
        )
    }
}