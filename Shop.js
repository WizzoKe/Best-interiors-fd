import { useState } from "react";
import Layout from "../components/Layout";
import Image from "next/image";
import Commerce from "@chec/commerce.js";

const commerce = new Commerce(process.env.NEXT_PUBLIC_COMMERCEJS_PUBLIC_KEY, true);

export default function Shop({ initial }) {
  const [products] = useState(initial);
  return (
    <Layout title="Shop | Interior Solutions KE">
      <section style={{ padding: 60 }}>
        <h2>Shop</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:20 }}>
          {products.map((pr) => (
            <div key={pr.id} style={{ border:"1px solid #ddd", borderRadius:8, overflow:"hidden" }}>
              <div style={{ position:"relative", width:"100%", height:200 }}>
                <Image src={pr.image.url} alt={pr.name} layout="fill" objectFit="cover" />
              </div>
              <div style={{ padding:16 }}>
                <h3 style={{ fontSize:16 }}>{pr.name}</h3>
                <p style={{ fontWeight:600 }}>{pr.price.formatted_with_symbol}</p>
                <button onClick={()=>commerce.cart.add(pr.id,1).then(()=>alert("Added"))} style={{ padding:"8px 12px" }}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await commerce.products.list({ limit:20 });
  return { props:{ initial: data }, revalidate:300 };
}