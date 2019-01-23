import React from 'react'
import Helmet from 'react-helmet'
import { MdMenu } from 'react-icons/md'
import Sidebar from 'react-sidebar'

import config from '../../data/SiteConfig'
import Nav from '../components/Nav'

const MIN_WIDTH = 1000
let mql
if (typeof window !== `undefined`) {
  mql = window.matchMedia(`(min-width: ${MIN_WIDTH}px)`)
}

export default class MainLayout extends React.Component {
  constructor (props) {
    super(props)
    if (typeof mql !== `undefined`) {
      this.state = {
        sidebarDocked: mql.matches,
        sidebarOpen: false
      }
    } else {
      this.state = {
        sidebarDocked: true,
        sidebarOpen: false
      }
    }

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  componentWillMount () {
    if (typeof mql !== `undefined`) {
      mql.addListener(this.mediaQueryChanged)
    }
  }

  componentWillUnmount () {
    if (typeof mql !== `undefined`) {
      mql.removeListener(this.mediaQueryChanged)
    }
  }

  onSetSidebarOpen (open) {
    this.setState({ sidebarOpen: open })
  }

  mediaQueryChanged () {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false })
  }

  toggleSidebar () {
    const { sidebarDocked, sidebarOpen } = this.state
    if (mql.matches) {
      if (sidebarDocked) {
        this.setState({ sidebarDocked: false, sidebarOpen: false })
      } else {
        this.setState({ sidebarDocked: true, sidebarOpen: true })
      }
    } else if (sidebarOpen) {
      this.setState({ sidebarOpen: false })
    } else {
      this.setState({ sidebarOpen: true })
    }
  }

  render () {
    const { children, data, pageContext } = this.props
    const { sidebarOpen, sidebarDocked } = this.state
    return (
      <Sidebar
        sidebar={<Nav navNode={data.nav} slug={pageContext.slug} />}
        open={sidebarOpen}
        docked={sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        defaultSidebarWidth={300}
        shadow={false}
        sidebarClassName='bg-white'
        contentClassName='bl b--moon-gray'
        styles={{ sidebar: { width: 300 } }}
      >
        <div>
          <Helmet>
            <meta name='description' content={config.siteDescription} />
          </Helmet>
          <header className='w-100 pa3'>
            <div className='db dt-ns mw9 center w-100'>
              <div className='db dtc-ns v-mid tl w-50'>
                <div className='di pr2'>
                  <MdMenu
                    onClick={this.toggleSidebar}
                    className='f4 b--moon-gray relative
                    '
                    style={{ top: 4 }}
                  />
                </div>
                <a
                  href='/'
                  className='dib f5 f4-ns fw6 mt0 mb1 link black-70'
                  title='Home'
                >
                  {config.siteTitle}
                </a>
              </div>
              <nav className='db dtc-ns v-mid w-100 tl tr-ns mt2 mt0-ns'>
                <a
                  title='English'
                  href='/'
                  className='f6 fw6 hover-blue link black-70 mr2 mr3-m mr4-l dib'
                >
                  English
                </a>
                <a
                  title='Svenska'
                  href='/'
                  className='f6 fw6 hover-blue link black-70 mr2 mr3-m mr4-l dib'
                >
                  Svenska
                </a>
              </nav>
            </div>
          </header>
          {children}
        </div>
      </Sidebar>
    )
  }
}
