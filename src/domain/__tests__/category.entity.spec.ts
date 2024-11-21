import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe('Category Unity Tests', () => {
    let validateSpy: any;
    beforeEach(() => {
        validateSpy = jest.spyOn(Category, "validate")
    });

    describe('Constructor', () => {
        it('shoud create a category with default values', () => {
            const category = new Category({
                name: 'Movie'
            })

            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });

        it('shoud create a category with description and is_active', () => {
            const created_at = new Date()
            const category = new Category({
                name: 'Movie',
                description: 'Movie description',
                is_active: false,
                created_at
            })

            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBe('Movie description');
            expect(category.is_active).toBeFalsy();
            expect(category.created_at).toBe(created_at);

        });

        it('shoud create a category with category_id', () => {
            const category = new Category({
                category_id: '432eda03-5e3b-4f83-82d9-de0042287b8d',
                name: 'Movie',
            })

            expect(category.category_id.id).toBe('432eda03-5e3b-4f83-82d9-de0042287b8d');
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);

        });
    })

    describe('Create', () => {
        it('should create a category', () => {
            const category = Category.create({
                name: 'Movie'
            });

            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        });

        it('should create a category with description', () => {
            const category = Category.create({
                name: 'Movie',
                description: 'Movie description'
            });

            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBe('Movie description');
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        });

        it('should create a category with is_active', () => {
            const category = Category.create({
                name: 'Movie',
                is_active: false
            });

            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeFalsy();
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('Field category_id', () => {
        const arrange = [
            { uuid: null }, { uuid: undefined }, { uuid: new Uuid().id }
        ];

        test.each(arrange)('uuid object %j should be accepted as valid constructor param', ({ uuid }) => {
            const category = new Category({
                name: 'Movie',
                category_id: uuid as any,
            });

            expect(category.category_id).toBeInstanceOf(Uuid);

            if (uuid) {
                expect(category.category_id.id).toBe(uuid);
            }
        });
    });

    describe('Actions', () => {
        it('should change a category name', () => {
            const category = Category.create({
                name: 'Movie'
            });

            category.changeName('TV Show')

            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('TV Show');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(2);
        });

        it('should change a category description', () => {
            const category = Category.create({
                name: 'Movie'
            });

            category.changeDescription('Movie description')

            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBe('Movie description');
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(2);
        });

        it('should disable a category', () => {
            const category = Category.create({
                name: 'Movie'
            });

            category.deactivate()

            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull;
            expect(category.is_active).toBeFalsy();
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        });

        it('should activate a category', () => {
            const category = Category.create({
                name: 'Movie',
                is_active: false
            });

            expect(category.is_active).toBeFalsy();

            category.activate()

            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull;
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('Validators', () => {
        describe('Name Field', () => {
            it('should not be null', () => {
                expect(() => {Category.create({name: null})})
                .containsErrorMessages({name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters"
                ]});
                expect(validateSpy).toHaveBeenCalledTimes(1);
            });


            it('should not be an empty string', () => {
                expect(() => {Category.create({name: ''})})
                .containsErrorMessages({name: [
                    "name should not be empty",
                ]});
                expect(validateSpy).toHaveBeenCalledTimes(1);
            });

            it('should be an string', () => {
                expect(() => {Category.create({name: 8 as any})})
                .containsErrorMessages({name: [
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters"
                ]});
                expect(validateSpy).toHaveBeenCalledTimes(1);
            });

            it('should be smaller than 255 chars', () => {
                expect(() => {Category.create({name: "a".repeat(256)})})
                .containsErrorMessages({name: [
                    "name must be shorter than or equal to 255 characters"
                ]});
                expect(validateSpy).toHaveBeenCalledTimes(1);
            });
        });

        describe('Description Field', () => {
            it('should not be an empty string', () => {
                expect(() => {Category.create({name: 'Movie', description: 8 as any})})
                .containsErrorMessages({description: [
                    "description must be a string",
                ]});
                expect(validateSpy).toHaveBeenCalledTimes(1);
            });

            it('should be optional', () => {
                const category = Category.create({name: 'Movie', description: null});
                expect(category.description).toBe(null)
                expect(validateSpy).toHaveBeenCalledTimes(1);
            });
        });

    });
});