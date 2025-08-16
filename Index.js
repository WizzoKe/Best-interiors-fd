// src/pages/index.js
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import Layout from "../components/Layout";

export default function Home({ categories }) {
  const router = useRouter();

  return (
    <Layout title="Home | Interior Solutions Kenya">
      {/* Hero Section */}
      <section style={{ padding: "80px 0", textAlign: "center" }}>
        <h1>Designing Your Dream Spaces</h1>
        <p>Crafting stylish, functional interiors across Nairobi.</p>
      </section>

      {/* Explore by Category (auto from media_assets.tags) */}
      <section style={{ padding: "60px 0" }}>
        <h2>Explore by Category</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                router.push(`/portfolio?category=${encodeURIComponent(cat)}`)
              }
              style={{
                padding: "8px 16px",
                background: "#1F3A93",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Services Teaser (auto from services table if you implement) */}
      {/* You could fetch services similarly and map them here */}

      {/* Other homepage content... */}
    </Layout>
  );
}

export async function getStaticProps() {
  // 1. Fetch all non-empty tags
  const { data, error } = await supabase
    .from("media_assets")
    .select("tags")
    .neq("tags", "{}");

  if (error) {
    console.error("Error fetching tags:", error);
    return { props: { categories: [] }, revalidate: 300 };
  }

  // 2. Flatten and dedupe
  const allTags = data.flatMap((row) => row.tags || []);
  const categories = Array.from(new Set(allTags));

  return {
    props: { categories },
    revalidate: 300, // regenerate every 5 min
  };
}