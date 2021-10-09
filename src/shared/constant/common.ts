const CookieKey = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    currentRoles: 'CurrentRoles',
    previousUrl: 'previousUrl',
    networkError: 'networkError',
};

const ROLE_TYPE = {
    ADMIN: 'ADMIN',
    USER: 'USER',
};

const PER_PAGE = 30;

const LIST_PER_PAGE = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
];

export { CookieKey, ROLE_TYPE, PER_PAGE, LIST_PER_PAGE };
