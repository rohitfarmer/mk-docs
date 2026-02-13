---
comments: true
---

# Commands to configure Weechat IRC client

## Access servers and channels
```bash
# List configured servers in Weechat
/server list

# Connect a server
/connect <server name>

# Join and quite a channel
/join #channel
/part [quit message]

# close a server
/close

# Disconnect a server
/disconnect

# Delete a server and all it's settings permanently
/server del <server name>
```

## Add and configure an IRC server
I have network specific commands below for easy copy and paste.

### Libera
If you do not already have a registered nick/username with libera.chat then first use their web based chat client to register one. I found it hard to connect to the server on Weechat using SSL without a user name and password.

[Libera web chat client](https://web.libera.chat/)

Once you have a registered nick name follow the commands below to configure Weechat.

[Configuring SASL for WeeChat](https://libera.chat/guides/weechat)
```bash
# Add server

/server add libera irc.libera.chat/6697 -ssl

# Provide your login details
/set irc.server.libera.sasl_mechanism plain
/set irc.server.libera.sasl_username <nickname>
/set irc.server.libera.sasl_password <password>
/save

# Set nick etc
/set irc.server.libera.nicks "mynick,mynick2,mynick3,mynick4,mynick5"
/set irc.server.libera.username "My user name"
/set irc.server.libera.realname "My real name"
```

### DALnet
```bash
# Add server
/server add dalnet irc.dal.net/6697 -ssl

# Configure user information
/set irc.server.dalnet.nicks "mynick,mynick2,mynick3,mynick4,mynick5"
/set irc.server.dalnet.username "My user name"
/set irc.server.dalnet.realname "My real name"

/set irc.server.dalnet.command "/msg NickServ@services.dal.net IDENTIFY <password>"

# Autoconnect upon opening weechat
/set irc.server.dalnet.autoconnect on

# Invalid SSL error/warning
/set irc.server.example.ssl_verify off
```

## Colors
```bash
/set env TERM screen-256color
/upgrade
```

## Logging
```bash
# Log only user chat in channel or in private window
/set logger.level.irc 1

# Log chats in seprate folders per network
/set logger.mask.irc "irc/$server/$channel.weechatlog"
```

## Mouse
```bash
/set weechat.look.mouse on
/mouse enable
```

## Spelling
```bash
/set spell.check.default_dict "en"
Alt + s
```

## Buffer nesting

By default, server buffers are merged with WeeChat core buffer. To switch between the core buffer and server buffers, you can use `Ctrl+x`.

It is possible to disable auto merge of server buffers to have independent server buffers:

```bash
/set irc.look.server_buffer independent
```

## Filters
```bash
/set irc.look.smart_filter on
/filter add irc_smart * irc_smart_filter *

/filter add joinquit * irc_join,irc_part,irc_quit *

/filter add quit * irc_quit *

To toggle Alt + =
```

## Click on Links
```bash
/window bare
or
Alt + l

then ctrl + click
```