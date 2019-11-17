Manage-bot V2
==================

Usage:
```JS
![Command]§ [...Args]
```

---
# Example: event Command
```PT
!event§ Some Info to go here 
```
*Output:*

![alt](./simple&#32;Event.png)

The easy way or to make it pretty: 

```
!event§ --title "this is the Title" --dessc "Info goes here" --lfg --thumb "random"
```

![alt](./Pretty&#32;Event&#32;--lfg&#32;--thumb&#32;random.png)

`--lfg` and `--thumb` are optional as well as `--title` and `--desc` however `--title` will not work without `--desc` and vise versa.

`--lfg` and `thumb` can work alone and without any input.

# Command: --thumb [...args]
```
--thumb => will display the standart thumbnail 

but can take :

--thumb ["random", "[Link to gif or picture]"]

e.g.
--thumb "random" => display a random  gif from a collection

== or:
--thumb "https://media.giphy.com/media/j3sY3hvOhMz9QriWQq/giphy.gif" 
=>display the given thumbnail
```

Note: _Link needs to point to a .gif or .png .jpg file. & .webm is not supported by discord._

---

# Command: delete [messageID\<snowflake\>]

```
!delete§644656730013171722
```
This will delete the specified message. Recomended way of deleteing events.

Right-click => delete message will not delete the message from the bots database.


# Command: fullEmbed [..args]

```
!fullEmbed§ --[arg] "input"
```
To provide acess to the embeded obj bots can create the user can specify every js method as --[arg] and the corresponding input.
for fields with multiple input just use the --[arg] again and specify the second parameter.

e.g
```
!fullEmbed§ --setAuthor "Author name" --setAuthor "Autor URL" --addField "Field Title" --addField "Field Desc."
```

this will get messy but it provides a way to implement compleatly custom Embeded Objects.

a list of all methods that can be applied to the \<RichEmbed\> can be found in the [discord.js](https://discord.js.org/#/docs/main/stable/class/RichEmbed) docs.
