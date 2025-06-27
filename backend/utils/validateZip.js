const AdmZip = require('adm-zip');

/**
 * Validate a user-uploaded zip buffer
 * @param {Buffer} buf - the raw zip file
 * @param {string[]} mustContain - exact relative paths expected
 * @returns {{ ok:boolean, missing:string[] }}
 */
module.exports = function validateZip (buf, mustContain = []) {
  const zip = new AdmZip(buf);
  const entries = zip.getEntries().map(e => e.entryName.replace(/\\/g,'/'));
  const missing = mustContain.filter(f => !entries.includes(f));
  return { ok: missing.length === 0, missing };
};
