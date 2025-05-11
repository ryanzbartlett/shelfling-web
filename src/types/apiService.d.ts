declare namespace ApiService {
    export type Resource<T> = { data: T };

    export interface AccessToken {
        access_token: string;
        expires_at: string;
    }

    export interface User {
        id: number;
        name: string;
        email: string;
    }
}
