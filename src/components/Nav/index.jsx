import React from 'react'
import { Link } from 'gatsby'

class Nav extends React.Component {
  static postLink (post, slug) {
    let className = 'link dim '
    if (post.path === slug) {
      className += 'blue '
    } else {
      className += 'near-black '
    }
    switch (post.indent) {
      case 2:
        className += 'pl3 '
        break
      case 3:
        className += 'pl4 '
        break
      case 4:
        className += 'pl5 '
        break
      default:
    }
    return (
      <p key={post.path}>
        <Link to={post.path} key={post.title} className={className}>
          {post.title}
        </Link>
      </p>
    )
  }

  static fillPostList (postList, navItems, indent) {
    const i = indent + 1
    navItems.forEach(item => {
      postList.push({
        path: item.node.slug,
        title: item.node.title,
        indent: i
      })
      if (item.node.subnodes != null) {
        Nav.fillPostList(postList, item.node.subnodes, i)
      }
    })
  }

  render () {
    const { slug, navNode } = this.props
    const postList = []
    Nav.fillPostList(postList, navNode.edges, 0)

    return (
      <div className='index-container'>
        <div className='w-100 bb b--moon-gray pa3'>[SEARCH BOX HERE]</div>
        <div className='pa3'>
          {postList.map(post => Nav.postLink(post, slug))}
        </div>
      </div>
    )
  }
}

export default Nav
