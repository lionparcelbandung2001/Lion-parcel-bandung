document.addEventListener("DOMContentLoaded", function () {
  // Pastikan artikelData dari data.js tersedia
  if (typeof artikelData === "undefined" || artikelData.length === 0) return;

  // Deteksi nama file artikel yang sedang dibuka saat ini
  const currentFileName = window.location.pathname.split("/").pop();

  // Filter daftar artikel agar tidak menampilkan artikel yang sedang dibaca
  const artikelLain = artikelData.filter(item => {
    return !item.link.includes(currentFileName);
  });

  if (artikelLain.length === 0) return;

  // Ambil 3 artikel acak dari artikel lama/lainnya (bisa disesuaikan jumlahnya)
  const rekomendasi = artikelLain
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // Buat komponen Widget Artikel Terkait
  const relatedBox = document.createElement("section");
  relatedBox.className = "artikel-terkait-wrapper";
  relatedBox.innerHTML = `
    <div style="
      margin: 40px 0 20px 0;
      padding: 20px;
      background: #ffffff;
      border-left: 4px solid #d71920;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    ">
      <h3 style="margin: 0 0 12px 0; color: #222; font-size: 18px;">
        📌 Rekomendasi Artikel Lainnya
      </h3>
      <ul style="margin: 0; padding-left: 20px; color: #555;">
        ${rekomendasi
          .map(
            item => `
          <li style="margin-bottom: 8px;">
            <a href="${item.link}" style="color: #d71920; text-decoration: none; font-weight: bold;">
              ${item.judul}
            </a>
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
  `;

  // Sisipkan otomatis ke dalam tag <main> atau sebelum <footer>
  const targetContainer = document.querySelector("main") || document.body;
  const footer = document.querySelector("footer");

  if (footer) {
    targetContainer.insertBefore(relatedBox, footer);
  } else {
    targetContainer.appendChild(relatedBox);
  }
});
