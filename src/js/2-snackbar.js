'use strict'

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const promise = new Promise((resolve, reject) => {
        const delayTime = Number(event.target.elements.delay.value);
        const state = event.target.elements.state.value;

        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delayTime);
            } else {
                reject(delayTime);
            }

        }, delayTime);

        form.reset();
    });
    
    promise
        .then(value => {
            iziToast.success({ icon: '', close: false, message: `✅ Fulfilled promise in ${value}ms`});
        })
        .catch(error => {
             iziToast.error({ icon: '', close: false, message: `❌ Rejected promise in ${error}ms`});
        });
}
