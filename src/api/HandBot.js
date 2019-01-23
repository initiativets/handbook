import config from '../../data/SiteConfig'
import * as github from './GitHub'

export function getLoginUrl () {
  return `${config.handBotBaseUrl}/login/${config.gitHubOwner}/${
    config.gitHubRepo
  }`
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
