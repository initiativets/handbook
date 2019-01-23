import React from 'react'
import Helmet from 'react-helmet'
import { MdWarning } from 'react-icons/md'
import { Link } from 'gatsby'

import config from '../../data/SiteConfig'

export default class NotFound extends React.Component {
  render () {
    return (
      <div className='flex'>
        <Helmet>
          <meta name='description' content={config.siteDescription} />
          <title>{`${config.siteTitle} | Not found`}</title>
          <body className='w-100 sans-serif pa0 near-black' />
        </Helmet>
        <div className='w-100 flex justify-center b--moon-gray'>
          <div className='w-100 mw7 pa3'>
            <h1 className='red'>
              <MdWarning />
            </h1>
            <h1>Oh no, you are lost - page not found.</h1>
            Try looking
            {' '}
            <Link to='/'>here</Link>
            {' '}
instead.
          </div>
        </div>
      </div>
    )
  }
}
