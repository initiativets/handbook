import request from '@octokit/request'
import config from '../../data/SiteConfig'

export function saveAccessToken (accessToken) {
  // eslint-disable-next-line
  localStorage.setItem("github_access_token", accessToken);
}

export function getAccessToken () {
  // eslint-disable-next-line
  const accessToken = localStorage.getItem("github_access_token");
  if (accessToken) {
    return accessToken
  }
  throw new Error('No access token available.')
}

export async function getUser () {
  // POST https://github.com/login/oauth/access_token
  const response = await request('GET /user', {
    headers: {
      authorization: `token ${getAccessToken()}`,
      accept: 'application/vnd.github.machine-man-preview+json'
    }
  })
  return response
}

export function getHistoryUrl (path) {
  return `${config.gitHubBaseUrl}/${config.gitHubOwner}/${
    config.gitHubRepo
  }/commits/${config.gitHubBranch}/${config.contentFolder}${path}`
}
