/**
 * core/service/github.js
 * Handles requests to GitHub, parsed and ready for use by Houston
 *
 * @exports {Function} GetReleases
 * @exports {Function} GetProjects
 */

import { Request } from '~/app'

export function GetReleases (owner, name, token) {
  return Request
  .get(`https://api.github.com/repos/${owner}/${name}/releases`)
  .auth(token)
  .then(res => res.body)
  .map(release => {
    return {
      github: {
        id: release.id,
        author: release.author.login,
        date: release.published_at,
        tag: release.tag_name
      },
      changelog: release.body.match(/.+/g)
    }
  })
}

export function GetProjects (token) {
  return Request
  .get(`https://api.github.com/user/repos?visibility=public`)
  .auth(token)
  .then(res => res.body)
  .filter(githubProject => {
    return Request
    .get(`https://api.github.com/repos/${githubProject.full_name}/contents/.apphub`)
    .auth(token)
    .then(() => true)
    .catch(() => false)
  })
  .map(project => {
    return {
      repo: project.git_url,
      tag: project.default_branch,
      github: {
        id: project.id,
        owner: project.owner.login,
        name: project.name,
        APItoken: token
      }
    }
  })
}
