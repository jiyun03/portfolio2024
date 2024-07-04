import { createElement } from 'react'

// JSON TO HTML
function escapeHtml(unsafe: string) {
  return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
}

export function parseHtmlString(htmlString: string): JSX.Element[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')

  const parseNode = (node: ChildNode): JSX.Element | string | null => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const { nodeName, attributes } = node as Element
      const props: Record<string, string | number> = {}

      for (let i = 0; i < attributes.length; i++) {
        const attr = attributes.item(i)
        if (attr) {
          const name = attr.name === 'class' ? 'className' : attr.name
          props[name] = attr.value
        }
      }

      const key = Math.random().toString(36).substring(7)
      props.key = key

      const children: (JSX.Element | string | null)[] = Array.from(node.childNodes).map(parseNode)

      return createElement(nodeName.toLowerCase(), props, ...children)
    }
    return null
  }

  return Array.from(doc.body.childNodes).map(parseNode).filter(Boolean) as JSX.Element[]
}
