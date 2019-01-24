import React, { Component } from 'react'
import { GoMarkGithub } from 'react-icons/go'
import { parse } from 'query-string'
import * as github from '../../api/GitHub'
import * as handBot from '../../api/HandBot'
import CreateButton from './CreateButton'
import EditButton from './EditButton'
import HistoryButton from './HistoryButton'
import AvatarButton from './AvatarButton'

function onGitHubLoginClick () {
  window.location = handBot.getLoginUrl()
}

class EditButtons extends Component {
  constructor (props) {
    super(props)

    if (typeof window !== `undefined`) {
      const querystring = parse(window.location.search)
      if (querystring && querystring.access_token) {
        github.saveAccessToken(querystring.access_token)
        window.history.replaceState(null, null, window.location.pathname)
      }
    }

    this.state = {
      waitForLogin: true,
      loggedIn: false,
      avatarUrl: '',
      gitHubUser: ''
    }
  }

  componentDidMount () {
    this.getUser()
  }

  async getUser () {
    try {
      const response = await github.getUser()
      if (response && response.status === 200) {
        this.setState({
          loggedIn: true,
          avatarUrl: response.data.avatar_url,
          gitHubUser: response.data.login
        })
      } else {
        this.setState({ loggedIn: false })
      }
    } catch (err) {
      this.setState({ loggedIn: false })
    }
    this.setState({ waitForLogin: false })
  }

  uiEditButtons () {
    const { avatarUrl, gitHubUser } = this.state
    const { path, title } = this.props
    return (
      <div className='w-100 tr'>
        <CreateButton />
        <EditButton path={path} title={title} />
        <HistoryButton path={path} />
        <AvatarButton gitHubUser={gitHubUser} avatarUrl={avatarUrl} />
      </div>
    )
  }

  uiLoginLink () {
    return (
      <a
        href='#'
        rel='noopener noreferrer'
        title='Create a new page'
        onClick={onGitHubLoginClick}
        className='link dim gray f6 lh-copy'
      >
        <GoMarkGithub className='f4 gray pr2 relative' style={{ top: 3 }} />
        Log in to edit
      </a>
    )
  }

  render () {
    const { waitForLogin, loggedIn } = this.state

    if (!waitForLogin) {
      if (loggedIn) {
        return this.uiEditButtons()
      }
      return this.uiLoginLink()
    }
    return <div className='pa3' />
  }
}

export default EditButtons
