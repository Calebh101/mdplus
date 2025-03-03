# How to use an mdplus file

An mdplus file is named `<filename>.mdp`.

- To compile to an html file: `mdplus compile html <filepath>`
- To compile to a markdown file: `mdplus compile md <filepath>`

Please note: when compiling to markdown, most config keys are not used. This is because the config is mainly meant for html files, as at the end of the day, a .mdp file is just a markdown file with extra text. You don't have much control over translating something to itself.

# Format of an mdplus file

Configs are setup like this:

```md
<config>
...
</config>
```

Configs are read line-by-line, so they must be multiline. Configs should also be at the top or bottom of a file. Do not use quotes to signify a string, as quotes are interpreted as part of the string.

Example mdplus:

```md
<config>
linktarget=_blank # Inputted into each <a> element in generated HTML. Default: _blank
</config>

# Use markdown as normal
```