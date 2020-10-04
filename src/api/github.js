import axios from 'axios';
import { uniqBy } from 'lodash/fp';

const api = axios.create({
    headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${process.env.REACT_APP_TOKEN}`,
    }
});

const baseUrl = 'https://api.github.com';

export const fetchUser = async (login) => {
    const { data: user } = await api.get(`${baseUrl}/users/${login}`);
    return user;
}

export const fetchRepository = async (owner, name) => {
    const { data: repository } = await api.get(`${baseUrl}/repos/${owner}/${name}`);
    return repository;
}

const getUsersState = async (usersCollection) => {
    let byLogin = {};
    let allLogins = [];
    const users = await axios.all(usersCollection.map(({ login, contributions, url }) => {
        byLogin[login] = { login, contributions };
        allLogins.push(login);
        return api.get(url);
    }));

    users.forEach(({ data: { login, public_repos, public_gists, followers, repos_url } }) => {
        byLogin[login] = {
            ...byLogin[login],
            public_repos,
            public_gists,
            followers,
            repos_url
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
    return repositories.map(({
        avatar_url,
        url,
        name,
        description,
        contributors_url,
        stargazers_count,
        watchers_count,
        forks_count
    }) => ({
        avatar_url,
        url,
        name,
        description,
        contributors_url,
        stargazers_count,
        watchers_count,
        forks_count
    }));
}

export const fetchUserRepository = async (contributors_url) => {
    const { data: users } = await api.get(contributors_url);

    return getUsersState(users);
}