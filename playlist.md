---
layout: default
category: playlists
ilp: $ilp.uphold.com/iEfixMhH9dmp
---

<center>
    <div class="music_player" id="player">
        <img src="" alt="" />
        <audio src="" id="" controls></audio>
        <div id="playlist" />
    </div>
</center>
<script>
    var player = document.getElementById('player');
    var cover = player.querySelector('img');
    var audio = player.querySelector('audio');
    function sendILPToParent(ilp){
        if ( window.location !== window.parent.location ) {
            var data = {"playlist-ilp": ilp};
            parent.postMessage(data, "*");
        }
    }
    sendILPToParent("{{ page.ilp }}");
    function openPopout(){
        audio.pause();
        window.open(
            "{{page.url | absolute_url }}",
            "PlaylistPlayer",
            "resizable=no,scrollbars,status,width=300,height="+player.offsetHeight
        ).focus()
    }
    function addMessage(content){
        var message = document.createElement("div");
        message.style.cssText = 'font-size: 60%';
        message.innerHTML = content;
        var playlist = document.querySelector('#playlist');
        player.insertBefore(message, playlist);
        var newHeight = player.offsetHeight + message.offsetHeight;
        player.style.height = newHeight + 'px';
    }
    function changeILP(ilp){
        const metas = document.getElementsByTagName('meta');
        for (let i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute('name') === 'monetization') {
                metas[i].content = ilp;
            }
        }
        sendILPToParent(ilp);
        console.log('now streaming payments to ' + ilp);
    }
    function playTrack(track) {
        console.log('playing: ' + track.track.title);
        cover.src = track.track.cover;
        cover.alt = track.track.title;
        audio.src = track.track.mp3;
        audio.id = track.track.title;
        ilps = track.ilp;
        var the_ilp = ilps;
        if (Array.isArray(ilps)) {
            the_ilp = ilps[Math.floor(Math.random() * Math.floor(ilps.length))];
        }
        changeILP(the_ilp);
        if (audio.paused || !audio.currentTime) {
            audio.play();
        }
    }
    function clearPlaylistStyles(){
        document.querySelector('header').remove();
        document.querySelector('footer').remove();
        document.querySelector('.page-content').style.padding = 0;
        document.querySelector('body').style.padding = 0;
        document.querySelector('.wrapper').style.padding = 0;
        document.querySelector('.page-content').style.margin = 0;
        document.querySelector('body').style.overflow = 'hidden';
        document.querySelector('html').style.overflow = 'hidden';
    }
    function doMonetise(){
        if (document.monetization) {
            addMessage("If you're enjoying this playlist you can <a href='{{page.url | absolute_url }}' target='PlaylistPlayer' onclick='openPopout(); return false;' title='This link will create a new window or will re-use an already opened one'>popout the player</a>");
        } else {
            addMessage("If you like this track, consider using <a href='https://coil.com'>Coil</a> to support it.");
        }
    }
    function renderPlaylist(tracks){
        // TODO: style the list, alternate colours
        var container = document.querySelector('#playlist');
        var playlist = document.createElement("ul")
        container.appendChild(playlist);
        for (let i = 0; i < tracks.length; i++) {
            var entry = document.createElement("li");
            var play = document.createElement("button");
            play.onclick = function(){
                playTrack(tracks[i]);
            }
            play.innerHTML = "play";
            entry.appendChild(play);
            content = ' | ';
            entry.appendChild(document.createTextNode(content));
            var link = document.createElement("a");
            link.href =  tracks[i].post;
            link.target = '_top';
            link.appendChild(document.createTextNode(tracks[i].track.title));
            entry.appendChild(link);
            playlist.appendChild(entry);
        }
        var newHeight = player.offsetHeight + container.offsetHeight + 10;
        player.appendChild(container)
        player.setAttribute('style', 'height:' + newHeight + 'px');
    }
    var position = 0;
    var tracks = [{% for page in site.posts %}
    {% if page.track %}
    {
        "track": {{ page.track | jsonify }},
        "post": {{ page.url  | jsonify }},
        "ilp": {{ page.ilp | jsonify }}
    }{% unless forloop.last %}, {% endunless %}
    {% endif %}
    {% endfor %}]
    audio.addEventListener('ended', (event) => {
        position += 1;
        if (position >= tracks.length) { position = 0 };
        console.log('Up next: ' + tracks[position].track.title);
        playTrack(tracks[position]);
    });

    window.setTimeout(function(event){
        if (document.documentElement.clientWidth <= 330){
            clearPlaylistStyles();
        } else {
            doMonetise();
        }
        renderPlaylist(tracks);
        playTrack(tracks[position]);
    }, 5
    )
</script>
