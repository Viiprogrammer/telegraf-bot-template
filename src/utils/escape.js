const replaceAll =
  String.prototype.replaceAll ??
  function (searchValue, replaceValue) {
    return this.split(searchValue).join(replaceValue)
  }

const MarkdownV2EscapeList = [
  '_',
  '*',
  '[',
  ']',
  '(',
  ')',
  '~',
  '`',
  '>',
  '#',
  '+',
  '-',
  '=',
  '|',
  '{',
  '}',
  '.',
  '!'
]

const MarkdownV1EscapeList = ['_', '*', '`', '[']

const HTMLEscapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
}

/**
 * @param {String} text
 *
 * @returns {String}
 */
const escapeHTML = (text) =>
  Object.keys(HTMLEscapeMap).reduce(
    (oldText, charToEscape) =>
      replaceAll.call(oldText, charToEscape, HTMLEscapeMap[charToEscape]),
    text
  )

/**
 *
 * @param {String} text
 * @returns {String}
 */
const escapeMarkdown = (text) =>
  MarkdownV2EscapeList.reduce(
    (oldText, charToEscape) =>
      replaceAll.call(oldText, charToEscape, `\\${charToEscape}`),
    text
  )

/**
 *
 * @param {String} text
 * @returns {String}
 */
const escapeMarkdownV1 = (text) =>
  MarkdownV1EscapeList.reduce(
    (oldText, charToEscape) =>
      replaceAll.call(oldText, charToEscape, `\\${charToEscape}`),
    text
  )

/**
 * @callback EscapeFunction
 * @param {String} text
 * @returns {String}
 */

/**
 * @callback TagEscapeFunction
 * @param {TemplateStringsArray} template
 * @param {...any} substitutions
 * @returns {String}
 */

/**
 * @private
 * @param {EscapeFunction} escape
 * @returns {TagEscapeFunction}
 */
const escapeTag =
  (escape) =>
    (template, ...substitutions) =>
      String.raw(
        template,
        ...substitutions.map((substitution) =>
          escape(
            String(substitution ?? (substitution === null ? 'null' : 'undefined'))
          )
        )
      )

/**
 * @type {TagEscapeFunction}
 */
const HTML = escapeTag(escapeHTML)

/**
 * @type {TagEscapeFunction}
 */
const md = escapeTag(escapeMarkdown)

/**
 * @type {TagEscapeFunction}
 */
const mdv1 = escapeTag(escapeMarkdownV1)

module.exports = {
  escapeHTML,
  escapeMarkdown,
  escapeMarkdownV1,
  HTML,
  md,
  mdv1
}
