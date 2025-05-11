export class Factory<T extends object> {
    private transforms: Array<(obj: T) => void> = [];

    protected definition(): T {
        return {} as T;
    }

    protected withState(transform: (obj: T) => void): this {
        this.transforms.push(transform);
        return this;
    }

    create(data?: Partial<T>): T {
        const instance = this.definition();

        this.transforms.forEach((transform) => {
            transform(instance);
        });

        return Object.assign(instance, data ?? {});
    }

    createMany(count: number, data?: Partial<T>): T[] {
        return Array.from({ length: count }, () => this.create(data));
    }
}
