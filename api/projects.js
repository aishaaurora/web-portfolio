import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_PROJECTS_DB_ID,
    });

    // Proses pembersihan data agar formatnya sama persis seperti array lamamu
    const projects = response.results.map((page) => {
      const props = page.properties;
      return {
        id: page.id,
        title: props.Title?.title[0]?.plain_text || 'Untitled',
        categories: props.Categories?.multi_select?.map(c => c.name) || [],
        image: props['Main Image']?.files[0]?.file?.url || props['Main Image']?.files[0]?.external?.url || '',
        gallery: props.Gallery?.files?.map(f => f.file?.url || f.external?.url) || [],
        description: props.Description?.rich_text[0]?.plain_text || '',
        technologies: props.Technologies?.multi_select?.map(t => t.name) || [],
        link: props.Link?.url || ''
      };
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}