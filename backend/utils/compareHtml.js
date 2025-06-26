// utils/domCompare.js
const { JSDOM } = require('jsdom');

exports.equalMarkup = (a = '', b = '') => {
  const norm = str => new JSDOM(str).window.document.body.innerHTML.trim()
                                    .replace(/\s+/g, ' ');   // collapse ws
  return norm(a) === norm(b);
};
