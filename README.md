# Discord-chat-commands
Add some personality to your next discord message with 5 special chat commands.

## Usage
all commands are issued using the following format
\<command>\<args>~\<content>

so if you wanted to send the message "hello friend" such that it rotates 10 times, you would write

```rotate 10~hello friend```


## All commands 

* rotate \<count>~\<content>
    * rotates message $content $count times
* hungry~\<content>
    * slowly consumes $content and finally delete message.
* reveal~\<content>
    * slowly reveals $content
* wrap \<count> \<wrap_a> \<wrap_b>~\<content>
    * alternates $wrap_a and $wrap_b around $content $count times
* wof~\<content>
    * spins a giant text wheel
