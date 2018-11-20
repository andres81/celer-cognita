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

import React from 'react'
import {connect} from 'react-redux'
import modal from "../../../../../utils/modal";
import ImageElement from "./ImageElement";
import {STYLE_OBJECT} from "./ImageElementModalStyle"

import './style.css'

class TableCell extends React.Component {

    constructor(props) {
        super(props);
        this.showImage = this.showImage.bind(this);

        this.state = {
            showImageModal : false
        };
    }

    showImage(show) {
        this.setState({
            showImageModal: show
        });
    }

    render() {

        const {cellContent} = this.props;

        const {showImageModal} = this.state;

        return (
            <td className="table-cell">
                <span>
                    {cellContent.text}
                </span>
                <span>
                    <img alt='' onClick={() => this.showImage(true)} className="table-cell-image" src={cellContent.image} />
                </span>
                <span>
                    <i className="fa fa-music"></i>
                </span>
                {showImageModal ? modal(ImageElement, () => this.showImage(false), {imageSource : cellContent.image, classes : 'imageElement', clickCallback :  () => this.showImage(false)}, STYLE_OBJECT) : undefined}
            </td>
        )
    }
}

const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps, {})(TableCell);