import axios from 'axios';

type User = {
  id: number;
  name: string;
  email: string;
};

const getUsers = async (): Promise<User[]> => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const { data } = await axios.get(url);
  return data;
};

const resolvers = {
  Query: {
    users: async () => {
      const users = await getUsers();
      return users;
    },
    userById: async (_: unknown, args: { id: string }) => {
      const users = await getUsers();

      const findedUser = users.find((user) => user.id === +args.id);
      return findedUser;
    }
  },
  Mutation: {}
};

export default resolvers;
