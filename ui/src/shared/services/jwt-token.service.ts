import Cookies from 'js-cookie';

const getAccessToken = () => Cookies.get('access');

const setAuthTokens = ({ access, refresh }: { access: string; refresh: string }) => {
    Cookies.set('access', access);
    Cookies.set('refresh', refresh);
};

const resetAuthTokens = () => {
    Cookies.remove('access');
    Cookies.remove('refresh');
};

export const tokenService = {
    getAccessToken,
    setAuthTokens,
    resetAuthTokens,
};
