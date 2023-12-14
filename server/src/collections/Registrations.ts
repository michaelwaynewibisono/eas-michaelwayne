import { CollectionConfig } from "payload/types";

const Registrations: CollectionConfig = {
  slug: "registrations",
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  /*
  admin: {
    useAsTitle: 'email',
  },
  */
  fields: [
    {
      name: "full_name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "text",
      required: true,
    },
    {
      name: "sekolah",
      type: "text",
      required: true,
    },
    {
      name: "status",
      type: "text",
      required: true,
    },
    // Email added by default
    // Add more fields as needed
  ],
};

export default Registrations;
