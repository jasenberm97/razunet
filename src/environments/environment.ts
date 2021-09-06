// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // DESARROLLO
  // firebase:{
  //   apiKey: "AIzaSyA0kr6T3zyWrUVlR-4QPrlGBVkC7s9Ddew",
  //   authDomain: "proyecto-de-pruebas-c5417.firebaseapp.com",
  //   databaseURL: "https://proyecto-de-pruebas-c5417-default-rtdb.firebaseio.com",
  //   projectId: "proyecto-de-pruebas-c5417",
  //   storageBucket: "proyecto-de-pruebas-c5417.appspot.com",
  //   messagingSenderId: "1033289838431",
  //   appId: "1:1033289838431:web:118614fb1909353945d0ea"
  // }

  //  PRODUCCION
  firebase: {
    apiKey: "AIzaSyDVaMSbWMzCnI8efbSpwNh9JDVs6gdR7Cg",
    authDomain: "razunetfashion.firebaseapp.com",
    databaseURL: "https://razunetfashion-default-rtdb.firebaseio.com",
    projectId: "razunetfashion",
    storageBucket: "razunetfashion.appspot.com",
    messagingSenderId: "16895416068",
    appId: "1:16895416068:web:15e567b8dee54d8bcfe251",
    measurementId: "G-D1M1SHCK0W"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
