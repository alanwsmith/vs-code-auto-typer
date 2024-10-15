# vs-code-auto-typer

An auto-typer for VS Code

## Overview

This extension is designed to automatically type out text
in a VS Code window for screen recordings. It's more of
a "works-on-my-machine" prototype than production code, but
I'm including directions for running it if you want to
give it a shot. 

(This was also my very first VS Code extension so it's
pretty hacky. If you look at it and are like "what
they hell was he thinking?" the answer is "huh, I wonder
what the hell this thing does") 

## Usage

- Clone the Git repo down to your local machine:

git clone git@github.com:alanwsmith/vs-code-auto-typer.git

- Open VS Code and use the "File -> Open Folder..." menu 
item to open the folder you just cloned down. 

- Update the fileData path in the extension.js file to
point to your input script

- Hit `F5` which will open a new window with the title
like:

[Extension Development Host] Search

- Make a new file with Command+n

- Open the VS Code Command Palette with Command+Shift+p

- Search for "Auto-Type The Script" and run the command

- You should see the latest script auto typed out.

## Notes

- I haven't done an install of this extension yet. 
I just run it from the dev process. 


## TODO

- Document how the commands you can use in the 
scripts (In the mean time, crack open the file, take
a look, and play around with it to see what it does)

- Maybe convert this to type script

- Figure out how to automatically create the
new file



-- ref
-- title: Your First VS Code Extension
-- url: https://code.visualstudio.com/api/get-started/your-first-extension

