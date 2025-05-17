import type { AddLibraryUsersParams, CreateLibraryParams, Library, LibraryUser } from '@/types/shelflingApi';
import { ApiService } from './apiService';

export class ShelflingApi extends ApiService {
    constructor() {
        super(import.meta.env.VITE_API_BASE_URL, { tokenKey: 'shelfling-access' });
    }

    async getLibraries(): Promise<Library[]> {
        const res = await this.client.get<ApiService.Resource<Library[]>>('/libraries', {
            requiresAuth: true,
        });
        return res.data.data;
    }

    async createLibrary(params: CreateLibraryParams) {
        const res = await this.client.post<ApiService.Resource<Library>>(
            '/libraries',
            params,
            { requiresAuth: true },
        );
        return res.data.data;
    }

    async getLibrary(id: string) {
        const res = await this.client.get<ApiService.Resource<Library>>(`/libraries/${id}`, {
            requiresAuth: true,
        });
        return res.data.data;
    }

    async deleteLibrary(id: string) {
        await this.client.delete(`/libraries/${id}`, {
            requiresAuth: true,
        });
    }

    async addLibraryUsers(id: string, params: AddLibraryUsersParams) {
        await this.client.post(`/libraries/${id}/users`, params, {
            requiresAuth: true,
        });
    }

    async getLibraryUsers(id: string) {
        const res = await this.client.get<ApiService.Resource<LibraryUser[]>>(`/libraries/${id}/users`, {
            requiresAuth: true,
        });
        return res.data.data;
    }
}

export const shelflingApi = new ShelflingApi();
