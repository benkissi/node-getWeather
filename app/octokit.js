const Octokit = require('@octokit/rest')

const octoKit = new Octokit()

const getRepos = async (org) => {
    const res = await octoKit.repos.listForOrg({
        org: org,
        type: 'public'
    })

    return res.data
}

const getPullRequest = async (org, repo) => {
    const res = await octoKit.pulls.list({
        owner: org,
        repo,
        state: 'open'
    })
    return res.data
}

const getSomePullRequest = async (org) => {
    const repos = await getRepos(org)
    const pulls = Promise.all(repos.map(async (repo)=>{
        const res = await getPullRequest(repo.owner.login, repo.name)
        return res
    }))
    return pulls
}

