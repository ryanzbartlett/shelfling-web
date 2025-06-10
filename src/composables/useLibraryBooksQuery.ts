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
    onDeleteSuccess?: (id: string) => void;
}) {
    const queryClient = useQueryClient();

    const {
        mutate: createLibraryBook,
        isPending: createLibraryBookPending,
    } = useMutation({
        mutationFn: (params: CreateLibraryBookParams) => shelflingApi.createLibraryBook(unref(libraryId), params),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['libraryBooks'] });
            options?.onCreateSuccess?.(data);
        },
    });

    // const { mutate: deleteLibary } = useMutation({
    //     mutationFn: (id: string) => shelflingApi.deleteLibrary(id),
    //     onSuccess: (data, id) => {
    //         queryClient.invalidateQueries({ queryKey: ['libraries'] });
    //         options?.onDeleteSuccess?.(id);
    //     },
    // });

    return {
        createLibraryBook,
        createLibraryBookPending,
        // deleteLibary,
    };
}
