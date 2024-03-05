# Commands to configure Weechat IRC client

## Add and configure an IRC server
```
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

## Connect to server and join channels
```
/connect dalnet

# Join and quite a channel
/join #channel
/part [quit message]

# close a server
/close

# Disconnect a server
/disconnect
```

## Colors
```
/set env TERM screen-256color
/upgrade
```

## Logging
```
# Log only user chat in channel or in private window
/set logger.level.irc 1

# Log chats in seprate folders per network
/set logger.mask.irc "irc/$server/$channel.weechatlog"
```

## Mouse
```
/set weechat.look.mouse on
/mouse enable
```

## Spelling
```
/set spell.check.default_dict "en"
Alt + s
```

## Buffer nesting

By default, server buffers are merged with WeeChat core buffer. To switch between the core buffer and server buffers, you can use `Ctrl+x`.

It is possible to disable auto merge of server buffers to have independent server buffers:

```
/set irc.look.server_buffer independent
```

## Filters
```
/set irc.look.smart_filter on
/filter add irc_smart * irc_smart_filter *

/filter add joinquit * irc_join,irc_part,irc_quit *

/filter add quit * irc_quit *

To toggle Alt + =
```

## Click on Links
```
/window bare
or
Alt + l

then ctrl + click
```