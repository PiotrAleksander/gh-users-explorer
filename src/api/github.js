import axios from 'axios';
import { uniqBy } from 'lodash/fp';

const api = axios.create({
    headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${process.env.REACT_APP_TOKEN}`,
    }
});

const baseUrl = 'https://api.github.com';

const getUsersState = async (usersCollection) => {
    let byLogin = {};
    let allLogins = [];
    const users = await axios.all(usersCollection.map(({ login, contributions, url }) => {
        byLogin[login] = { login, contributions };
        allLogins.push(login);
        return api.get(url);
    }));

    users.forEach(({ data: { login, public_repos, public_gists, followers } }) => {
        byLogin[login] = {
            ...byLogin[login],
            public_repos,
            public_gists,
            followers
        }
    });

    return { byLogin, allLogins };
}

export const fetchOrganization = async (org = 'Angular') => {
    const { data: { repos_url } } = await api.get(`${baseUrl}/orgs/${org}`);
    const { data: repositories } = await api.get(repos_url);
    const usersPerRepositoryDataNested = await axios.all(repositories.map(({ contributors_url }) => api.get(contributors_url)));
    const usersPerRepositoryData = usersPerRepositoryDataNested.flatMap(({ data }) => data)
    const usersPerRepository = uniqBy('id')(usersPerRepositoryData);

    return getUsersState(usersPerRepository);
}

export const fetchUserRepositories = async (repos_url) => {
    const { data: repositories } = await api.get(repos_url);
    return repositories.map(({ url, name, description }) => ({ url, name, description }));
}

export const fetchRepository = async (owner, repo) => {
    const { data: { contributors_url } } = await api.get(`${baseUrl}/repos/${owner}/${repo}`);
    const { data: users } = await api.get(contributors_url);

    return getUsersState(users);
}