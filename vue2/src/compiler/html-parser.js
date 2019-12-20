/**
 * Convert HTML string to AST
 *
 * @param {String} html
 * @return {Object}
 */

export function parse(html) {
  let root
  let currentParent
  let stack = []
  HTMLParser(html, {
    html5: true,
    start(tag, attrs, unary) {
      let element = {
        tag,
        attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      }
      if (!root) {
        root = element
      }
      if (currentParent) {
        currentParent.children.push(element)
      }
      if (!unary) {
        currentParent = element
        stack.push(element)
      }
    },
    end() {
      stack.length -= 1
      currentParent = stack[stack.length - 1]
    },
    chars(text) {
      text = currentParent.tag === 'pre'
        ? text
        : text.trim() ? text : ' '
      currentParent.children.push(text)
    },
    comment() {
      // noop
    }
  })
  return root
}
