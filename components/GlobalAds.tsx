"use client";

import Script from "next/script";

export default function GlobalAds() {
  return (
    <>
      {/* Popunder (Highest Payout) */}
      <Script
        id="hilltop-popunder"
        strategy="afterInteractive"
        src="https://elementarywhole.com/bK3NVF0CP.3IpevabEm-V/J/ZdDd0u3iM/jBEp4zO/TZgy5VLITecayJMGTcg/5JO_TGMV"
      />

      {/* INPAGE PUSH */}
      <Script
        id="hilltop-inpage-push"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(xpk){
            var d = document,
                s = d.createElement('script'),
                l = d.scripts[d.scripts.length - 1];
            s.settings = xpk || {};
            s.src = "\\/\\/pricklyassociation.com\\/byX.V\\/sdd\\/GUlG0\\/YxW\\/cG\\/MeGmI9Fu\\/ZHUglhkxPuTQcDyTMXT_kMwcMoTpMjtJN\\/zbIwx\\/OCT\\/A\\/xTNqwm";
            s.async = true;
            s.referrerPolicy = 'no-referrer-when-downgrade';
            l.parentNode.insertBefore(s, l);
            })({});
          `,
        }}
      />
    </>
  );
}
