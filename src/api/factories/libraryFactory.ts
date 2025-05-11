import { LibraryTypes, type Library } from '@/types/shelflingApi';
import { faker } from '@faker-js/faker';
import { Factory } from './factory';

export class LibraryFactory extends Factory<Library> {
    protected definition(): Library {
        const created_at = faker.date.recent({ days: 14 });
        return {
            id: faker.string.uuid(),
            name: faker.lorem.words({ min: 3, max: 5 }),
            type: faker.helpers.arrayElement([
                LibraryTypes.Book,
                LibraryTypes.Movie,
            ]),
            created_at: created_at.toISOString(),
            updated_at: faker.date.between({ from: created_at, to: Date.now() }).toISOString(),
        };
    }

    public createManySorted(count: number): Library[] {
        return this.createMany(count)
            .sort((a, b) => a.updated_at.localeCompare(b.updated_at));
    }
}
