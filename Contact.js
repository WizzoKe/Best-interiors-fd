// src/pages/contact.js
import { useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";

export default function Contact() {
  const [status, setStatus] = useState("");

  const services = [
    "Custom Wall Paneling",
    "Ceiling Design",
    "Lighting Solutions",
    "Custom Furniture",
    "Full Interior Fit-Out",
    "Kitchen Remodel",
    "Bathroom Design",
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Sending…");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        service: e.target.service.value,
        message: e.target.message.value,
      }),
    });
    if (res.ok) {
      setStatus("Sent!");
      e.target.reset();
    } else {
      setStatus("Failed to send.");
    }
  }

  return (
    <>
      <Head>
        <title>Contact | Interior Solutions Kenya</title>
        <meta name="description" content="Get in touch with Interior Solutions Kenya for bespoke interior design services in Nairobi." />

        {/* Open Graph */}
        <meta property="og:title" content="Contact | Interior Solutions Kenya" />
        <meta property="og:description" content="Reach out to us for custom wall paneling, ceiling design, lighting solutions, and more." />
        <meta property="og:url" content="https://your-domain.com/contact" />
        <meta property="og:type" content="website" />
        {/* If you have a social image, add it here */}
        <meta property="og:image" content="https://your-domain.com/images/og-contact.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact | Interior Solutions Kenya" />
        <meta name="twitter:description" content="Reach out for bespoke interior design services in Nairobi." />
        <meta name="twitter:image" content="https://your-domain.com/images/og-contact.jpg" />
      </Head>

      <Layout title="Contact Us | Interior Solutions Kenya">
        <section style={{ padding: "60px 0", maxWidth: "600px", margin: "0 auto" }}>
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <label>
              Name
              <input name="name" type="text" required style={{ width: "100%", padding: "8px" }} />
            </label>
            <label>
              Email
              <input name="email" type="email" required style={{ width: "100%", padding: "8px" }} />
            </label>
            <label>
              Service
              <select name="service" required style={{ width: "100%", padding: "8px" }}>
                <option value="" disabled selected>-- Choose a Service --</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              Message
              <textarea name="message" rows="5" required style={{ width: "100%", padding: "8px" }} />
            </label>
            <button type="submit" style={{ padding: "12px", background: "#1F3A93", color: "#fff", border: "none", borderRadius: "4px" }}>
              Send Message
            </button>
            {status && <p>{status}</p>}
          </form>

          {/* WhatsApp Button */}
          <div style={{ margin: "24px 0", textAlign: "center" }}>
            <a
              href="https://wa.me/254712345678?text=Hello%20Interior%20Solutions"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "12px 20px",
                background: "#25D366",
                color: "#fff",
                borderRadius: "4px",
                textDecoration: "none",
              }}
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Social Media */}
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <h3>Follow Us</h3>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "12px" }}>
              <a
                href="https://www.instagram.com/interior_solutions_kenya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Interior Solutions Kenya on Instagram"
              >
                <img src="/icons/instagram.svg" alt="Instagram" width="32" height="32" />
              </a>
              <a
                href="https://www.facebook.com/InteriorSolutionsKenya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Interior Solutions Kenya on Facebook"
              >
                <img src="/icons/facebook.svg" alt="Facebook" width="32" height="32" />
              </a>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div style={{ width: "100%", height: "0", paddingBottom: "56%", position: "relative", marginTop: "40px" }}>
            <iframe
              src={process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL}
              style={{
                border: 0,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </Layout>
    </>
  );
}