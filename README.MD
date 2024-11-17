# Discord Bot Template

## Usage

Template for quick creation of a discord bot.

Meant as a boilerplate for further development.


<br>



## To-Do List / Features Planned

Major:

- Modules
    - Enable or Disable modules easily with Database or JSON

- Database Handler
    - Make everything dynamic so you can e.g set welcome channel id by command
    - Proper error handling and rollback so a database error won't halt everything

- Analytics & Stats
    - Track Command Usage & Events
        - Globally & Per Server

---

Modules:

- Welcome
    - Message, Embed, or Custom Image
    - Commands to set channel

- Auto Roles
    - Auto Role on Join
    - Timed Auto Roles
        - Example: 1 year role
    - Joinable Roles

- Auto Moderation
    - Mute users on specific words

- API Integration 
    - JS Class
---


Commands:

- Message Sender
    - Normal Messages & Embeds
    - List of pre-made in either json or database

- Note System
    - Personal Notes
    - Guild Wide Notes

- Purge
    - Subcommands:
        - Any (Any message type)
        - Bots (Sent by bots)
        - Humans (Sent by humans (non-bots))
        - Images (Messages containing images)

- Avatar
    - Get specific users avatar

- Reminders
    - Minutes/Hours from now & reminder message

- Auto Message
    - Send periodic messages in a channel with pre-defined messages