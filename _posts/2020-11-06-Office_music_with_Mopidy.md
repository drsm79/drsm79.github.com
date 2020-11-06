---
layout: post
category: music
tags:
  - geeky
  - mopidy
  - python
  - lockdown
title: Office music with Mopidy
---
Since lockdown began in March (it was March, wasn't it?) I've been working from home. This too a while to get used to - my short drive to/from the office put my brain in gear - but is now "the new normal".

One of the little benefits of working from home is that I can listen to music more. I don't much like wearing headphones, especially not all day, so when in the office I don't usually listen to music. But at home I have a stereo and can put on tunes to my hearts content (currently listening to Bill Callahan's "Gold Record").

I have tried a few variations on the theme of "Spotify going into the stereo", using either an old Mac Mini or plugging in my phone. During lockdown (I forget when...) I switched things up a bit and got a raspberry pi 4 to work as my music source. This runs [Mopidy](https://mopidy.com/) and the [Iris UI](https://github.com/jaedb/Iris).

> Mopidy plays music from local disk, Spotify, SoundCloud, TuneIn, and more. You can edit the playlist from any phone, tablet, or computer using a variety of MPD and web clients

The pi is a great piece of kit, and Mopidy is a nicely written bit of software that's easily installed and configured. It means I can line up tracks, "discover" them etc. and just have a nice stream of music coming into my earholes.

I've had to prod Alsa a few times, it seems a recent update (or possibly me plugging something in differently) has made the soundcard device move around a bit. Not to worry, this can be configured in `/etc/asound.conf`.

First find the device you want to use with `sudo aplay -l`:

```sh
$ sudo aplay -l
**** List of PLAYBACK Hardware Devices ****
card 0: b1 [bcm2835 HDMI 1], device 0: bcm2835 HDMI 1 [bcm2835 HDMI 1]
  Subdevices: 4/4
  Subdevice #0: subdevice #0
  Subdevice #1: subdevice #1
  Subdevice #2: subdevice #2
  Subdevice #3: subdevice #3
card 1: b2 [bcm2835 HDMI 2], device 0: bcm2835 HDMI 2 [bcm2835 HDMI 2]
  Subdevices: 2/2
  Subdevice #0: subdevice #0
  Subdevice #1: subdevice #1
card 2: Headphones [bcm2835 Headphones], device 0: bcm2835 Headphones [bcm2835 Headphones]
  Subdevices: 1/2
  Subdevice #0: subdevice #0
  Subdevice #1: subdevice #1
card 3: sndrpihifiberry [snd_rpi_hifiberry_dac], device 0: HifiBerry DAC HiFi pcm5102a-hifi-0 [HifiBerry DAC HiFi pcm5102a-hifi-0]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
```

I want to use the `Headphones` device, so my `/etc/asound` looks like:

```
pcm.!default {
       type hw
       card Headphones
}

ctl.!default {
        type hw
        card Headphones
}
```

Onec configured, you can verify with `aplay /usr/share/sounds/alsa/Front_Center.wav`.

You can also do this in the mopdiy config file `/etc/mopidy/mopidy.conf` (for example, if you wanted mopidy to use a different device to the default):

```ini
[audio]
mixer_volume = 100
output = alsasink
device=hw:Headphones
```

Once you've got the config how you want, restart mopidy:

```
sudo systemctl restart mopidy
sudo systemctl status mopidy
```