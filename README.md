# NOTE: THIS REQUIRES AN AUTH TOKEN; DO NOT MISTAKE THIS AS RCE
# Discord corruptor

Utilizes an exploit I found to disable a Discord account and allow bad actors to execute malicious code while disabling the victim.

# The exploit
The exploit starts by making an invalid patch request to the discord.com/api/v9/users/@me/settings-proto/1 endpoint and corrupting it with invalid paramaters. 
It makes an account unusable unless via the api. So, this allows attackers to cripple a victim while executing malicious code on the users account. Oh, and the user can't sign them out unless they make an api call to do so O_o

# Why I'm open sourcing
I'm open sourcing this project because Discord told me I couldn't get my account back because I broke the TOS. So to ensure a solution is found, lol, im open sourcing it >W<

So yes, out of pity.

# TECH SUPPORT NOT AVAILABLE, DO NOT ASK ME FOR TECH SUPPORT ON THIS PROGRAM
