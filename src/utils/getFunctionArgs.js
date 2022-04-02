/**
 * Parsing function arguments names
 * @param fn {function}
*/
module.exports = (fn) => {
  let src = fn.toString()
  src = src.replace(/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg, '')
  src = src.replace('async', '')

  const bi = src.indexOf('(')
  const ai = src.indexOf('=>')

  let args = ai > 0 && (ai < bi || bi < 0)
    ? src.slice(0, ai)
    : src.slice(bi + 1, src.indexOf(')'))

  args = args.replace(/\s+/g, '')

  return args ? args.split(',') : []
}
