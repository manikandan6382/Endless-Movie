export default async function handler(req, res) {
  const { path, ...query } = req.query;

  const params = new URLSearchParams({
    ...query,
    api_key: process.env.VITE_TMDB_API_KEY,
  });

  const endpoint = Array.isArray(path) ? path.join('/') : path;
  const url = `https://api.themoviedb.org/3/${endpoint}?${params}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from TMDB' });
  }
}
