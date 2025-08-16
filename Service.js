// pages/services.js
import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "../utils/supabaseClient";
import Layout from "../components/Layout";
import Image from "next/image";
import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

// Utility to trap focus in modal
function useFocusTrap(isOpen, ref) {
  useEffect(() => {
    if (!isOpen || !ref.current) return;
    const focusable = ref.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0], last = focusable[focusable.length - 1];
    function onKey(e) {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      if (e.key === "Escape") {
        ref.current.dispatchEvent(new Event("closeModal", { bubbles: true }));
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, ref]);
}

export default function Services({ services, error }) {
  const [activeTag, setActiveTag] = useState("All");
  const [lightbox, setLightbox] = useState({ service: null, index: 0 });
  const modalRef = useRef(null);

  // Trap focus when modal is open
  useFocusTrap(!!lightbox.service, modalRef);

  // SEO Structured Data
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "Service",
    "provider": {
      "@type": "Organization",
      "name": "Interior Solutions Kenya"
    },
    "serviceType": services.map((s) => s.title).join(", "),
    "areaServed": "Nairobi, Kenya"
  };

  if (error) {
    return (
      <Layout title="Services | Error">
        <p style={{ textAlign: "center", marginTop: 50, color: "red" }}>
          Failed to load services. Please try again later.
        </p>
      </Layout>
    );
  }

  // Build tag list
  const allTags = Array.from(new Set(services.flatMap((s) => s.tags || []))).sort();
  const tags = ["All", ...allTags];
  const filtered = activeTag === "All"
    ? services
    : services.filter((s) => (s.tags || []).includes(activeTag));

  // Keyboard nav in lightbox
  const onKey = useCallback((e) => {
    if (!lightbox.service) return;
    if (e.key === "ArrowRight") {
      setLightbox(({ service, index }) => ({
        service,
        index: (index + 1) % service.media.length
      }));
    } else if (e.key === "ArrowLeft") {
      setLightbox(({ service, index }) => ({
        service,
        index: (index - 1 + service.media.length) % service.media.length
      }));
    } else if (e.key === "Escape") {
      setLightbox({ service: null, index: 0 });
    }
  }, [lightbox.service]);
  useEffect(() => {
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Layout title="Services | Interior Solutions KE">
        <section style={{ padding: "4rem 1rem", maxWidth: 1024, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "2rem" }}>
            What We Offer
          </h2>

          {/* Tag Filter */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginBottom: "2rem" }}>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  border: "1px solid #ccc",
                  background: activeTag === tag ? "#1F3A93" : "#fff",
                  color: activeTag === tag ? "#fff" : "#333",
                  cursor: "pointer"
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Carousel */}
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          >
            {filtered.map((s) => (
              <SwiperSlide key={s.id}>
                <div style={{ background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", height: "100%" }}>
                  {s.media[0] && (
                    <div style={{ position: "relative", width: "100%", height: 180 }}>
                      <Image
                        src={s.media[0].url}
                        alt={s.title}
                        layout="fill"
                        objectFit="cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ margin: 0, fontSize: "1.25rem" }}>{s.title}</h3>
                    <p style={{ flex: 1, margin: "0.5rem 0", color: "#555" }}>{s.description}</p>
                    <button
                      onClick={() => setLightbox({ service: s, index: 0 })}
                      style={{
                        marginTop: "auto",
                        padding: "0.5rem 1rem",
                        background: "#1F3A93",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer"
                      }}
                      aria-label={`View gallery of ${s.title}`}
                    >
                      View Gallery
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Lightbox */}
          {lightbox.service && (
            <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.85)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000
              }}
              onClick={() => setLightbox({ service: null, index: 0 })}
            >
              <button
                onClick={(e) => { e.stopPropagation(); onKey({ key: "ArrowLeft" }); }}
                aria-label="Previous image"
                style={{ position: "absolute", left: 16, fontSize: "2rem", color: "#fff", background: "none", border: "none", cursor: "pointer" }}
              >
                ‹
              </button>
              <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: "90%", maxHeight: "80%" }}>
                <Image
                  src={lightbox.service.media[lightbox.index].url}
                  alt={lightbox.service.title}
                  layout="fill"
                  objectFit="contain"
                  loading="lazy"
                />
                <button
                  onClick={() => setLightbox({ service: null, index: 0 })}
                  aria-label="Close gallery"
                  style={{ position: "absolute", top: 16, right: 16, fontSize: "2rem", color: "#fff", background: "none", border: "none", cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onKey({ key: "ArrowRight" }); }}
                aria-label="Next image"
                style={{ position: "absolute", right: 16, fontSize: "2rem", color: "#fff", background: "none", border: "none", cursor: "pointer" }}
              >
                ›
              </button>
            </div>
          )}
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const { data: services, error } = await supabase
    .from("services")
    .select("id,slug,title,description,tags, service_media(media_assets(id,url))");

  const enhanced = !error
    ? services.map((s) => ({
        id: s.id,
        slug: s.slug,
        title: s.title,
        description: s.description,
        tags: s.tags,
        media: s.service_media.map((link) => link.media_assets),
      }))
    : [];

  return {
    props: { services: enhanced, error: !!error },
    revalidate: 300,
  };
}