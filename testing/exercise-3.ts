import { expect, test, describe } from '@jest/globals';

function getCapitalizeFirstWord(name: string): string {
  if (name == null) {
    throw new Error('Failed to capitalize first word with null');
  }
  if (!name) {
    return name;
  }
  return name.split(' ').map(
    n => n.length > 1 ? (n.substring(0, 1).toUpperCase() + n.substring(1).toLowerCase()) : n
  ).join(' ');
}

describe('Suite: getCapitalizeFirstWord', () => {
  
  describe('Errors', () => {
    test('Given a null input, When we call the function, Then should throw error', () => {
      // Arrange
      const input = null;
      const expectedError = 'Failed to capitalize first word with null';
      // Act/Assert
      expect(() => getCapitalizeFirstWord(input as any)).toThrow(expectedError);
    });

    test('Given an undefined input, When we call the function, Then should throw error', () => {
      // Arrange
      const input = undefined;
      const expectedError = 'Failed to capitalize first word with null';
      // Act/Assert
      expect(() => getCapitalizeFirstWord(input as any)).toThrow(expectedError);
    });
  });

  describe('Edge Cases', () => {
    test('Given an empty string, When we call the function, Then should return empty string', () => {
      // Arrange
      const input = '';
      const expectedOutput = '';
      // Act
      const result = getCapitalizeFirstWord(input);
      // Assert
      expect(result).toBe(expectedOutput);
    });

    test('Given a single character, When we call the function, Then should return the same character', () => {
      // Arrange
      const input = 'a';
      const expectedOutput = 'a';
      // Act
      const result = getCapitalizeFirstWord(input);
      // Assert
      expect(result).toBe(expectedOutput);
    });

    test('Given multiple single characters separated by spaces, When we call the function, Then should return them unchanged', () => {
      // Arrange
      const input = 'a b c';
      const expectedOutput = 'a b c';
      // Act
      const result = getCapitalizeFirstWord(input);
      // Assert
      expect(result).toBe(expectedOutput);
    });
  });

  describe('Success Cases', () => {
    test('Given a single lowercase word, When we call the function, Then should return it capitalized', () => {
      // Arrange
      const input = 'hello';
      const expectedOutput = 'Hello';
      // Act
      const result = getCapitalizeFirstWord(input);
      // Assert
      expect(result).toBe(expectedOutput);
    });

    test('Given a single uppercase word, When we call the function, Then should return it properly capitalized', () => {
      // Arrange
      const input = 'HELLO';
      const expectedOutput = 'Hello';
      // Act
      const result = getCapitalizeFirstWord(input);
      // Assert
      expect(result).toBe(expectedOutput);
    });

    test('Given multiple words, When we call the function, Then should capitalize each word', () => {
      // Arrange
      const input = 'hello world';
      const expectedOutput = 'Hello World';
      // Act
      const result = getCapitalizeFirstWord(input);    
      // Assert
      expect(result).toBe(expectedOutput);
    });

    test('Given mixed case words, When we call the function, Then should normalize to proper case', () => {
      // Arrange
      const input = 'hELLo WoRLd';
      const expectedOutput = 'Hello World';  
      // Act
      const result = getCapitalizeFirstWord(input);
      // Assert
      expect(result).toBe(expectedOutput);
    });

    test('Given words with numbers, When we call the function, Then should capitalize letters only', () => {
      // Arrange
      const input = 'hello123 world456';
      const expectedOutput = 'Hello123 World456';
      // Act
      const result = getCapitalizeFirstWord(input);
      // Assert
      expect(result).toBe(expectedOutput);
    });
  });
});


