import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

// Enable branching
cmsCallback: cms => {
    cms.flags.set("branch-switcher", true);
    return cms;
  }

// Config
export default defineConfig({
  branch: 
    process.env.TINA_BRANCH! || // custom branch env override
    process.env.HEAD!, // Netlify branch env
  clientId: process.env.TINA_CLIENT_ID!, // Get this from tina.io
  token: process.env.TINA_TOKEN!, // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "static",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
