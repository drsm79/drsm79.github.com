---
layout: post
title: WebMonetization for musicians
categories: web
tags:
    - musicians
    - micropayments
    - xrp
    - web monetisation
    - streaming
---
It's no secret that streaming platforms are kind of broken today when it comes to paying artists for their plays. While they know exactly who has listened to what, the way pay is allocated favours established artists, especially those signed to major labels. It's got to the point that people recommend [being on streaming platforms solely to raise awareness](https://blog.discmakers.com/2019/08/what-does-music-streaming-actually-pay/), and use those platforms to drive sales or merchandise and physical media.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Why the music industry HAS to change and why it has to change now. A thread. Stick with it!</p>&mdash; Tom Gray #BrokenRecord (@MrTomGray) <a href="https://twitter.com/MrTomGray/status/1249290407088881675?ref_src=twsrc%5Etfw">April 12, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

What if there was a way where you could pay £5 a month to have all the content creators whose work you enjoy online paid directly, based on how much you consumed? Magazines, blogs, musicians, film makers, artists, all compensated based on the actual amount of time people spend enjoying their work.

Well, turns out [there is][coil]. And it's not just a nice idea, it's getting some [serious attention][nast].

## What is this?

Coil uses a piece of technology called the [Interledger protocol (ILP)][ilp]. This allows someone to make a public address for a wallet and have payments sent to it. What Coil have built on top of that, using [WebMonetization][wm] is a way for consumers to pay into a pot of money & stream payment to an ILP wallet while they enjoy "content" on the web.

## How does this help?

This means, by setting up a [wallet][uphold] & adding a pointer to it in a pages `<head>` you can receive micropayments from people who have a Coil account. There's no middleman (other than Coil), and you get paid for what people are listening to.

```html
  <meta name="monetization" content="{{site.ilp}}">
```
<div class="caption">The payment pointer for this site</div>

In some quick tests (I hope to do something more substantial in the future), streaming [a song][song] earns about 4p worth of XRP. I think Coil have some weighting on that, such that a person can't game the system, so might go down if the same person listens to you a lot. It's also time dependent, ideal for [people writing 10+ minute prog opuses][anechoics].

What's nice is that it puts the creator in control. All you need is the [ILP tag on your web page][jekyll] and you're set. There are ways in which you could restrict access to content such tht only those with the Coil plugin can get to it, but that seems counter productive - at least in my case. You can share revenue between collaborators in [various ways][prs], too.

You could also see how someone could build & fund a platform, for example by the platform getting the first 10 seconds of micropayments.

## Downsides

I think the biggest downside is the lack of platform effects. Until there is some sort of platform, or way of musicians linking up with one another ([remember webrings?][webrings]) it's going to be down to how good you are at self promotion.

Related but different to the platform effects is that Coil is still new. This means that you're going to need to convince people to sign up to some new fangled thing, and it's not just built into their existing tools (e.g. you need to install a browser plugin on a laptop, or switch to using [Puma][puma] on mobile). I think that gets simpler as and when a platform emerges, and as this becomes more mainstream - "sign up to Coil to pay me for what you listen to, and get access to Wired for free!"

To their credit, Coil are trying to [broaden the ecosystem][gftw]. They provide a [blogging site][coil-blog] & have partnered with [Cinnamon][cinnamon]. Since the technology is standards based you can see how others could come and broaden the ecosystem.

Lastly, there aren't many places that take XRP - you can't go to any old coffee shop & buy a drink with it (yet). It also fluctuates in value, like all crypto currencies, so it's possible your earnings evaporate if you don't regularly cash them in. I don't know if Coil do the correct exchange rate, such that your £5/month translates into the right amount of XRP each time, I'm guessing they don't currently.

## Fin

I think it's worth doing the 10 minutes of work to add the ILP meta tag to your site. Even if you don't actively promote it or try to encourage people to enjoy your content via Coil, why wouldn't you?

I don’t really have a platform, and I’m not exactly Radiohead so it’s hard to gauge the algorithm, but I’ve made £3 from people (mainly me!) visiting my site in about three weeks. I’m willing to bet that there are artists out there that could convince enough fans to sign up with [Coil][coil] to see a decent revenue stream via micropayments.

Its also not hard to imagine a music player app which helps build up the platform effects, while still streaming payment directly to the artists being listened to. I think I'm going to see if I can build such a thing in my copious spare time...

[coil]: https://coil.com/
[wm]: https://webmonetization.org/
[nast]: https://www.crypto-news-flash.com/ripple-one-of-the-largest-media-companies-worldwide-opts-for-coil/
[song]: {% post_url 2020-07-6-Departures_and_beginnings %}
[anechoics]: https://anechoics.uk/
[jekyll]: {% post_url 2020-07-11-jekyll-web-monetisation %}
[webrings]: https://twitter.com/drsm79/status/1281718465540349953
[puma]: https://www.pumabrowser.com/
[gftw]: https://twitter.com/Coil/status/1173582366054461441
[ilp]: https://interledger.org/
[uphold]: https://support.uphold.com/hc/en-us/articles/360043227832-How-to-find-your-ILP-address-Interledger-payment-pointer-
[prs]: https://webmonetization.org/docs/probabilistic-rev-sharing
[coil-blog]: https://coil.com/u/drsm79
[cinnamon]: https://www.cinnamon.video/about