import { z } from 'zod';

const LibraryTypes = {
    Book: 1,
    Movie: 2,
} as const;

const LibraryTypeEnum = z.nativeEnum(LibraryTypes);

const librarySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(255),
    type: LibraryTypeEnum,
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

type LibraryType = z.infer<typeof LibraryTypeEnum>;

type Library = z.infer<typeof librarySchema>;

export {
    LibraryTypes,
    LibraryTypeEnum,
    librarySchema,

    type LibraryType,
    type Library,
};
