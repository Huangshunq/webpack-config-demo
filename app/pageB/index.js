import './style.scss';
import $ from 'jquery';

$(document).ready(function() {
  let app  = document.createElement('div');
  app.innerHTML = '<h1>Hello pageB!</h1>';
  document.body.appendChild(app);
});
