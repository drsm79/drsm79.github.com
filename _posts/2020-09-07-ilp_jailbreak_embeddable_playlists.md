---
layout: post
category: web
title: Embeddable playlists & the ILP jailbreak
---

I've been building a [web monetized music platform][webmon], in my copious spare time. You may have even [heard][better] [some][pianos] [of it][shocking]. One thing I added a while back to this site is a [playlist][], built from all the posts that have direct link to a track, as opposed to one hosted on Bandcamp, Soundcloud or Spotify. That was nice, and it does a couple of cute things:

- auto-generated from music posts that use audio files hosted on this site, linking to those pages
- changes artwork with the tracks
- can "pop out" into its own window
- prompts about [Coil][coil] if not enabled

The next thing I wanted to do with it was have it be embedable, such that someone could put the playlist on their own page. Doing tht with a simple `<iframe>` is easy enough, but there's a sticking point. The whole point of this is to have the music be web monetized, and Coil's plugin (quite reasonably) blocks an `<iframe>` from requesting payment - I suspect because if this wasn't the case, one page could end up with hundreds of streams of payment, which would make everything complicated. This could make it easier for people to [hijack payments](https://github.com/WICG/webmonetization/issues/96), too.

So, this got me thinking. I wanted a simple (as in few character long) embed code that people could use (Bandcamp et. al use `<iframe>`), but also have the content set the ILP for the track playing, which means having a way to "jailbreak" the ILP pointer out of the `<iframe>`. Instead of a simple `<iframe>`, could this be done with a `<script>` (spoiler; yes, yes it could).

The solution is in two parts; the playlist & the embed script. The playlist page needs to be aware that it might be placed in an `<iframe>`, and if it is it needs to communicate the ILP for the track that's playing to its parent. This can be done via the [`postMessage` API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage), the relevant bit of code for this site is:

```
function sendILPToParent(ilp){
    if ( window.location !== window.parent.location ) {
        var data = {"playlist-ilp": ilp};
        parent.postMessage(data, "*");
    }
}
```

This checks to see if the page is in an `<iframe>`, and if it is sends the ILP via `postMessage` to the parent. Neat-o.

Now we need something on the other side. The [script](/playlist_embed.js) is pretty short, and I think fairly self explainatory. The relevant bit for the "jailbreak" is:

```
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
```

This listens for a `message` event, and on receiving one, proceeds to either update the monetization `<meta>` tag, or create one. What's nice is, because this is event based, when the track changes this can be invoked again, updating where the micropayments flow. You can see this in action [here][demo] and over on the [Anechoics site][demo_anechoics] - notably that's pulling in the script, playlist, music & images from another domain.

The script is configurable, on the embedding side, and those configurations are pulled out by the script via code like `document.currentScript.getAttribute('playlist');`. This means people could embed different playlists, configure size or styling etc. as they embed the music.

What's nice with this two part solution is that the `<iframe>` doesn't dictate what happens in the parent, it just sends up a message that the parent gets to choose what to do with. This prevents hijacking payments, to some extent. It also means that the embeded playlist is suitably decoupled from the parent - it just needs to send that message to route payments and otherwise focus on playing music.

[webmon]: {% post_url 2020-07-21-WebMonetiztion-for-musicians %}
[better]: {% post_url 2020-08-10-better %}
[pianos]: {% post_url 2020-08-10-5pianos %}
[shocking]: {% post_url 2020-08-10-absolutely-shocking %}
[playlist]: /playlist
[coil]: https://coil.com/
[demo]: https://metsonet.co.uk/embedded_no_ilp
[demo_anechoics]: https://anechoics.uk/playlist_test.html