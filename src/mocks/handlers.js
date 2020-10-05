import { rest } from 'msw';

import { usersListMock } from './mocks';

const baseUrl = 'https://api.github.com';
export const handlers = [
    rest.get(`${baseUrl}/orgs/Angular`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(usersListMock),
        )
    }),
]