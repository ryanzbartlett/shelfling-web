import type { AddLibraryUsersParams, CreateLibraryBookParams, CreateLibraryParams, Library, LibraryBook, LibraryUser } from '@/types/shelflingApi';
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

    async removeLibraryUsers(id: string, userId: number) {
        await this.client.delete(`/libraries/${id}/users`, {
            requiresAuth: true,
            data: { user_id: userId },
        });
    }

    async getLibraryUsers(id: string) {
        const res = await this.client.get<ApiService.Resource<LibraryUser[]>>(`/libraries/${id}/users`, {
            requiresAuth: true,
        });
        return res.data.data;
    }

    async getLibraryBooks(id: string) {
        const res = await this.client.get<ApiService.Resource<LibraryBook[]>>(`/libraries/${id}/books`, {
            requiresAuth: true,
        });
        return res.data.data;
    }

    async getLibraryBook(libraryId: string, bookId: string) {
        const res = await this.client.get<ApiService.Resource<LibraryBook>>(
            `/libraries/${libraryId}/books/${bookId}`,
            { requiresAuth: true },
        );
        return res.data.data;
    }

    async createLibraryBook(id: string, params: CreateLibraryBookParams) {
        const res = await this.client.post<ApiService.Resource<LibraryBook>>(
            `/libraries/${id}/books`,
            params,
            { requiresAuth: true },
        );
        return res.data.data;
    }

    async updateLibraryBook(libraryId: string, bookId: number, params: CreateLibraryBookParams) {
        const res = await this.client.put<ApiService.Resource<LibraryBook>>(
            `/libraries/${libraryId}/books/${bookId}`,
            params,
            { requiresAuth: true },
        );
        return res.data.data;
    }

    async deleteLibraryBook(libraryId: string, bookId: number) {
        await this.client.delete(`/libraries/${libraryId}/books/${bookId}`, {
            requiresAuth: true,
        });
    }
}

export const shelflingApi = new ShelflingApi();
