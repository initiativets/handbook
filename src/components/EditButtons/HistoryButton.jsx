import React, { Component } from 'react'
import { MdHistory } from 'react-icons/md'

import * as github from '../../api/GitHub'

function onHistoryClick (path) {
  window.location = github.getHistoryUrl(path)
}

class HistoryButton extends Component {
  render () {
    const { path } = this.props

    return (
      <button
        type='button'
        title='View edit history'
        onClick={() => {
          onHistoryClick(path)
        }}
        className='link dim gray ba b--light-gray pa1 mr1'
        style={{ background: 'none' }}
      >
        <MdHistory className='f3' />
      </button>
    )
  }
}

export default HistoryButton
