// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyBLc0zu1BhxWrO3udDvYKqu-uMJHyQdmpw",
    authDomain: "auth.skillapp.co",
    databaseURL: "https://skillapp-eee1f.firebaseio.com",
    projectId: "skillapp-eee1f",
    storageBucket: "skillapp-eee1f.appspot.com",
    messagingSenderId: "264783093242"
  }
};
