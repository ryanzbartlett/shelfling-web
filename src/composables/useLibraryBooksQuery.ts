import { shelflingApi } from '@/api/shelflingApi';
import type { CreateLibraryBookParams, LibraryBook } from '@/types/shelflingApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { unref, type MaybeRef } from 'vue';

export function useLibraryBooksQuery(libraryId: MaybeRef<string>) {
    return useQuery({
        queryKey: ['libraryBooks', unref(libraryId)],
        queryFn: () => shelflingApi.getLibraryBooks(unref(libraryId)),
    });
}

export function useLibraryBook(libraryId: MaybeRef<string>, options?: {
    onCreateSuccess?: (data: LibraryBook) => void;
    onUpdateSuccess?: (data: LibraryBook) => void;
    onDeleteSuccess?: (id: string) => void;
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
            queryClient.invalidateQueries({ queryKey: ['libraryBook', variables.bookId] });
            options?.onUpdateSuccess?.(data);
        },
    });

    return {
        createLibraryBook,
        createLibraryBookPending,
        updateLibraryBook,
        updateLibraryBookPending,
    };
}
