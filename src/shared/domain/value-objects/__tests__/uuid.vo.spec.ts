import { InvalidUuidError, Uuid } from "../uuid.vo";
import {validate as uuidValidate} from "uuid";

describe('Uuid unit tests', () => {

    const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate');

    test('should throw an error when uuid is invalid', () => {
        expect(() => {
            new Uuid('invalid-uuid')
        }).toThrow(new InvalidUuidError());

        expect(validateSpy).toHaveBeenCalled()
    });

    test('should create a valid uuid', () => {
        const uuid = new Uuid();
        expect(uuid.id).toBeDefined();
        expect(uuidValidate(uuid.id)).toBe(true);
        expect(validateSpy).toHaveBeenCalled()
    });

    test('should accept a valid uuid', () => {
        const uuid = new Uuid('432eda03-5e3b-4f83-82d9-de0042287b8d');
        expect(uuid.id).toBe('432eda03-5e3b-4f83-82d9-de0042287b8d')
        expect(validateSpy).toHaveBeenCalled()
    });
});