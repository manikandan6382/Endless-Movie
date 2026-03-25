export default async function handler(req, res) {
  const { path } = req.query;
  const endpoint = Array.isArray(path) ? path.join('/') : path;
  const url = `https://image.tmdb.org/t/p/${endpoint}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return res.status(response.status).end();

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const buffer = await response.arrayBuffer();

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(200).send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).end();
  }
}
