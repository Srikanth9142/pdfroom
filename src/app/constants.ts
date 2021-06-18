import { AngularEditorConfig } from '@kolkov/angular-editor';

export const ERROR_STATUS_TEXT_FOR_SESSION_EXPIRED = "Unauthorized";

export const SESSION_EXPIRED_USER_MSG = "Session expired. Login again";

export const ADD_TO_SHELF_SUCCESS_MSG = "Added to shelf";

export const LIKE_BOOK_SUCCESS_MSG = "Added Like";

export const ADD_TO_READLIST_SUCCESS_MSG = "Added to ReadList";

export const EXISTING_BOOK_READLIST_ERROR = "Book already in ReadList";

export const editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'no',
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarHiddenButtons: [
      ['insertImage', 'insertVideo']
    ]
};