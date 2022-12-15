'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs');
    const modal = require('./modules/modal');
    const timer = require('./modules/timer');
    const forms = require('./modules/forms');
    const slider = require('./modules/slider');
    const cards = require('./modules/cards');
    const calculator = require('./modules/calculator');

    tabs();
    modal();
    timer();
    forms();
    slider();
    cards();
    calculator();

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: "POST",
    //     body: JSON.stringify({name: "Alex"}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    //     .then(response => response.json())
    //     .then(json => console.log(json));
});
