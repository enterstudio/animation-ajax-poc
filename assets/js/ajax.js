'use strict';

let qsa = document.querySelectorAll.bind(document);
let qs = document.querySelector.bind(document);
let links = qsa('.ajax-this');
let ajaxDivContainer = document.createElement('div');
let bodyContainer = qs('.container');

[].forEach.call(links, function (link) {
    link.onclick = (e) => {
        let link  = e.target;

        e.preventDefault();

        gotoLink(link.href);
    }
});

window.onpopstate = function(e) {
    gotoLink(document.location, e.state, true);
};

function gotoLink(href, state = {}, nopush) {
    var inputvalue = qs('input') ? qs('input').value : null;
    var headers = new Headers();

    headers.append('ajax', 'true');

    if ( inputvalue ) {
        history.replaceState({value: inputvalue}, document.location, document.location);
    }

    fetch(href, {headers: headers})
        .then(function (res) {
            return res.text();
        })
        .then(function (res) {
            let ajaxBody;

            ajaxDivContainer.innerHTML = res;
            ajaxBody = ajaxDivContainer.querySelector('.container').innerHTML;
            bodyContainer.innerHTML = ajaxBody;

            if ( state.value ) {
                qs('input').value = state.value;
            }

            return nopush ? false : history.pushState({}, href, href);
        });
}