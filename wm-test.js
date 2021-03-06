var progress_done = 0;
var pending_done = 0;
var payment_sum = 0;

function logMessage(message, event) {
    console.log(message);
    let li = document.createElement("li");
    li.textContent = message;
    if (event) {    
        console.log(payment_sum, event.detail.amount);
        if (event.detail.amount){
            payment_sum += parseInt(event.detail.amount);
        }
        let pre = document.createElement("pre");
        let code = document.createElement("code");
        code.textContent = JSON.stringify(event.detail, null, 2);
        pre.appendChild(code);
        li.appendChild(pre);
    }
    document.getElementById("info").appendChild(li);
}

if (document.monetization) {
    logMessage('Browser supports WebMonetization');
} else {
    logMessage('Browser does not support WebMonetization');
}

function startEventHandler(event) {
    let message = "WM started: ";
    logMessage(message, event);
}

function pendingEventHandler(event) {
    pending_done += 1;
    let message = "WM pending: ";
    logMessage(message, event);
    if (pending_done > 4) {
        document.monetization.removeEventListener('monetizationprogress', progressEventHandler);
    }
}

function progressEventHandler(event) {
    progress_done += 1;

    let message = "WM progress: " + progress_done + " ";
    if (progress_done < 6) {
        logMessage(message, event);
    }
    if (progress_done <= 100) {
        if (progress_done % 10 === 0) {
            logMessage(message, event);
        }
    }
    if (progress_done >= 100) {
        document.monetization.removeEventListener('monetizationprogress', progressEventHandler);
        message = 'WM sent ' + payment_sum + ' in ' + progress_done + ' iterations.';
        logMessage(message);
    }
}

document.monetization.addEventListener('monetizationstart', startEventHandler);
document.monetization.addEventListener('monetizationpending', pendingEventHandler);
document.monetization.addEventListener('monetizationprogress', progressEventHandler);
