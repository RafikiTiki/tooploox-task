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
