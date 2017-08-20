/**
 * transformers
 * Created by nsubbot on 20.08.17.
 * All rights reserved by Nikita Subbot ©
 */

subscribe();

function subscribe() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "subscribe", true);

    xhr.onload = function () {
        var li = document.createElement("li");
        li.textContent = this.responseText;
        transformers.appendChild(li);

        subscribe();
    };

    xhr.onerror = xhr.onabort = function () {
        setTimeout(subscribe, 500);
    };

    xhr.send('');
}
