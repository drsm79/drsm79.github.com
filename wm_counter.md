---
title: Web Monetisation counter
categories: web
layout: default
tags:
- xrp
- micropayments
- web monetisation
- experiment
---
<audio src="/music/departures_and_beginnings.mp3" id="{{page.track.title}}" controls></audio><br/>
<ul class="horizontal small"><li>thanks to you, i've made <span id="total">nothing (yet)</span><span id="currency"></span></li></ul>

  <script>
    let total = 0
    let scale
    var tunes = document.querySelector('audio');
    if (document.monetization) {
      var startTime = Date.now();
      document.monetization.addEventListener('monetizationstart', ev => {
        console.log('Resuming/starting');
        startTime = Date.now();
        if (tunes.paused) {
          tunes.play();
        }
      });
      document.monetization.addEventListener('monetizationprogress', ev => {
        // initialize currency and scale on first progress event
        if (total === 0) {
          scale = ev.detail.assetScale
          document.getElementById('currency').innerText = ev.detail.assetCode
        }

        total += Number(ev.detail.amount)

        const formatted = (total * Math.pow(10, -scale)).toFixed(scale)
        document.getElementById('total').innerText = formatted
      });
      function stopEventHandler(event) {
        console.log(event);
        const millis = Date.now() - startTime;

        console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
        tunes.pause();

        alert("Hey, don't you want to pay me more monies?");
      }
      document.monetization.addEventListener('monetizationstop', stopEventHandler)
    }
  </script>
