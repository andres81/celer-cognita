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
import Modal from 'react-modal'

import './modal-style.css'

export default function (ModalComponent, requestClose, props, style) {
    class ModalWrapper extends React.Component {
        render() {
            style = Object.assign({
                overlay:{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)'
                },
                content : {
                    position: 'relative'
                    ,top: '0'
                    ,right: '0'
                    ,bottom: '0'
                    ,left: '0'
                    ,background: '#fff'
                    ,overflow: 'auto'
                    ,WebkitOverflowScrolling: 'touch'
                    ,borderRadius: '4px'
                    ,outline: 'none'
                    ,padding: '20px'
                    ,marginLeft: 'auto'
                    ,marginRight: 'auto'
                    ,marginTop: '40px'
                    ,maxWidth: '500px'
                    ,maxHeight:'80%'
                    ,zIndex:'100'
                }
            }, style);

            return (
                <Modal
                    isOpen={true}
                    contentLabel="Modal"
                    ariaHideApp={false}
                    style={style}
                    onRequestClose={requestClose}
                    overlayClassName="modal-overlay-class">
                    <ModalComponent {...props} requestClose={requestClose}/>
                </Modal>
            );
        }
    }
    return <ModalWrapper />;
}
