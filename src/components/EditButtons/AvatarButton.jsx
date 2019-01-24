import React, { Component } from 'react'

import * as github from '../../api/GitHub'

function onAvatarClick (gitHubUser) {
  window.location = github.getUserUrl(gitHubUser)
}

export default class AvatarButton extends Component {
  render () {
    const { avatarUrl, gitHubUser } = this.props

    return (
      <button
        type='button'
        title={`Logged in as ${gitHubUser}`}
        onClick={() => {
          onAvatarClick(gitHubUser)
        }}
        className='link dim gray b--light-gray pa0 ma0 bn'
        style={{ background: 'none' }}
      >
        <img
          src={avatarUrl}
          className='br-100 h2 w2 relative'
          style={{ top: 5 }}
          alt={gitHubUser}
        />
      </button>
    )
  }
}
