import React, { Component } from 'react'
import Loader from 'react-loader-spinner'
import { MdEdit } from 'react-icons/md'

import * as handBot from '../../api/HandBot'
import config from '../../../data/SiteConfig'

class EditButton extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  async onEditClick (title, path) {
    const { loading } = this.state
    if (!loading) {
      this.setState({ loading: true })

      const sourcePath = config.contentFolder + path
      const url = handBot.getCreateIssueUrl(title, sourcePath)

      // eslint-disable-next-line
      const response = await fetch(url);

      if (response.ok) {
        const body = await response.json()

        if (body.error && body.error.code === 'NO_INSTALLATION_TOKEN') {
          window.location = handBot.getLoginUrl()
        }

        if (body.data && body.data.html_url) {
          window.location = body.data.html_url
        }

        this.setState({ loading: false })
      }
    }
  }

  uiIcon () {
    const { loading } = this.state
    if (loading) {
      return <Loader type='ThreeDots' color='#357edd' height='24' width='24' />
    }
    return <MdEdit className='f3' />
  }

  render () {
    const { title, path } = this.props

    return (
      <button
        type='button'
        title='Suggest edits to current page'
        onClick={() => {
          this.onEditClick(title, path)
        }}
        className='link dim gray ba b--light-gray pa1 mr1'
        style={{ background: 'none' }}
      >
        {this.uiIcon()}
      </button>
    )
  }
}

export default EditButton
