// @ts-nocheck -- Ignore Typesript checking

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { Component } from 'react';

let _defaultConfig = {
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            // '|',
            // 'indent',
            // 'outdent',
            '|',
            // 'imageUpload',
            'blockQuote',
            'insertTable',
            // 'mediaEmbed',
            '|',
            'undo',
            'redo'
        ]
    },
    // image: {
    //     toolbar: [
    //         'imageStyle:full',
    //         'imageStyle:side',
    //         '|',
    //         'imageTextAlternative'
    //     ]
    // },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
        ]
    },
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: 'en'
};

function MyCustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        // Configure the URL to the upload script in your back-end here!
        return new MyUploadAdapter(loader);
    };
}

class MyUploadAdapter {
    loader: any;
    xhr: any;
    constructor(loader: any) {
        // The file loader instance to use during the upload. It sounds scary but do not
        // worry — the loader will be passed into the adapter later on in this guide.
        this.loader = loader;
    }

    // ...
    // Starts the upload process.
    upload() {
        return this.loader.file
            .then((file: any) => new Promise((resolve, reject) => {
                this._initRequest();
                this._initListeners(resolve, reject, file);
                this._sendRequest(file);
            }));
    }

    private _sendRequest(file: any) {
        // Prepare the form data.
        const data = new FormData();

        data.append('upload', file);

        // Important note: This is the right place to implement security mechanisms
        // like authentication and CSRF protection. For instance, you can use
        // XMLHttpRequest.setRequestHeader() to set the request headers containing
        // the CSRF token generated earlier by your application.

        // Send the request.
        this.xhr.send(data);
    }

    private _initListeners(resolve: (value: unknown) => void, reject: (reason?: any) => void, file: any) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${file.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;

            // This example assumes the XHR server's "response" object will come with
            // an "error" which has its own "message" that can be passed to reject()
            // in the upload promise.
            //
            // Your integration may handle upload errors in a different way so make sure
            // it is done properly. The reject() function must be called when the upload fails.
            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : genericErrorText);
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            // This URL will be used to display the image in the content. Learn more in the
            // UploadAdapter#upload documentation.
            resolve({
                default: response.url
            });
        });

        // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
        // properties which are used e.g. to display the upload progress bar in the editor
        // user interface.
        if (xhr.upload) {
            xhr.upload.addEventListener('progress', (evt: { lengthComputable: any; total: any; loaded: any; }) => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    private _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();

        // Note that your request may look different. It is up to you and your editor
        // integration to choose the right communication channel. This example uses
        // a POST request with JSON as a data structure but your configuration
        // could be different.
        xhr.open('POST', 'http://example.com/image/upload/path', true);
        xhr.responseType = 'json';
    }

    // Aborts the upload process.
    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }
    // ...
}

interface iEditorProps {
    data?: string
    onChange: (data: any) => void;
    disabled?: boolean;
}

interface iEditorState {

}

export default class Editor extends Component<iEditorProps, iEditorState> {
    constructor(props: iEditorProps) {
        super(props)
        this.state = {

        }
        if (this.props.disabled) {
            ClassicEditor.defaultConfig = {}
        } else {
            ClassicEditor.defaultConfig = _defaultConfig
        }
    }

    componentDidMount() {
        setTimeout(() => {

            let divContainer = document.getElementsByClassName('ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline')

            let elm = divContainer && divContainer[0] ? divContainer[0] : undefined

            console.log(elm)

            let childDiv = elm?.innerHTML

            console.log(childDiv)

            let container = `<div class="reset-this-root">${childDiv}</div>`

            console.log(container)

            if (elm)
                elm.innerHTML = `<p>BBBBBB</p>`

        }, 3000)
    }


    render() {
        return (
            <div className="ckeditor-wrapper">
                <CKEditor
                    // id={this.state.ckeditorID?.toString()}
                    // key={"editor"}
                    // ref={this._refEditor}
                    editor={ClassicEditor}
                    data={this.props.data}
                    onReady={(editor: any) => {
                        // You can store the "editor" and use when it is needed.
                    }}
                    onChange={(event: any, editor: any) => {
                        const data = editor.getData();
                        this.props.onChange(data)
                    }}
                    onBlur={(event: any, editor: any) => {

                    }}
                    onFocus={(event: any, editor: any) => {

                    }}
                    disabled={this.props.disabled}
                />
            </div>
        )
    }
}