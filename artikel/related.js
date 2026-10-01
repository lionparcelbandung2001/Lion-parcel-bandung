document.addEventListener("DOMContentLoaded", function () {
  // 1. Cek ketersediaan data artikel
  if (typeof artikelData === "undefined" || artikelData.length === 0) return;

  // 2. Ambil nama file HTML yang sedang dibuka
  const currentFileName = window.location.pathname.split("/").pop();

  // 3. Filter agar artikel yang sedang dibaca tidak muncul di daftar
  const artikelLain = artikelData.filter(item => {
    return item.link && !item.link.includes(currentFileName);
  });

  if (artikelLain.length === 0) return;

  // 4. Ambil 3 artikel acak
  const rekomendasi = artikelLain
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // 5. Buat elemen tampilan Rekomendasi
  const relatedBox = document.createElement("section");
  relatedBox.className = "artikel-terkait-wrapper";
  relatedBox.innerHTML = `
    <div style="
      margin: 30px 0 10px 0;
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

  // 6. Masukkan box rekomendasi ke dalam <main> atau .container
  const target = document.querySelector("main") || document.querySelector(".container") || document.body;
  target.appendChild(relatedBox);
});
