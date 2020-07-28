import { v4 as uuidv4 } from 'uuid';

export const getUserFirstAndLastName = (
  maybeName: string | undefined,
): {
  firstName: string;
  lastName: string;
} => {
  if (!maybeName) {
    return {
      firstName: '',
      lastName: '',
    };
  }

  const [firstName, lastName] = maybeName.split(' ');
  return {
    firstName,
    lastName,
  };
};

export const generateId = (): string => uuidv4();
