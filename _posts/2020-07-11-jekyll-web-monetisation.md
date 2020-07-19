---
layout: post
title: Jekyll & web monetisation
categories: web
tags:
    - coding
    - jekyll
    - payid
    - blogging
    - micropayments
    - xrp
    - web monetisation
---
As you may have noticed, I've been playing with [WebMonetisation][] [a bit][1] [recently][2]. It's an interesting idea, and the kind of thing I'd like to see take off. I've updated this site to be "web monetised" and thought I'd explain how I'd done it.

My friend [Matt][] has a nice [history of web monetisation][history] blog if you want a bit of backgroudn & context.

## Anything you can do, I can do `<meta>`

The key thing to enable web monetisation is a meta tag. For this site thats:

```html
  <meta name="monetization" content="{{site.ilp}}">
```

This "payment pointer" tells the [Coil][coil] plugin where to direct your micropayments. The "payment pointer" `{{site.ilp}}` is the address of a wallet in my [Uphold][] account (I have two, one for this site one for [anechoics]). Setting up [a web monetisation supporting wallet is nicely documented here][wallet].

## Layouts

So, you've got a payment pointer, what now? Well, this site is generated using [Jekyll][], so the first thing I did was add the "payment pointer" to a new [site variable][] `ilp`. This means I can put {% raw %}`{{site.ilp}}`{% endraw %} anywhere in the site and have the payment pointer show up - handy if I ever want to change it.

Next I want to use that variable to put the `<meta>` tag on all the pages. Jekyll uses layouts & includes to build the html content of the site, and for this site the html `<head>` is set up in `_includes/head.html`. Heres the full content of that file:

{% raw %}
```html
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="monetization" content="{{site.ilp}}">
  <title>{% if page.title %}{{ page.title }}{% else %}{{ site.title }}{% endif %}</title>
  <meta name="description" content="{% if page.excerpt %}{{ page.excerpt | strip_html | strip_newlines | truncate: 160 }}{% else %}{{ site.description }}{% endif %}">
  {% if page.track %}
  <meta property="og:title" content="{{page.track.title}}" />
  <meta property="og:type" content="music.song" />
  <meta property="og:url" content="{{ page.track.mp3 | absolute_url }}" />
  <meta property="og:image" content="{{page.track.cover}}" />
  <meta property="og:site_name" content="Metsonet" />
  {% endif %}
  <link rel="stylesheet" href="{{ "/css/main.css" | prepend: site.baseurl }}">
  <link rel="canonical" href="{{ page.url | replace:'index.html','' | prepend: site.baseurl | prepend: site.url }}">
  <link rel="alternate" type="application/rss+xml" title="{{ site.title }}" href="{{ "/feed.xml" | prepend: site.baseurl | prepend: site.url }}">
</head>
```{% endraw %}

Nothing too exciting, the key bit is the fifth line where that `monetization` lives. Because this include is used to build every page, every page on the site will now have monetisation enabled. Neat.

## But that's not all...

There's a new-ish standard emerging with a goal of making sending payments as easy as sending email, called [PayID][payid]. Why not set one of these up while we're here?

Jekyll will "render" any file that has a yaml header, even an empty one.

```
---
---
```
<div class="caption">An empty yaml header. Exciting, no?</div>

This means we can make the PayID file, and have it populated with the same payment pointer as used in the meta tag. The PayID file is a json blob, containing a list of one or more payment pointers. Here's the one I use on this site:

{% raw %}
```json
---
---
{
  "addresses": [
    {
      "paymentNetwork": "ILP",
      "environment": "MAINNET",
      "addressDetailsType": "CryptoAddressDetails",
      "addressDetails": {
        "address": "{{site.ilp}}"
      }
    },
    {
      "paymentNetwork": "XRPL",
      "environment": "TESTNET",
      "addressDetailsType": "CryptoAddressDetails",
      "addressDetails": {
        "address": "rGFzdwNWDuVBwVN3Rn3vwrx4ZNi8FBGVZX"
      }
    }
  ],
  "payId": "{{page.name}}${{site.url}}"
}
```{% endraw %}

The second address is a wallet used for [testing][2]. This means, when uploaded, I have the necessary PayID file, and could recieve payments to `pay$metsonet.co.uk`. You can check that everything is copacetic by visiting [this validator](https://payidvalidator.com/) and pointing it to your payid.

PayID is still pretty new, but you could imagine a PayID taking over from the meta tag, or becoming a fallback option.

## Verifying

If you want to check that you've got everything set up, shimmy over to [Coil][], set up an account with them and install the browser plugin. Then visit your site - you should see the Coil plugin become active and a little while later "funds" land in your wallet. Or [tweet me][] & I'll check ;)

[WebMonetisation]: https://webmonetization.org/
[1]: {% post_url 2020-07-01-PayID-Functions-Twitch %}
[2]: {% post_url 2020-07-03-PayID-Functions-Twitch-part-2 %}
[coil]: https://coil.com/
[Uphold]: https://uphold.com/
[wallet]: https://webmonetization.org/docs/ilp-wallets
[history]: https://coil.com/p/hammertoe/Brief-History-of-Web-Monetization/BGlAVtZen
[Matt]: https://twitter.com/hammertoe
[anechoics]: https://anechoics.uk
[Jekyll]: https://jekyllrb.com
[site variable]: https://jekyllrb.com/docs/variables/#site-variables
[payid]: https://payid.org/
[tweet me]: https://twitter.com/drsm79