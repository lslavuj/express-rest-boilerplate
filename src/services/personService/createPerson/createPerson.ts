const createPerson = (): Promise<{ id: number; name: string }> =>
  Promise.resolve({ id: 1, name: 'Test' });

export default createPerson;
