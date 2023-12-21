import { CollectionConfig } from "payload/types";

const Chat: CollectionConfig = {
  slug: "messages",
  admin: {
    useAsTitle: "content",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "owner",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "content",
      type: "text",
      required: true,
    },
    {
      name: "reciver",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
  ],
};

export default Chat;