"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WA_LINK =
  "https://wa.me/6285181840082?text=Halo%20Central%20Laundry%20Express,%20saya%20ingin%20memesan%20layanan%20laundry.";

type MediaType = "all" | "image" | "video";
type Category = "semua" | "proses-pencucian" | "penyetrikaan" | "antar-jemput" | "fasilitas" | "tim-kami";

interface GalleryItem {
  id: number;
  type: "image" | "video";
  category: "proses-pencucian" | "penyetrikaan" | "antar-jemput" | "fasilitas" | "tim-kami";
  title: string;
  duration?: string;
  aspectRatio: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 1,
    type: "image",
    category: "proses-pencucian",
    title: "Mesin Cuci Higienis",
    aspectRatio: "1.4",
  },
  {
    id: 2,
    type: "image",
    category: "penyetrikaan",
    title: "Penyetrikaan Uap Presisi",
    aspectRatio: "1.4",
  },
  {
    id: 3,
    type: "image",
    category: "tim-kami",
    title: "Tim Profesional Central Laundry",
    aspectRatio: "1.4",
  },
  {
    id: 4,
    type: "video",
    category: "antar-jemput",
    title: "Layanan Antar Jemput",
    duration: "0:45",
    aspectRatio: "0.85",
  },
  {
    id: 5,
    type: "image",
    category: "fasilitas",
    title: "Penyimpanan Bersih & Rapi",
    aspectRatio: "1.4",
  },
  {
    id: 6,
    type: "video",
    category: "fasilitas",
    title: "Fasilitas Workshop",
    duration: "1:20",
    aspectRatio: "1.4",
  },
];

export default function GaleriPage() {
  const [mediaType, setMediaType] = useState<MediaType>("all");
  const [category, setCategory] = useState<Category>("semua");

  // Filter items based on selected level 1 and level 2 filters
  const filteredItems = galleryData.filter((item) => {
    const matchesType = mediaType === "all" ? true : item.type === mediaType;
    const matchesCategory =
      category === "semua" ? true : item.category === category;
    return matchesType && matchesCategory;
  });

  // Distribute items into columns to reproduce the exact columns layout
  // Column 1 contains items with ID 1 and 4
  // Column 2 contains items with ID 2, 5, and 6
  // Column 3 contains item with ID 3
  const col1Items = filteredItems.filter((item) => [1, 4].includes(item.id));
  const col2Items = filteredItems.filter((item) => [2, 5, 6].includes(item.id));
  const col3Items = filteredItems.filter((item) => [3].includes(item.id));

  return (
    <>
      <Navbar />

      <section style={{ padding: "80px 0 60px", backgroundColor: "var(--bg-light)", textAlign: "center" }}>
        <div className="container">
          <span className="gallery-intro-badge">Visual Showroom</span>
          <h1 className="gallery-page-title">Galeri</h1>
          <p className="gallery-page-desc">
            Intip kesungguhan kami dalam menjaga kebersihan dan kualitas pakaian
            Anda melalui dokumentasi proses operasional harian kami.
          </p>

          {/* Level 1 Filter (All | Images | Videos) */}
          <div style={{ marginBottom: "16px" }}>
            <div className="gallery-level1-container">
              <button
                className={`gallery-level1-btn ${mediaType === "all" ? "active" : ""}`}
                onClick={() => setMediaType("all")}
              >
                All
              </button>
              <button
                className={`gallery-level1-btn ${mediaType === "image" ? "active" : ""}`}
                onClick={() => setMediaType("image")}
              >
                Images
              </button>
              <button
                className={`gallery-level1-btn ${mediaType === "video" ? "active" : ""}`}
                onClick={() => setMediaType("video")}
              >
                Videos
              </button>
            </div>
          </div>

          {/* Level 2 Filter (Categories) */}
          <div className="gallery-level2-container">
            {[
              { id: "semua", label: "Semua Kategori" },
              { id: "proses-pencucian", label: "Proses Pencucian" },
              { id: "penyetrikaan", label: "Penyetrikaan" },
              { id: "antar-jemput", label: "Antar-Jemput" },
              { id: "fasilitas", label: "Fasilitas" },
              { id: "tim-kami", label: "Tim Kami" },
            ].map((cat) => (
              <button
                key={cat.id}
                className={`gallery-level2-btn ${category === cat.id ? "active" : ""}`}
                onClick={() => setCategory(cat.id as Category)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Masonry-Style Columns */}
          <div className="gallery-masonry-cols">
            {/* Column 1 */}
            <div className="gallery-masonry-col">
              {col1Items.map((item) => (
                <div key={item.id} className="gallery-card">
                  <div
                    className="gallery-media-wrapper"
                    style={{ aspectRatio: item.aspectRatio }}
                  >
                    <Image
                      src="/hero_laundry.png"
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    {item.type === "video" && (
                      <>
                        <div className="gallery-play-overlay">
                          <div className="gallery-play-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          </div>
                        </div>
                        <span className="gallery-duration-badge">{item.duration}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="gallery-masonry-col">
              {col2Items.map((item) => (
                <div key={item.id} className="gallery-card">
                  <div
                    className="gallery-media-wrapper"
                    style={{ aspectRatio: item.aspectRatio }}
                  >
                    <Image
                      src="/hero_laundry.png"
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    {item.type === "video" && (
                      <>
                        <div className="gallery-play-overlay">
                          <div className="gallery-play-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          </div>
                        </div>
                        <span className="gallery-duration-badge">{item.duration}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Column 3 */}
            <div className="gallery-masonry-col">
              {col3Items.map((item) => (
                <div key={item.id} className="gallery-card">
                  <div
                    className="gallery-media-wrapper"
                    style={{ aspectRatio: item.aspectRatio }}
                  >
                    <Image
                      src="/hero_laundry.png"
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    {item.type === "video" && (
                      <>
                        <div className="gallery-play-overlay">
                          <div className="gallery-play-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          </div>
                        </div>
                        <span className="gallery-duration-badge">{item.duration}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating WA Button */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat WhatsApp"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.017L2 22l5.135-1.348a9.929 9.929 0 004.877 1.28h.004c5.505 0 9.989-4.478 9.99-9.986 0-2.67-1.037-5.178-2.924-7.065A9.923 9.923 0 0012.012 2zm5.735 14.127c-.247.697-1.206 1.272-1.662 1.372-.44.097-.98.156-3.03-.7-2.623-1.096-4.31-3.766-4.44-3.94-.13-.171-1.05-1.401-1.05-2.673 0-1.272.664-1.897.9-.214.237-.317.525-.397.7-.397.176 0 .348.003.5.033.16.03.356-.062.554.416.2.483.684 1.665.743 1.785.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.25.25-.1.51.15.26.66 1.09 1.41 1.76.97.865 1.79 1.134 2.05 1.264.26.13.41.11.56-.06.15-.17.65-.75.82-.99.17-.25.35-.21.58-.12.24.09 1.5.71 1.76.84.26.13.43.2.5.31.06.11.06.66-.19 1.357z" />
        </svg>
      </a>
    </>
  );
}
