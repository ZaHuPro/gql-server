import pubsub from "../subscription";

const userData = [
  {
    id: 1,
    username: "amir",
    books: []
  },
  {
    id: 2,
    username: "hussain",
    books: [
      {
        name: 'new',
        id: 2
      },
      {
        name: 'rrr',
        id: 3
      },
      {
        name: 'rrr',
        id: 5
      }
    ]
  },
];

export default {
  Query: {
    users: async (parent: any, args: any, context: any, info: any) => {
      console.log(JSON.stringify({ parent, args, context, info }))
      return userData;
    },
    user: async (parent: any, args: any, context: any, info: any) => {
      console.log({ parent, args, context, info })
      return userData.find((e) => e.id === args.id);
    },
  },
  Mutation: {
    addUser: async (_parent: any, { username }: any) => {
      const entry = {
        id: userData.length + 1,
        username: username ? username : "NP",
        books: [{
          name: 'new',
          id: userData.length + 1,
        }]
      };
      userData.push(entry);
      pubsub.publish("USER_ADDED", { userAdded: entry });
      return entry;
    },
  },
  Subscription: {
    userAdded: {
      subscribe: () => pubsub.asyncIterator(["USER_ADDED"]),
    },
  },
};
