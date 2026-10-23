const { Client } = require('@notionhq/client');
require('dotenv').config();

module.exports = function (app) {
  app.get('/api/projects', async (req, res) => {
    try {
      if (!process.env.NOTION_TOKEN || !process.env.NOTION_PROJECTS_DB_ID) {
        return res.status(500).json({ error: 'NOTION_TOKEN or NOTION_PROJECTS_DB_ID is missing from .env' });
      }

      const notion = new Client({ auth: process.env.NOTION_TOKEN });
      const response = await notion.databases.query({
        database_id: process.env.NOTION_PROJECTS_DB_ID,
      });

      // Proses pembersihan data agar formatnya sama persis seperti di api/projects.js
      const projects = response.results.map((page) => {
        const props = page.properties;
        return {
          id: page.id,
          title: props.Title?.title[0]?.plain_text || 'Untitled',
          categories: props.Categories?.multi_select?.map((c) => c.name) || [],
          image: props['Main Image']?.files[0]?.file?.url || props['Main Image']?.files[0]?.external?.url || '',
          gallery: props.Gallery?.files?.map((f) => f.file?.url || f.external?.url) || [],
          description: props.Description?.rich_text[0]?.plain_text || '',
          technologies: props.Technologies?.multi_select?.map((t) => t.name) || [],
          link: props.Link?.url || '',
        };
      });

      res.status(200).json(projects);
    } catch (error) {
      console.error('Error in setupProxy /api/projects:', error);
      res.status(500).json({ error: error.message });
    }
  });
};
