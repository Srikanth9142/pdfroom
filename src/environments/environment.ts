// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebaseConfig:{
    apiKey: "AIzaSyDpkPNqq6q123YRbk7oqfNcvHpzNjXYWvo",
    authDomain: "pdfroom-9142.firebaseapp.com",
    databaseURL: "https://pdfroom-9142.firebaseio.com",
    projectId: "pdfroom-9142",
    storageBucket: "pdfroom-9142.appspot.com",
    messagingSenderId: "343804261630",
    appId: "1:343804261630:web:fb5981993f511584ec21af",
    measurementId: "G-YYCJXKMTVR"
  },
  //serverurl: 'https://easymeet99.pythonanywhere.com',
  serverurl:'http://localhost:8000'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
