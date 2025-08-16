import Layout from "../components/Layout";
import Image from "next/image";

export default function About() {
  return (
    <Layout title="About Us | Interior Solutions Kenya">
      <section className="container">
        <h2>About Interior Solutions Kenya</h2>
        <p>Founded in 2017… our vision…</p>
        {/* Team bios */}
        <div className="two-col">
          <Image src="/images/brian-ouma.jpg" width={300} height={300} alt="Brian Ouma"/>
          <div>
            <h3>Brian Ouma</h3>
            <p>Founder &amp; CEO…</p>
          </div>
        </div>
        {/* Repeat for other team members */}
        <h3>Our Services</h3>
        {/* Services sections with images/text */}
      </section>
    </Layout>
  );
}