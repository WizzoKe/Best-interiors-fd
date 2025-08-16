// src/pages/portfolio.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Image from "next/image";
import { supabase } from "../utils/supabaseClient";
import Commerce from "@chec/commerce.js";

// 1. Import Swiper React components + styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

const commerce = new Commerce(process.env.NEXT_PUBLIC_COMMERCEJS_PUBLIC_KEY, true);

export default function Portfolio({ projects }) {
  const router = useRouter();
  const { category: catQ } = router.query;
  const filtered = catQ
    ? projects.filter((p) => p.tags?.includes(catQ))
    : projects;

  const [pd, setPd] = useState({});
  useEffect(() => {
    async function loadProducts() {
      const ids = Array.from(new Set(filtered.flatMap((p) => p.product_ids || [])));
      const out = {};
      for (let id of ids) {
        try {
          out[id] = (await commerce.products.retrieve(id)).data;
        } catch {}
      }
      setPd(out);
    }
    loadProducts();
  }, [filtered]);

  return (
    <Layout title="Portfolio | Interior Solutions KE">
      <section style={{ padding: "60px 0" }}>
        <h2 style={{ textAlign: "center" }}>Our Portfolio</h2>

        {/* 2. Category buttons (unchanged) */}
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          {["All","Kitchen","Bedroom","Dining Room","Gym","Office"].map((c) => (
            <button
              key={c}
              onClick={() =>
                router.push(
                  c === "All" ? "/portfolio" : `/portfolio?category=${c}`,
                  undefined,
                  { shallow: true }
                )
              }
              style={{
                margin: "0 8px",
                padding: "8px 16px",
                background: catQ === c || (!catQ && c === "All") ? "#1F3A93" : "#eee",
                color: catQ === c || (!catQ && c === "All") ? "#fff" : "#333",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* 3. Swiper Carousel */}
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {filtered.map((p) => (
            <SwiperSlide key={p.id}>
              <div style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ position: "relative", width: "100%", height: 200 }}>
                  <Image src={p.image_url} alt={p.title} layout="fill" objectFit="cover" />
                </div>
                <div style={{ padding: "16px" }}>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  {p.video_url && (
                    <video
                      src={p.video_url}
                      controls
                      style={{ width: "100%", margin: "12px 0", borderRadius: "4px" }}
                    />
                  )}
                  {p.product_ids?.length > 0 && (
                    <>
                      <h4 style={{ margin: "12px 0 8px" }}>Shop The Look</h4>
                      <div style={{ display: "flex", gap: "8px", overflowX: "auto" }}>
                        {p.product_ids.map((id) => {
                          const pr = pd[id];
                          if (!pr) return null;
                          return (
                            <div
                              key={id}
                              style={{
                                flex: "0 0 auto",
                                width: 100,
                                textAlign: "center",
                                border: "1px solid #eee",
                                borderRadius: "4px",
                                padding: "8px",
                              }}
                            >
                              <Image
                                src={pr.image.url}
                                alt={pr.name}
                                width={80}
                                height={80}
                                objectFit="contain"
                              />
                              <p style={{ fontSize: "0.8rem", margin: "4px 0" }}>
                                {pr.name}
                              </p>
                              <p style={{ fontWeight: "600", marginBottom: "4px" }}>
                                {pr.price.formatted}
                              </p>
                              <button
                                onClick={() =>
                                  commerce.cart.add(pr.id, 1).then(() => alert("Added to cart"))
                                }
                                style={{
                                  padding: "4px 6px",
                                  fontSize: "0.75rem",
                                  background: "#1F3A93",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                }}
                              >
                                Add
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data, error } = await supabase
    .from("projects")
    .select("id,title,description,image_url,video_url,product_ids,category,tags")
    .order("created_at", { ascending: false });

  return {
    props: { projects: error ? [] : data },
    revalidate: 300,
  };
}