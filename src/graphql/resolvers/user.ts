import pubsub from "../subscription";

const userData = [
  {
    id: 1,
    username: "amir",
  },
  {
    id: 2,
    username: "hussain",
  },
];

export default {
  Query: {
    users: async () => {
      return userData;
    },
    user: async (_parent: any, { id }: any) => {
      return userData.find((e) => e.id === id);
    },
  },

  Mutation: {
    addUser: async (_parent: any, { username }: any) => {
        const entry = { id: userData.length + 1, username };
        userData.push(entry);
        pubsub.publish("USER_ADDED", entry);
        return entry;
    },
  },
  Subscription: {
    userAdded: {
      subscribe: () => pubsub.asyncIterator("USER_ADDED"),
    },
  },
};
