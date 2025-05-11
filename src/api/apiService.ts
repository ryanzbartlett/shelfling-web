import axios from 'axios';

declare module 'axios' {
    interface AxiosRequestConfig {
        requiresAuth?: boolean;
    }
}

export class ApiService {
    private client;
    private tokenKey;

    constructor(baseUrl: string, config?: {
        tokenKey?: string;
    }) {
        this.tokenKey = config?.tokenKey ?? 'access-token';

        this.client = axios.create({
            baseURL: baseUrl,
            headers: {
                Accept: 'application/json',
            },
        });

        this.client.interceptors.request.use((config) => {
            if (config.requiresAuth ?? true) {
                const { access_token } = this.assertAccessToken();
                config.headers.Authorization = `Bearer ${access_token}`;
            }

            return config;
        });
    }

    private assertAccessToken(): ApiService.AccessToken {
        const accessToken = this.getAccessToken();
        if (!accessToken) throw new Error('No access token available. Please log in.');
        return accessToken;
    }

    private getAccessToken(): ApiService.AccessToken | null {
        const tokenStr = localStorage.getItem(this.tokenKey);
        if (!tokenStr) return null;

        const token = JSON.parse(tokenStr) as ApiService.AccessToken;
        if (this.isAccessTokenExpired(token)) {
            this.clearAccessToken();
            return null;
        }
        return token;
    }

    private isAccessTokenExpired(token: ApiService.AccessToken): boolean {
        return new Date(token.expires_at) < new Date();
    }

    private setAccessToken(token: ApiService.AccessToken) {
        localStorage.setItem(this.tokenKey, JSON.stringify(token));
        window.dispatchEvent(new CustomEvent(`${this.tokenKey}-set`, {
            detail: {
                storage: localStorage.getItem(this.tokenKey),
            },
        }));
    }

    private clearAccessToken() {
        localStorage.removeItem(this.tokenKey);
        this.client.defaults.headers.common.Authorization = undefined;
        window.dispatchEvent(new CustomEvent(`${this.tokenKey}-removed`));
    }

    onAccessRevoked(fn: () => void) {
        window.addEventListener(`${this.tokenKey}-removed`, fn);
    }

    isAuthenticated(): boolean {
        return !!this.getAccessToken();
    }

    /**
     * Register a new user
     */
    async register(params: {
        name: string;
        email: string;
        password: string;
    }) {
        const response = await this.client.post<ApiService.Resource<ApiService.User>>(
            '/register',
            params,
            { requiresAuth: false },
        );

        return response.data.data;
    };

    /**
     * Log in to the API and set access token
     */
    async logIn(params: {
        email: string;
        password: string;
    }) {
        const response = await this.client.post<ApiService.AccessToken>(
            '/login',
            params,
            { requiresAuth: false },
        );

        this.setAccessToken(response.data);
    };

    /**
     * Log out of the API and clear access token
     */
    async logOut() {
        await this.client.get('/logout');
        this.clearAccessToken();
    };

    /**
     * Get the current user
     */
    async getUser() {
        const response = await this.client.get<ApiService.Resource<ApiService.User>>('/user');
        return response.data.data;
    };
}
