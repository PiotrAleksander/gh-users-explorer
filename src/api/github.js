import axios from 'axios';
import { uniqBy } from 'lodash/fp';

const api = axios.create({
    headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${process.env.REACT_APP_TOKEN}`,
    }
});

const baseUrl = 'https://api.github.com';

export const fetchOrganization = async (org = 'Angular') => {
    const { data: { repos_url } } = await api.get(`${baseUrl}/orgs/${org}`);
    const { data: repositories } = await api.get(repos_url);
    const usersPerRepositoryData = await axios.all(repositories.map(({ contributors_url }) => api.get(contributors_url)));
    const usersPerRepositoryRaw = usersPerRepositoryData.flatMap(({ data }) => data);
    const usersPerRepository = uniqBy('id')(usersPerRepositoryRaw);
    let usersMap = {};
    const users = await axios.all(usersPerRepository.map(({ login, contributions, url }) => {
        usersMap[login] = { contributions };
        return api.get(url);
    }));

    users.forEach(({ data: { login, public_repos, public_gists, followers } }) => {
        usersMap[login] = {
            ...usersMap[login],
            public_repos,
            public_gists,
            followers
        }
    });

    return usersMap;
}

export const fetchRepository = async (owner, repo) => {
    const { data: { contributors_url } } = await api.get(`${baseUrl}/repos/${owner}/${repo}`);
    const { data: contributors } = await api.get(contributors_url);
    let contributorsMap = {};
    const users = await axios.all(contributors.map(({ login, contributions, url }) => {
        contributorsMap[login] = { contributions };
        return api.get(url);
    }));

    users.forEach(({ data: { login, public_repos, public_gists, followers } }) => {
        contributorsMap[login] = {
            ...contributorsMap[login],
            public_repos,
            public_gists,
            followers
        }
    });

    return contributorsMap;
}