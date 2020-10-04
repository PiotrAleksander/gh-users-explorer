import { atom, selector, selectorFamily } from 'recoil';

import { fetchOrganization, fetchRepository, fetchUserRepositories } from 'api/github';

const currentOrganization = atom({
    key: 'CurrentOrganization',
    default: 'Angular',
});

const hashMapToArray = (byLogin, allLogins) => allLogins.map(login => byLogin[login]);

const setItemInLocalStorage = (key, item) => localStorage.setItem(key, JSON.stringify(item));

export const organizationQuery = selector({
    key: 'CurrentOrganizationQuery',
    get: async ({ get }) => {
        const organisation = get(currentOrganization);
        const usersPerOrganisation = localStorage.getItem(organisation);
        if (usersPerOrganisation) {
            return JSON.parse(usersPerOrganisation);
        }
        const { byLogin, allLogins } = await fetchOrganization(organisation);
        const usersMap = hashMapToArray(byLogin, allLogins);
        setItemInLocalStorage(organisation, usersMap);
        return usersMap;
    },
});

export const repositoryQuery = selectorFamily({
    key: 'RepositoryQuery',
    get: repo => async ({ get }) => {
        const { byLogin, allLogins } = await fetchRepository(get(currentOrganization), repo);
        return hashMapToArray(byLogin, allLogins);
    },
})

export const userQuery = selectorFamily({
    key: 'UserQuery',
    get: repos_url => async ({ get }) => {
        const repositories = await fetchUserRepositories(repos_url);
        return repositories
    },
});