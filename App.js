import { useState } from "react";

const SIZES = ["Short", "Medium", "Long", "Extra Long"];
const SIZE_LABELS = { Short: "S", Medium: "M", Long: "L", "Extra Long": "XL" };

const CATEGORIES = [
  {
    name: "Cuts & Styling",
    services: [
      {
        name: "Trim",
        desc: "A clean finish to remove split ends and maintain your shape.",
        prices: { Short: 195, Medium: 195, Long: 195, "Extra Long": 195 },
        note: "Wash & blowdry not included.",
      },
      {
        name: "Style Cut",
        desc: "A full cut shaped to suit your face and lifestyle.",
        prices: { Short: 325, Medium: 325, Long: 325, "Extra Long": 325 },
      },
      {
        name: "Blowdry",
        desc: "Wash, blow and style. Smooth, polished, ready to go.",
        prices: { Short: 290, Medium: 295, Long: 320, "Extra Long": 450 },
      },
      {
        name: "Ladies Cut & Blowdry",
        desc: "Full cut plus wash, blow and style. The complete visit.",
        prices: { Short: 410, Medium: 540, Long: 560, "Extra Long": 600 },
      },
      {
        name: "Cut, Blowdry & Flat Iron",
        desc: "Cut, wash, blow — finished sleek and straight.",
        prices: { Short: 460, Medium: 530, Long: 580, "Extra Long": 640 },
      },
      {
        name: "Adding Curls",
        desc: "Wave or curl styling added to your blowdry finish.",
        prices: { Short: 180, Medium: 180, Long: 180, "Extra Long": 180 },
        note: "Add-on service.",
      },
      {
        name: "Flat Iron Only",
        desc: "Straightening finish on dry hair.",
        prices: { Short: 150, Medium: 150, Long: 150, "Extra Long": 150 },
        note: "Wash & blowdry not included.",
      },
    ],
  },
  {
    name: "Hair Colour",
    services: [
      {
        name: "Root Colour Only",
        desc: "Colour applied to regrowth only. Refreshes and covers without processing the lengths.",
        prices: { Short: 640, Medium: 640, Long: 640, "Extra Long": 640 },
      },
      {
        name: "Root Colour & Blowdry",
        desc: "Root application plus a full wash, blow and style finish.",
        prices: { Short: 910, Medium: 1040, Long: 1180, "Extra Long": 1310 },
      },
      {
        name: "Semi Colour & Blowdry",
        desc: "A semi-permanent colour for tone, shine and refresh — no harsh commitment.",
        prices: { Short: 940, Medium: 1075, Long: 1210, "Extra Long": 1340 },
      },
      {
        name: "Tint / Colour Only",
        desc: "Full permanent colour application without the blowdry finish.",
        prices: { Short: 640, Medium: 770, Long: 950, "Extra Long": 1080 },
      },
      {
        name: "Toner & Blowdry",
        desc: "Toner to neutralise unwanted warmth or brassiness, plus a blowdry finish.",
        prices: { Short: 510, Medium: 645, Long: 780, "Extra Long": 910 },
      },
      {
        name: "Hairline Colour",
        desc: "Quick colour refresh along the hairline only.",
        prices: { Short: 310, Medium: 310, Long: 310, "Extra Long": 310 },
      },
    ],
  },
  {
    name: "Highlights & Balayage",
    services: [
      {
        name: "Half Head Bleach",
        desc: "Bleach highlights through the top section. Natural, sun-kissed dimension.",
        prices: { Short: 940, Medium: 1075, Long: 1235, "Extra Long": 1380 },
      },
      {
        name: "Full Head Bleach",
        desc: "All-over bleach highlights for maximum lightness and lift.",
        prices: { Short: 1150, Medium: 1205, Long: 1510, "Extra Long": 1790 },
      },
      {
        name: "Bleach & Tone",
        desc: "Bleach highlights finished with a toner for a seamless, polished result.",
        prices: { Short: 1200, Medium: 1335, Long: 1480, "Extra Long": null },
      },
      {
        name: "Bleach, Tone & Blowdry",
        desc: "The full highlight service — bleach, tone and a blowdry finish.",
        prices: { Short: 1475, Medium: 1610, Long: 1755, "Extra Long": null },
      },
      {
        name: "Bleach, Tone, Cut & Blowdry",
        desc: "Complete transformation — highlights, tone, cut and styled finish.",
        prices: { Short: 1735, Medium: 1870, Long: 2020, "Extra Long": null },
      },
      {
        name: "1 Colour Balayage & Blowdry",
        desc: "Hand-painted balayage in one shade for a natural, grown-out effect.",
        prices: { Short: 1490, Medium: 1755, Long: 2035, "Extra Long": 2305 },
      },
      {
        name: "2 Colour Balayage & Blowdry",
        desc: "Two-tone hand-painted balayage for depth and dimension.",
        prices: { Short: 1800, Medium: 2065, Long: 2340, "Extra Long": 2615 },
      },
      {
        name: "Gents Highlights & Cut",
        desc: "Highlights and a cut for gents. Clean, natural finish.",
        prices: { Short: 730, Medium: 730, Long: 730, "Extra Long": 730 },
      },
    ],
  },
  {
    name: "Brazilians & Keratin",
    services: [
      {
        name: "72 Keratin Brazilian",
        desc: "Our signature treatment. Smooths, strengthens and controls frizz from the inside out. Lasts up to 12 weeks.",
        prices: { Short: 960, Medium: 1255, Long: 1600, "Extra Long": 1900 },
        highlight: true,
      },
      {
        name: "Cacau",
        desc: "A premium smoothing treatment with deeper conditioning. Ideal for resistant or coarse hair.",
        prices: { Short: 1300, Medium: 1500, Long: 1805, "Extra Long": 2120 },
      },
      {
        name: "Cacau Fringe Only",
        desc: "Cacau treatment applied to the fringe area only.",
        prices: { Short: 605, Medium: 605, Long: 605, "Extra Long": 605 },
      },
      {
        name: "Botox",
        desc: "Deep restoration for dry, brittle or damaged hair. Replenishes what the hair has lost. Lasts 8 to 10 weeks.",
        prices: { Short: 850, Medium: 1135, Long: 1445, "Extra Long": 1800 },
        highlight: true,
      },
    ],
  },
  {
    name: "Perms",
    services: [
      {
        name: "Perm",
        desc: "Classic perm for lasting wave and curl. Customised to the curl pattern you want.",
        prices: { Short: 1220, Medium: 1525, Long: 1870, "Extra Long": 2225 },
      },
      {
        name: "Spiral Perm",
        desc: "Defined, spiral curls throughout. Long-lasting and low-maintenance once set.",
        prices: { Short: 1530, Medium: 1875, Long: 2220, "Extra Long": 2575 },
      },
    ],
  },
  {
    name: "Occasion Hair",
    services: [
      {
        name: "Occasion Updo",
        desc: "Styled updo for events, dinners or any occasion worth dressing for.",
        prices: { Short: 675, Medium: 675, Long: 675, "Extra Long": 675 },
      },
      {
        name: "Bridesmaids Updo",
        desc: "Elegant updo for bridesmaids. Coordinated styling available for groups.",
        prices: { Short: 805, Medium: 805, Long: 805, "Extra Long": 805 },
      },
      {
        name: "Matric Updo",
        desc: "A special updo for your matric farewell. You deserve to feel incredible.",
        prices: { Short: 810, Medium: 810, Long: 810, "Extra Long": 810 },
      },
      {
        name: "Bridal Updo",
        desc: "Your day, your look. Bridal styling with the detail and care it deserves.",
        prices: { Short: 1070, Medium: 1070, Long: 1070, "Extra Long": 1070 },
      },
      {
        name: "Kiddies Updo",
        desc: "Sweet updo styling for little ones.",
        prices: { Short: 415, Medium: 415, Long: 415, "Extra Long": 415 },
      },
    ],
  },
  {
    name: "Treatments",
    services: [
      {
        name: "Argan Moisture Treatment",
        desc: "Intense moisture boost with Argan oil. Restores softness and shine.",
        prices: { Short: 250, Medium: 250, Long: 250, "Extra Long": 250 },
      },
      {
        name: "Matrix 1 Min Moisture Treatment",
        desc: "Quick moisture treatment added to any service. Immediate softness.",
        prices: { Short: 210, Medium: 210, Long: 210, "Extra Long": 210 },
      },
      {
        name: "Dikson Nourishing Treatment",
        desc: "Nourishing and moisturising treatment for hair that needs rebuilding.",
        prices: { Short: 240, Medium: 240, Long: 240, "Extra Long": 240 },
      },
    ],
  },
];

const formatPrice = (price) => {
  if (!price) return "Ask us";
  return `R${price.toLocaleString("en-ZA")}`;
};

export default function App() {
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [openCat, setOpenCat] = useState(null);

  const waLink = `https://wa.me/27717316424?text=Hi%2C%20I%27d%20like%20to%20book%20an%20appointment%20at%20Oayssis.`;

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#FAF8F4",
      minHeight: "100vh",
      color: "#2C2416",
      maxWidth: 480,
      margin: "0 auto",
      paddingBottom: 100,
    }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Poppins:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #FAF8F4; }

        .app { font-family: 'Poppins', sans-serif; }

        .header {
          background: #2C2416;
          padding: 40px 24px 32px;
          text-align: center;
          position: relative;
        }
        .header::after {
          content: '';
          display: block;
          height: 1px;
          background: #C4A882;
          margin: 20px auto 0;
          width: 60%;
        }

        .logo {
          font-family: 'Lora', serif;
          font-size: 38px;
          font-weight: 600;
          color: #C4A882;
          letter-spacing: 4px;
        }
        .tagline {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 15px;
          color: #FAF8F4;
          margin-top: 6px;
          opacity: 0.85;
        }
        .subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          color: #C4A882;
          margin-top: 14px;
          opacity: 0.7;
          text-transform: uppercase;
        }

        .size-section {
          padding: 24px 20px 16px;
          background: #FAF8F4;
          border-bottom: 1px solid #E8E0D5;
        }
        .size-label {
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #8A7A65;
          margin-bottom: 12px;
          font-family: 'Poppins', sans-serif;
        }
        .size-buttons {
          display: flex;
          gap: 8px;
        }
        .size-btn {
          flex: 1;
          padding: 10px 4px;
          border: 1px solid #C4A882;
          background: transparent;
          color: #6A5A45;
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 2px;
          letter-spacing: 0.5px;
        }
        .size-btn.active {
          background: #2C2416;
          color: #C4A882;
          border-color: #2C2416;
          font-weight: 500;
        }

        .size-note {
          font-size: 11px;
          color: #8A7A65;
          margin-top: 10px;
          font-family: 'Lora', serif;
          font-style: italic;
        }

        .categories { padding: 8px 0; }

        .cat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          cursor: pointer;
          border-bottom: 1px solid #E8E0D5;
          background: #FAF8F4;
          transition: background 0.15s;
        }
        .cat-header:hover { background: #F3EDE4; }
        .cat-header.open { background: #F3EDE4; }

        .cat-name {
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #2C2416;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
        }
        .cat-chevron {
          color: #C4A882;
          font-size: 16px;
          transition: transform 0.2s;
          font-style: normal;
        }
        .cat-chevron.open { transform: rotate(180deg); }

        .services {
          background: #FDFAF6;
          border-bottom: 1px solid #E8E0D5;
        }

        .service-item {
          padding: 16px 20px;
          border-bottom: 1px solid #EDE7DC;
        }
        .service-item:last-child { border-bottom: none; }

        .service-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        .service-name {
          font-family: 'Lora', serif;
          font-size: 17px;
          color: #2C2416;
          line-height: 1.3;
          flex: 1;
        }
        .service-name.highlight { color: #2C2416; }

        .service-price {
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #C4A882;
          white-space: nowrap;
          padding-top: 2px;
        }
        .service-price.ask { color: #8A7A65; font-size: 13px; }

        .service-desc {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 13px;
          color: #7A6A55;
          margin-top: 6px;
          line-height: 1.5;
        }
        .service-note {
          font-family: 'Poppins', sans-serif;
          font-size: 10px;
          color: #A0906A;
          margin-top: 5px;
          letter-spacing: 0.5px;
        }
        .highlight-bar {
          width: 2px;
          background: #C4A882;
          border-radius: 2px;
          margin-right: 12px;
          align-self: stretch;
          min-height: 20px;
          flex-shrink: 0;
        }
        .service-inner {
          display: flex;
          align-items: flex-start;
        }

        .footer-cta {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 480px;
          background: #FAF8F4;
          border-top: 1px solid #E8E0D5;
          padding: 14px 20px 20px;
        }
        .cta-note {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 12px;
          color: #8A7A65;
          text-align: center;
          margin-bottom: 10px;
        }
        .cta-btn {
          display: block;
          width: 100%;
          background: #2C2416;
          color: #C4A882;
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-align: center;
          padding: 14px;
          text-decoration: none;
          border-radius: 2px;
          border: 1px solid #C4A882;
          cursor: pointer;
          transition: all 0.2s;
        }
        .cta-btn:hover {
          background: #C4A882;
          color: #2C2416;
        }

        .bottom-note {
          text-align: center;
          padding: 32px 20px 16px;
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 12px;
          color: #8A7A65;
          line-height: 1.7;
        }
        .address {
          text-align: center;
          font-family: 'Poppins', sans-serif;
          font-size: 10px;
          letter-spacing: 1px;
          color: #A0906A;
          padding-bottom: 20px;
        }
      `}</style>

      <div className="app">
        {/* Header */}
        <div className="header">
          <div className="logo">OAYSSIS</div>
          <div className="tagline">Hair & Beauty Bar</div>
          <div className="subtitle">Services & Pricing 2026</div>
        </div>

        {/* Size Selector */}
        <div className="size-section">
          <div className="size-label">Select your hair length</div>
          <div className="size-buttons">
            {SIZES.map((s) => (
              <button
                key={s}
                className={`size-btn${selectedSize === s ? " active" : ""}`}
                onClick={() => setSelectedSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="size-note">
            Prices shown are for {selectedSize.toLowerCase()} hair.
          </div>
        </div>

        {/* Categories */}
        <div className="categories">
          {CATEGORIES.map((cat) => {
            const isOpen = openCat === cat.name;
            return (
              <div key={cat.name}>
                <div
                  className={`cat-header${isOpen ? " open" : ""}`}
                  onClick={() => setOpenCat(isOpen ? null : cat.name)}
                >
                  <span className="cat-name">{cat.name}</span>
                  <span className={`cat-chevron${isOpen ? " open" : ""}`}>&#8964;</span>
                </div>

                {isOpen && (
                  <div className="services">
                    {cat.services.map((svc) => {
                      const price = svc.prices[selectedSize];
                      const isAsk = price === null;
                      return (
                        <div className="service-item" key={svc.name}>
                          <div className="service-inner">
                            {svc.highlight && <div className="highlight-bar" />}
                            <div style={{ flex: 1 }}>
                              <div className="service-top">
                                <div className={`service-name${svc.highlight ? " highlight" : ""}`}>
                                  {svc.name}
                                </div>
                                <div className={`service-price${isAsk ? " ask" : ""}`}>
                                  {formatPrice(price)}
                                </div>
                              </div>
                              <div className="service-desc">{svc.desc}</div>
                              {svc.note && <div className="service-note">{svc.note}</div>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom notes */}
        <div className="bottom-note">
          All full services include wash & blowdry.<br />
          Not sure what your hair needs? Just ask us.
        </div>
        <div className="address">
          Unit 113, Riverside Lofts, Tyger Falls Blvd, Bellville
        </div>

        {/* Sticky CTA */}
        <div className="footer-cta">
          <div className="cta-note">Not sure which service is right for you?</div>
          <a className="cta-btn" href={waLink} target="_blank" rel="noreferrer">
            WhatsApp Us to Book
          </a>
        </div>
      </div>
    </div>
  );
}
