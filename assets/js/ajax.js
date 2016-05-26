'use strict';

// Utils
let qsa = document.querySelectorAll.bind(document);
let qs = document.querySelector.bind(document);

// Vars
let links = qsa('.ajax-this');
let bodyContainer = qs('.container');

// Add events to links
[].forEach.call(links, (link) => {
    link.onclick = (e) => {
        let link  = e.target;

        e.preventDefault();

        gotoLink(link.href);
    }
});

// Reinit state on page refresh
window.onload = function () {
    if ( history.state ) {
        initState(history.state);
    }
}

// Refetch link on popstate event
window.onpopstate = function(e) {
    gotoLink(document.location, e.state, false);
};

// Fetch resource and set history entry
function gotoLink(href = '', state = null, push = true) {
    var inputvalue = qs('input') ? qs('input').value : null;
    var headers = new Headers();

    // Fetch header config
    headers.append('ajax', 'true');

    // Set state for current entry with input value
    if ( inputvalue && push) {
        history.replaceState({value: inputvalue}, document.location, document.location);
    }

    // Fetch the resource
    fetch(href, {headers: headers})
        .then((res) => {
            // Return response text promise
            return res.text();
        })
        .then((res) => {
            bodyContainer.innerHTML = res;

            // Reinit state
            if ( state && state.value ) {
                initState(state);
            }

            // Push new entry in history
            if ( push ) {
                history.pushState(state, href, href);
            }
        });
}

// Reints state for current history entry with state object
function initState(state) {
    qs('input').value = state.value;
}