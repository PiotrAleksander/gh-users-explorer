import { atom, selector, selectorFamily } from 'recoil';

import { fetchOrganization, fetchRepository } from 'api/github';

const currentOrganization = atom({
    key: 'CurrentOrganization',
    default: 'Angular',
});

export const organizationQuery = selector({
    key: 'CurrentOrganizationQuery',
    get: async ({ get }) => {
        return await fetchOrganization(get(currentOrganization));
    },
});

export const repositoryQuery = selectorFamily({
    key: 'CurrentRepositoryQuery',
    get: repo => async ({ get }) => {
        return await fetchRepository(get(currentOrganization), repo);
    }
})