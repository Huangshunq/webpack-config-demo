import './style.scss';
import generateText from './sub';

let app = document.createElement('div');
const myPromise = Promise.resolve(42);
myPromise.then(num => {
    $('body').append('<p>num: ' + num + ' time: ' + moment().format() + '</p>');
});
app.innerHTML = '<h1>Hello world</h1>';
document.body.appendChild(app);
app.createChild(generateText());