import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function InstagramFeed({ limit = 6 }) {
  const { data, error } = useSWR("/api/instagram", fetcher);

  if (error) return <p>Error loading Instagram feed.</p>;
  if (!data)  return <p>Loading…</p>;

  return (
    <section style={{ padding: "40px 0" }}>
      <h2>From Our Instagram</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "10px" }}>
        {data.data.slice(0, limit).map((post) => (
          <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer">
            <img src={post.media_url} alt={post.caption || ""} style={{ width: "100%", borderRadius: "8px" }} />
          </a>
        ))}
      </div>
    </section>
  );
}