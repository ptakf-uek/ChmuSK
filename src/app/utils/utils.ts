export function generateId(idLength = 12) {
  // Generate a semi-unique lowercase alphanumeric ID. ID's length can be passed as a parameter
  const characters = '01234567890abcdefghijklmnopqrstuvwxyz';

  let id = '';
  for (let i = 0; i < idLength; i++) {
    // Select a random character from the characters variable and append it to the id
    id += characters.charAt(Math.random() * characters.length);
  }

  return id;
}
