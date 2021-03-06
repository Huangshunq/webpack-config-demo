import './style.scss';
import generateText from './sub';
import $ from 'jquery';
import moment from 'moment';

let app = document.createElement('div');
const myPromise = Promise.resolve(42);
myPromise.then(num => {
    $('body').append('<p>num: ' + num + ' time: ' + moment().format() + '</p>');
});
app.innerHTML = '<h1>Hello world</h1>';
app.appendChild(generateText());
document.body.appendChild(app);
