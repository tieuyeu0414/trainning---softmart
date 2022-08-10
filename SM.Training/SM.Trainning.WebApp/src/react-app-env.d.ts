/// <reference types="react-scripts" />

declare module "@ckeditor/ckeditor5-react" {
    CKEditor: any;
    export { CKEditor }
}

declare module "@ckeditor/ckeditor5-build-decoupled-document" {

}

declare module "@ckeditor/ckeditor5-build-classic" {
    function create(query: any, plugins: any);

}