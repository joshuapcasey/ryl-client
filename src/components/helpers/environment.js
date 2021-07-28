// let APIURL = 'http://localhost:4001';

let APIURL = '';
switch (window.location.hostname) {
    // this is the local host name of your react app
    case 'localhost' || '127.0.0.1':
        //this is the local host name of your API
        APIURL = 'http://localhost:4001';
        break;
    // this is the deployed react application
    case 'ryl-server.herokuapp.com':
        //this is the full url of your deployed API
        APIURL = 'https://ryl-server.herokuapp.com'
}

export default APIURL;
