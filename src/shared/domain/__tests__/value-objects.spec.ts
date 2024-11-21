import { ValueObject } from "../value-object";

class SimpleValueObject extends ValueObject {
    constructor(readonly value: string) {
        super();
    }
}

class ComplexValueObject extends ValueObject {
    constructor(readonly value: string, readonly description: string) {
        super();
    }
}

describe('ValueObject Unit', () => {
    test('should be equal', () => {
        const simpleObject1 = new SimpleValueObject('test');
        const simpleObject2 = new SimpleValueObject('test');

        expect(simpleObject1.equals(simpleObject2)).toBe(true);

        const complexObject1 = new ComplexValueObject('test', 'test');
        const complexObject2 = new ComplexValueObject('test', 'test');

        expect(complexObject1.equals(complexObject2)).toBe(true);
    });

    test('should not be equal', () => {
        const simpleObject1 = new SimpleValueObject('test');
        const simpleObject2 = new SimpleValueObject('spec');

        expect(simpleObject1.equals(null as any)).toBe(false);
        expect(simpleObject1.equals(undefined as any)).toBe(false);
        expect(simpleObject1.equals(simpleObject2)).toBe(false);

        const complexObject1 = new ComplexValueObject('test', 'test');
        const complexObject2 = new ComplexValueObject('test', 'spec');

        expect(complexObject1.equals(complexObject2)).toBe(false);
        expect(simpleObject1.equals(complexObject2)).toBe(false);
    });
});