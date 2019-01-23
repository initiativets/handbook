import React, { Component } from 'react'
import { MdEdit } from 'react-icons/md'

import * as bridge from '../../api/HandBot'
import config from '../../../data/SiteConfig'

async function onEditClick (title, path) {
  const sourcePath = config.contentFolder + path
  const url = bridge.getCreateIssueUrl(title, sourcePath)

  // eslint-disable-next-line
  const response = await fetch(url);

  if (response.ok) {
    const body = await response.json()

    if (body.error && body.error.code === 'NO_INSTALLATION_TOKEN') {
      window.location = bridge.getLoginUrl()
    }

    if (body.data && body.data.html_url) {
      window.location = body.data.html_url
    }
  }
}

class EditButton extends Component {
  render () {
    const { title, path } = this.props

    return (
      <button
        type='button'
        title='Suggest edits to current page'
        onClick={() => {
          onEditClick(title, path)
        }}
        className='link dim gray ba b--light-gray pa1 mr1'
        style={{ background: 'none' }}
      >
        <MdEdit className='f3' />
      </button>
    )
  }
}

export default EditButton
