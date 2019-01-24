import config from '../../data/SiteConfig'
import * as github from './GitHub'

export function getLoginUrl () {
  if (typeof window !== `undefined`) {
    const redirectUrl = window.location.href

    return `${config.handBotBaseUrl}/login/${config.gitHubOwner}/${
      config.gitHubRepo
    }?redirect_url=${redirectUrl}`
  }
  return null
}

export function getCreateUrl (title) {
  return `${config.handBotBaseUrl}/file/${config.gitHubOwner}/${
    config.gitHubRepo
  }/create?access_token=${github.getAccessToken()}&title=${title}`
}

export function getCreateIssueUrl (title, path) {
  return `${config.handBotBaseUrl}/issue/${config.gitHubOwner}/${
    config.gitHubRepo
  }/create?access_token=${github.getAccessToken()}&title=${title}&path=${path}`
}
