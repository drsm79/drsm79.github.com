console.log(document.monetization);

function logMessage(message) {
    let li = document.createElement("li");
    li.textContent = message;
    document.getElementById("info").appendChild(li);
}

if (document.monetization) {
    logMessage('Browser supports WebMonetization');
} else {
    logMessage('Browser does not support WebMonetization');
}

let progress_done = 0;
let pending_done = 0;


function startEventHandler(event) {
    console.log(event);
    let message = "WM started: " + JSON.stringify(event.detail);
    logMessage(message);
}

function pendingEventHandler(event) {
    console.log(event);
    pending_done += 1;
    let message = "WM pending: " + JSON.stringify(event.detail);
    logMessage(message);
    if (pending_done > 4) {
        document.monetization.removeEventListener('monetizationprogress', progressEventHandler);
    }
}

function progressEventHandler(event) {
    console.log(event);
    progress_done += 1;
    let message = "WM progress: " + done + " " + JSON.stringify(event.detail);
    logMessage(message);
    if (progress_done > 4) {
        document.monetization.removeEventListener('monetizationprogress', progressEventHandler);
    }
}

document.monetization.addEventListener('monetizationstart', startEventHandler);
document.monetization.addEventListener('monetizationpending', pendingEventHandler);
document.monetization.addEventListener('monetizationprogress', progressEventHandler);
