import fetch from "node-fetch";

let cache = null, last = 0;
const TTL = 1000 * 60 * 5; // 5 min

export default async function handler(req, res) {
  const now = Date.now();
  if (cache && now - last < TTL) return res.json(cache);

  const { IG_USER_ID, IG_ACCESS_TOKEN } = process.env;
  const r = await fetch(
    `https://graph.instagram.com/${IG_USER_ID}/media?fields=id,caption,media_url,permalink,timestamp&access_token=${IG_ACCESS_TOKEN}`
  );
  const data = await r.json();
  cache = data; last = now;
  res.json(data);
}