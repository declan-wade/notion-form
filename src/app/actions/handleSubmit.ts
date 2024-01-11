"use server";

const { Client } = require("@notionhq/client");

// Initializing Notion client
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  
  export async function addTodo (formData: FormData){
    const title = formData.get('title');
    const slug = formData.get('slug');
    const file = formData.get('file');
    try {
      console.log("Payload:  "+title +" -- " + slug + " - " + file)
      const databaseId = process.env.NOTION_DB_ID;
      const response = await notion.pages.create({
        "parent": {
          "type": "database_id",
          "database_id": databaseId
        },
        "properties": {
          "title": {"title": [{ "type": "text", "text": { "content": title } }]},
          "slug": {"rich_text": [{"text": {"content": slug }}]},
          "file": {"url": file },
        }
      });
      console.log(response);
      return {message:"Success"};
    } catch (error) {
        console.log(error)
        return {message: "Error"}
    }
  };