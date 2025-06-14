import type { AddLibraryUsersParams, CreateExemplarParams, CreateLibraryBookParams, CreateLibraryParams, Exemplar, Library, LibraryBook, LibraryUser } from '@/types/shelflingApi';
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

    async getLibrary(id: number) {
        const res = await this.client.get<ApiService.Resource<Library>>(`/libraries/${id}`, {
            requiresAuth: true,
        });
        return res.data.data;
    }

    async deleteLibrary(id: number) {
        await this.client.delete(`/libraries/${id}`, {
            requiresAuth: true,
        });
    }

    async addLibraryUsers(id: number, params: AddLibraryUsersParams) {
        await this.client.post(`/libraries/${id}/users`, params, {
            requiresAuth: true,
        });
    }

    async removeLibraryUsers(id: number, userId: number) {
        await this.client.delete(`/libraries/${id}/users`, {
            requiresAuth: true,
            data: { user_id: userId },
        });
    }

    async getLibraryUsers(id: number) {
        const res = await this.client.get<ApiService.Resource<LibraryUser[]>>(`/libraries/${id}/users`, {
            requiresAuth: true,
        });
        return res.data.data;
    }

    async getLibraryBooks(id: number) {
        const res = await this.client.get<ApiService.Resource<LibraryBook[]>>(`/libraries/${id}/books`, {
            requiresAuth: true,
        });
        return res.data.data;
    }

    async getLibraryBook(libraryId: number, bookId: number) {
        const res = await this.client.get<ApiService.Resource<LibraryBook>>(
            `/libraries/${libraryId}/books/${bookId}`,
            { requiresAuth: true },
        );
        return res.data.data;
    }

    async createLibraryBook(id: number, params: CreateLibraryBookParams) {
        const res = await this.client.post<ApiService.Resource<LibraryBook>>(
            `/libraries/${id}/books`,
            params,
            { requiresAuth: true },
        );
        return res.data.data;
    }

    async updateLibraryBook(libraryId: number, bookId: number, params: CreateLibraryBookParams) {
        const res = await this.client.put<ApiService.Resource<LibraryBook>>(
            `/libraries/${libraryId}/books/${bookId}`,
            params,
            { requiresAuth: true },
        );
        return res.data.data;
    }

    async deleteLibraryBook(libraryId: number, bookId: number) {
        await this.client.delete(`/libraries/${libraryId}/books/${bookId}`, {
            requiresAuth: true,
        });
    }

    async getBookExemplars(libraryId: number, bookId: number) {
        const res = await this.client.get<ApiService.Resource<Exemplar[]>>(
            `/libraries/${libraryId}/books/${bookId}/exemplars`,
            { requiresAuth: true },
        );
        return res.data.data;
    }

    async getBookExemplar(libraryId: number, bookId: number, exemplarId: number) {
        const res = await this.client.get<ApiService.Resource<Exemplar>>(
            `/libraries/${libraryId}/books/${bookId}/exemplars/${exemplarId}`,
            { requiresAuth: true },
        );
        return res.data.data;
    }

    async createBookExemplar(libraryId: number, bookId: number, params: CreateExemplarParams) {
        const res = await this.client.post<ApiService.Resource<Exemplar>>(
            `/libraries/${libraryId}/books/${bookId}/exemplars`,
            params,
            { requiresAuth: true },
        );
        return res.data.data;
    }

    async updateBookExemplar(libraryId: number, bookId: number, exemplarId: number, params: CreateExemplarParams) {
        const res = await this.client.put<ApiService.Resource<Exemplar>>(
            `/libraries/${libraryId}/books/${bookId}/exemplars/${exemplarId}`,
            params,
            { requiresAuth: true },
        );
        return res.data.data;
    }

    async deleteBookExemplar(libraryId: number, bookId: number, exemplarId: number) {
        await this.client.delete(`/libraries/${libraryId}/books/${bookId}/exemplars/${exemplarId}`, {
            requiresAuth: true,
        });
    }
}

export const shelflingApi = new ShelflingApi();
