import React, { Component } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/plugins/colors.min.css';
import 'froala-editor/css/plugins/line_breaker.min.css';
import 'froala-editor/css/plugins/table.min.css';
// import 'froala-editor/css/plugins/code_view.min.css';

import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/colors.min.js';
// import 'froala-editor/js/plugins/code_view.min.js';
import 'froala-editor/js/plugins/font_family.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/line_breaker.min.js';
import 'froala-editor/js/plugins/line_height.min.js';
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/languages/vi';

interface iProps {
    data?: string
    onChange?: (data: any) => void;
    disabled?: boolean;
}

interface iState {

}

// https://github.com/froala/react-froala-wysiwyg
// https://froala.com/wysiwyg-editor/docs/options/

export default class ForalaEditor extends Component<iProps, iState>  {
    render() {
        const frolaConfig = {
            // placeholderText: 'Edit Your Content Here!',
            attribution: false,
            charCounterCount: false,
            language: 'vi',
            toolbarButtons: [
                [
                    'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting',
                    '|', 'formatOL', 'formatUL', '|', 'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', '|', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote', '|',
                    'insertLink', 'insertTable', '|', 'undo', 'redo',
                    // 'html'
                ],
            ],
            tableColors: [
                '#61BD6D', '#1ABC9C', '#54ACD2', '#2C82C9', '#9365B8', '#475577', '#CCCCCC',
                '#41A85F', '#00A885', '#3D8EB9', '#2969B0', '#553982', '#28324E', '#000000',
                '#F7DA64', '#FBA026', '#EB6B56', '#E25041', '#A38F84', '#EFEFEF', '#FFFFFF',
                '#FAC51C', '#F37934', '#D14841', '#B8312F', '#7C706B', '#D1D5D8', 'REMOVE'
            ],
        }

        return (
            <>
                {
                    this.props.disabled ? (
                        <>
                            {/* Mode view quá ngu */}
                            <span className="title-value">
                                <FroalaEditorView
                                    model={this.props.data}
                                />
                            </span>
                        </>
                    ) :
                        (
                            <>
                                <FroalaEditor
                                    tag='textarea'
                                    config={frolaConfig}
                                    model={this.props.data}
                                    onModelChange={(value) => {
                                        if (typeof this.props.onChange === 'function') {
                                            this.props.onChange(value)
                                        }
                                    }}
                                />
                            </>
                        )
                }
            </>
        )
    }
}
