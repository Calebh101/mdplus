# How to use an mde file

An mde file is named `<filename>.mde`.

- To compile to an html file: `mde compile html <filepath>`
- To compile to a markdown file: `mde compile md <filepath>`

Please note: when compiling to markdown, most config keys are not used. This is because the config is mainly meant for html files, as at the end of the day, a .mde file is just a markdown file with extra text. You don't have much control over translating something to itself.

# Format of an mde file

Configs are setup like this:

```md
<config>
...
</config>
```

Configs are read line-by-line, so they must be multiline. Configs should also be at the top or bottom of a file. Do not use quotes to signify a string, as quotes are interpreted as part of the string.

Example mde:

```md
<config>
linktarget=_blank # Inputted into each <a> element in generated HTML. Default: _blank
</config>

# Use markdown as normal
```

# Changelog

## Beta

### 0.0.0 - 3/2/25

- Initial (beta) release