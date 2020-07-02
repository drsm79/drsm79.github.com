---
title: PayID & Cloud Functions live coding Twitch
layout: video
date:   2020-07-01
categories: projects 
twitch_id: 665878889
cinnamon_id: 354028607502288450
tags: coding python payid micropayments serverless twitch
---

Yesterday I got on a Twitch video stream with my friend & colleague [Matt Hamilton](https://twitter.com/hammertoe). He's been talking about micropayments, interledger, XRP etc. for some time, and with lockdown I've been thinking about it a bit more. It seems like a nice way to address "the original sin" of the web, and let people pay for what they consume without giving away their entire online selves (and that of the rest of their social network, too...). 

To that end I've created a [Coil](https://coil.com/) account, and set up the necessary meta tag on these pages to enable the WebMonetisation standard. If you have the Coil plugin or are using [Puma](https://www.pumabrowser.com/), thanks! 

<p><span id="total"></span><span id="currency"></span></p>

Matt & I started discussing ways that this technology could be used, and the idea of using it with github (other social coding sites exist...) came up. Initially it was just hosting a [PayID](https://payid.org/) via github pages:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Want to host a PayID on a Github Pages site? Well... turns out you can! So you can have a PayID like pay$hammertoe.github.io <a href="https://t.co/xW3v0c9Vdv">https://t.co/xW3v0c9Vdv</a></p>&mdash; Matt Hamilton (@HammerToe) <a href="https://twitter.com/HammerToe/status/1274473564633268225?ref_src=twsrc%5Etfw">June 20, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

But that then ballooned into something a bit more involved. Could you support developers by paying them for contributions via PayID? Well, we thought we'd give it a shot. 

Below is part one of two (or maybe three...) where we start to build up a thing that pays the contributor for their work, via PayID & the interledger.

It was quite fun, despite a bit of a scramble to get the streaming & code sharing working, and I'm looking forward to doing part two later this week/early next. I'm also thinking about twitching some music making in the not too distant future...

  <script>
    let total = 0
    let scale

    if (document.monetization) {
      document.monetization.addEventListener('monetizationprogress', ev => {
        // initialize currency and scale on first progress event
        if (total === 0) {
          scale = ev.detail.assetScale
          document.getElementById('currency').innerText = ev.detail.assetCode
        }

        total += Number(ev.detail.amount)

        const formatted = (total * Math.pow(10, -scale)).toFixed(scale)
        document.getElementById('total').innerText = "Thanks to you, I've made " + formatted + "!"
      })
    }
  </script>
