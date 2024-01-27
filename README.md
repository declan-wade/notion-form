# Notion-Form - Template / Proof-of-Concept

This repo is a very simple demonstration of uploading form data directly into a Notion database without needing a CMS. Using Vercel for hosting and blob storage, this solution can be hosted completely free up to 250MB of attachments. 
The Notion API does not support uploading of files at the moment. Instead, this uploads the file to Vercel Blob Storage and provides the link to download the file to Notion. 

> [!IMPORTANT]
> This repo is not ready to be used out-of-the-box. This can be used as a starter for a production-ready form but some knowledge of React, Material UI and TypeScript.

## Prerequisites:

* A Vercel account. As the code is using the Vercel Blob library, it is expecting a bunch of environment variables which Vercel automatically provide in the project settings.
* A Notion account, see the environment variable section below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdeclan-wade%2Fnotion-form%2F)

## Using:

* Provide a `.env` file either in the root directory or, preferably, in the environmental variables of the deployment.
* Instructions to obtain the Notion Token can be found [here](https://developers.notion.com/docs/create-a-notion-integration#create-your-integration-in-notion) and Database ID can be found [here](https://notiondemy.com/notion-database-id/)

  ```
  NOTION_TOKEN = < Your Notion API / Integration Token >
  NOTION_DB_ID = < The Notion DB ID >
  ```
  
* The API expects the Database and POST requests to match in name and type. The example code uses three columns, "title", "slug" and "URL"
* Take the following example from `handlesubmit.ts`:
```typescript
...
const response = await notion.pages.create({
        "parent": {
          "type": "database_id", // This is needed in all instances, leave this as it is.
          "database_id": databaseId
        },
        "properties": {
          "title": {"title": [{ "type": "text", "text": { "content": title } }]}, // A title object seems to be needed in all instances and is generally the first column in the database.
          "slug": {"rich_text": [{"text": {"content": slug }}]}, // This is expecting a field named "slug" in Notion, which is of the type "rich text".
          "file": {"url": file }, // // This is expecting a field named "file" in Notion, which is of the type "url".
        }
      });
...
```
> [!CAUTION]
> The code is very verbose with lots of logging for debug purposes. Be careful if handling sensitive information. 

## Development

* Fork and clone
* In the root directory, run `npm install`
* Provide the `.env.local` file outlined above
* Run with `npm run dev`
* Testing file uploads is not supported locally unless provided with a `BLOB_READ_WRITE_TOKEN`
