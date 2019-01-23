import React from 'react'
import rehypeReact from 'rehype-react'
import styled from 'styled-components'

const H1 = styled.h1.attrs({
  className: 'f1 lh-title'
})``
const H2 = styled.h2.attrs({
  className: 'f2 lh-title'
})``
const H3 = styled.h3.attrs({
  className: 'f3 lh-title'
})``
const H4 = styled.h4.attrs({
  className: 'f4 lh-title'
})``
const H5 = styled.h5.attrs({
  className: 'f5 lh-title'
})``
const P = styled.p.attrs({
  className: 'lh-copy'
})``
const PRE = styled.p.attrs({
  className: 'bg-light-gray pa3 pre lh-copy'
})``
const OL = styled.ol.attrs({
  className: ''
})``
const LI = styled.li.attrs({
  className: 'lh-copy'
})``
const TABLE = styled.table.attrs({
  className: 'w-100'
})``
const TH = styled.th.attrs({
  className: 'pv2 ph3 tl f6 fw6 ttu'
})``
const TR = styled.tr.attrs({
  className: 'striped--light-gray'
})``
const TD = styled.td.attrs({
  className: 'pv2 ph3'
})``
const A = styled.a.attrs({
  className: 'link underline-hover blue'
})``
const BLOCKQUOTE = styled.blockquote.attrs({
  className: 'bl b--light-gray bw3 ma3 pl3'
})``

class Code extends React.Component {
  render () {
    // debugger;
    const { className, children } = this.props
    if (className === 'language-text') {
      return <code className='br3 bg-light-gray pa1'>{children}</code>
    }
    return <code>{children}</code>
  }
}

// eslint-disable-next-line
export const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    p: P,
    pre: PRE,
    ol: OL,
    li: LI,
    table: TABLE,
    th: TH,
    tr: TR,
    td: TD,
    a: A,
    blockquote: BLOCKQUOTE,
    code: Code
  }
}).Compiler
