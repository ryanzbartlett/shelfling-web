import { shelflingApi } from '@/api/shelflingApi';
import type { CreateLibraryBookParams, LibraryBook } from '@/types/shelflingApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { unref, type MaybeRef } from 'vue';

export function useLibraryBooksQuery(libraryId: MaybeRef<number>) {
    return useQuery({
        queryKey: ['libraryBooks', unref(libraryId)],
        queryFn: () => shelflingApi.getLibraryBooks(unref(libraryId)),
    });
}

export function useLibraryBook(libraryId: MaybeRef<number>, options?: {
    onCreateSuccess?: (data: LibraryBook) => void;
    onUpdateSuccess?: (data: LibraryBook) => void;
    onDeleteSuccess?: (id: number) => void;
}) {
    const queryClient = useQueryClient();

    const {
        mutate: createLibraryBook,
        isPending: createLibraryBookPending,
    } = useMutation({
        mutationFn: (params: CreateLibraryBookParams) => shelflingApi.createLibraryBook(unref(libraryId), params),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['libraryBooks', unref(libraryId)] });
            options?.onCreateSuccess?.(data);
        },
    });

    const {
        mutate: updateLibraryBook,
        isPending: updateLibraryBookPending,
    } = useMutation({
        mutationFn: ({ bookId, params }: { bookId: number; params: CreateLibraryBookParams }) => {
            return shelflingApi.updateLibraryBook(unref(libraryId), bookId, params);
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['libraryBooks', unref(libraryId)] });
            queryClient.invalidateQueries({ queryKey: ['libraryBook', unref(libraryId), variables.bookId.toString()] });
            options?.onUpdateSuccess?.(data);
        },
    });

    const {
        mutate: deleteLibraryBook,
        isPending: deleteLibraryBookPending,
    } = useMutation({
        mutationFn: (bookId: number) => shelflingApi.deleteLibraryBook(unref(libraryId), bookId),
        onSuccess: (data, bookId) => {
            queryClient.invalidateQueries({ queryKey: ['libraryBooks', unref(libraryId)] });
            queryClient.invalidateQueries({ queryKey: ['libraryBook', unref(libraryId), bookId.toString()] });
            options?.onDeleteSuccess?.(bookId);
        },
    });

    return {
        createLibraryBook,
        createLibraryBookPending,
        updateLibraryBook,
        updateLibraryBookPending,
        deleteLibraryBook,
        deleteLibraryBookPending,
    };
}
