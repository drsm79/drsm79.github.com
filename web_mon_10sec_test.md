---
layout: default
ilp: $ilp.uphold.com/8nXNaqNam4Ym
categories: web
tags:
    - musicians
    - micropayments
    - xrp
    - web monetisation
    - streaming
---

I want to do some goofy tests of how Coil pays out. This page will redirect the micro payments after 10 seconds from {{ page.ilp | default: site.ilp}} to {{site.ilp}}.

Please stick around....

<h1 id="countdown"></h1>
<pre id="message"></pre>

<script>
if (document.monetization) {
    document.monetization.addEventListener('monetizationstart', () => {
        if (document.getElementById("countdown").textContent == 'Fin'){
            console.log("we've been through this before...");
        } else{
            document.getElementById("countdown").textContent = 10;
            var seconds = document.getElementById("countdown").textContent;
            var countdown = setInterval(function() {
                seconds--;
                document.getElementById("countdown").textContent = seconds;

                if (seconds <= 0) {
                    clearInterval(countdown);
                    document.getElementById("countdown").textContent = 'Fin';
                    const metas = document.getElementsByTagName('meta');
                    for (let i = 0; i < metas.length; i++) {
                        if (metas[i].getAttribute('name') === 'monetization') {
                            metas[i].content = "{{site.ilp}}";
                        }
                    }
                    document.getElementById("message").textContent = ` ________________________
< thanks for hanging out >
 ------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     || `;
                }
            }, 1000);
        }
    });
}
</script>

This has mainly been done as a bit of a learning exercise  (yay ES6 back tic strings and the `default:` liquid filter), but also hopefully helps see how the Coil algorithm works.
