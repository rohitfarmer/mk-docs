# Setup MiniDLNA Server
`sudo apt-get install minidlna`

Now edit
`sudo vi /etc/minidlna.conf`

enter the media location.
`media_dir=A,/var/lib/minidlna/music`

Restart the daemon for changes to take effect.
`sudo service minidlna restart`

To rebuild the database use:
`sudo service minidlna force-reload`