import { atom, selector, selectorFamily } from 'recoil';

import { fetchOrganization, fetchRepository, fetchUserRepository, fetchUserRepositories, fetchUser } from 'api/github';

export const currentOrganizationState = atom({
    key: 'CurrentOrganizationState',
    default: 'Angular',
});

export const currentUserState = atom({
    key: 'CurrentUserState',
    default: undefined,
});

export const currentRepositoryState = atom({
    key: 'CurrentRepositoryState',
    default: undefined,
});

const hashMapToArray = (byLogin, allLogins) => allLogins.map(login => byLogin[login]);

const setItemInLocalStorage = (key, item) => localStorage.setItem(key, JSON.stringify(item));

export const organizationQuery = selector({
    key: 'CurrentOrganizationQuery',
    get: async ({ get }) => {
        const organisation = get(currentOrganizationState);
        const usersPerOrganisation = localStorage.getItem(organisation);
        if (usersPerOrganisation) {
            return JSON.parse(usersPerOrganisation);
        }
        try {
            const { byLogin, allLogins } = await fetchOrganization(organisation);
            const usersMap = hashMapToArray(byLogin, allLogins);
            setItemInLocalStorage(organisation, usersMap);
            return usersMap;
        } catch {
            return [];
        }
    },
});

export const repositoryQuery = selectorFamily({
    key: 'RepositoryQuery',
    get: ({ owner, name }) => async ({ get }) => {
        let currentRepository = get(currentRepositoryState);
        if (!currentRepository && owner && name) {
            currentRepository = await fetchRepository(owner, name);
        }
        const { byLogin, allLogins } = await fetchUserRepository(currentRepository.contributors_url);
        return hashMapToArray(byLogin, allLogins);
    },
})

export const userQuery = selectorFamily({
    key: 'UserQuery',
    get: login => async ({ get }) => {
        let currentUser = get(currentUserState);
        if (!currentUser && login) {
            currentUser = await fetchUser(login);
        }
        const repositories = await fetchUserRepositories(currentUser.repos_url);
        return repositories
    },
});