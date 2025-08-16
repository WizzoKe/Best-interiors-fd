import { useEffect } from "react";

export default function FacebookFeed() {
  useEffect(() => {
    if (window.FB) window.FB.XFBML.parse();
    else {
      const s = document.createElement("script");
      s.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div style={{ padding: "40px 0", textAlign: "center" }}>
      <div
        className="fb-page"
        data-href="https://www.facebook.com/YourFacebookPage"
        data-tabs="timeline"
        data-width="500"
        data-height="600"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote cite="https://www.facebook.com/YourFacebookPage" className="fb-xfbml-parse-ignore">
          <a href="https://www.facebook.com/YourFacebookPage">Facebook</a>
        </blockquote>
      </div>
    </div>
  );
}