window.addEventListener("message", function (event) {
    const ilp = event.data["playlist-ilp"] || false;
    if (ilp) {
        var not_done = true;
        const metas = document.getElementsByTagName('meta');
        for (let i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute('name') === 'monetization') {
                metas[i].content = ilp;
                not_done = false;
                console.log("set ilp to " + ilp + " via event.");
            }
        }
        if (not_done) {
            const monetizationTag = document.createElement('meta');
            monetizationTag.name = 'monetization';
            monetizationTag.content = ilp;
            document.head.appendChild(monetizationTag);
            console.log("added meta & set ilp to " + ilp + " via event.");
        }
    }
});

const url = document.currentScript.getAttribute('playlist');
const width = document.currentScript.getAttribute('width') || 300;
const height = document.currentScript.getAttribute('height') || 600;
const container_name = document.currentScript.getAttribute('container') || 'playlist';

const iframe = document.createElement('iframe');
iframe.src = url;
iframe.width = width;
iframe.height = height;
document.currentScript.after(iframe);
