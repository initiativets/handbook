import React, { Component } from 'react'
import Loader from 'react-loader-spinner'
import { GoMarkGithub } from 'react-icons/go'
import { MdNoteAdd } from 'react-icons/md'
import Modal from 'react-modal'
import * as handBot from '../../api/HandBot'
import config from '../../../data/SiteConfig'

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: 400,
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

class CreateButton extends Component {
  constructor () {
    Modal.setAppElement(document.documentElement)

    super()

    this.state = {
      modalIsOpen: false,
      loading: false
    }

    this.openModal = this.openModal.bind(this)
    this.onCloseClick = this.onCloseClick.bind(this)
    this.onCreateClick = this.onCreateClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  onCloseClick () {
    this.setState({ modalIsOpen: false })
  }

  onCreateClick () {
    const { pageTitle } = this.state
    if (pageTitle.length > 0) {
      this.gitHubCreateIssue(pageTitle)
      this.setState({ modalIsOpen: false })
    }
  }

  handleInputChange (event) {
    const { target } = event

    this.setState({
      pageTitle: target.value
    })
  }

  openModal () {
    this.setState({ modalIsOpen: true })
  }

  async gitHubCreateIssue (title) {
    const { loading } = this.state
    if (!loading) {
      this.setState({ loading: true })

      const url = handBot.getCreateIssueUrl(title, config.templateNewIssueUrl)

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
    return <MdNoteAdd className='f3' />
  }

  render () {
    const { modalIsOpen } = this.state

    return (
      <div className='di'>
        <button
          type='button'
          title='Suggest a new page'
          onClick={this.openModal}
          className='link dim gray ba b--light-gray pa1 mr1'
          style={{ background: 'none' }}
        >
          {this.uiIcon()}
        </button>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyles}
          className=''
          contentLabel='Create new page'
        >
          <form className='pa3'>
            <h2 className='f2 lh-title ma0 mb2'>Suggest new page</h2>
            <p>Enter a title for the page you want to create.</p>
            <div className='measure'>
              <label htmlFor='name' className='f6 b db mb2'>
                Title
                <input
                  id='name'
                  className='input-reset ba b--black-20 pa2 mb2 db w-100'
                  type='text'
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
          </form>
          <div className='tr pr3'>
            <button
              type='button'
              title='Suggest a new page'
              onClick={this.onCloseClick}
              className='f6 link dim br2 bn ph3 pv2 mb2 dib white bg-black mr2'
            >
              CANCEL
            </button>
            <button
              type='button'
              title='Suggest a new page'
              onClick={this.onCreateClick}
              className='f6 link dim br2 bn ph3 pv2 mb2 dib white bg-dark-green mr2'
            >
              <GoMarkGithub className='relative pl1 mr1' style={{ top: 2 }} />
              CREATE
            </button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default CreateButton
