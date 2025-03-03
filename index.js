"use strict";
const { marked } = require("marked");
const { error } = require('./_api.js');
const cheerio = require('cheerio');
function html(text) {
    const regex = /<config>(.*?)<\/config>/s;
    const config = text.match(regex);
    const result = {};
    if (config !== null) {
        const lines = config[0].trim().split('\n');
        text = text.replace(/<config>(.*?)<\/config>/s, '');
        lines.forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                result[key.trim()] = value.trim();
            }
        });
    }
    const html = cheerio.load(marked.parse(text.trim()));
    html('a').each((i, element) => {
        var _a;
        html(element).attr('target', ((_a = result.linktarget) !== null && _a !== void 0 ? _a : "_blank"));
    });
    return html.html();
}
function md(text) {
    const regex = /<config>(.*?)<\/config>/s;
    const config = text.match(regex);
    const result = {};
    if (config !== null) {
        const lines = config[0].trim().split('\n');
        text = text.replace(/<config>(.*?)<\/config>/s, '');
        lines.forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                result[key.trim()] = value.trim();
            }
        });
    }
    const content = text.trim();
    return content;
}
module.exports = {
    html,
    md,
};
