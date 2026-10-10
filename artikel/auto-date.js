document.addEventListener("DOMContentLoaded", function () {
  // 1. Ambil elemen tag <time> artikel
  const timeElement = document.getElementById('article-updated-date');
  
  if (timeElement) {
    // Baca tanggal awal dari atribut datetime (contoh: "2026-10-03")
    const originalDateStr = timeElement.getAttribute('datetime');
    if (originalDateStr) {
      const originalPublishDate = new Date(originalDateStr);
      const today = new Date();

      // Hitung selisih tahun dari tanggal terbit awal ke hari ini
      let yearsDifference = today.getFullYear() - originalPublishDate.getFullYear();

      // Cek apakah tanggal/bulan hari ini sudah melewati tanggal terbit
      const hasPassedAnniversary = 
        today.getMonth() > originalPublishDate.getMonth() || 
        (today.getMonth() === originalPublishDate.getMonth() && today.getDate() >= originalPublishDate.getDate());

      if (!hasPassedAnniversary) {
        yearsDifference--;
      }

      // Jika sudah masuk tahun-tahun berikutnya (misal tahun 2027, 2028, dst), update tanggalnya
      let updatedDate = new Date(originalPublishDate);
      if (yearsDifference > 0) {
        updatedDate.setFullYear(originalPublishDate.getFullYear() + yearsDifference);
      }

      // Format ke ISO (YYYY-MM-DD) dan Format Bahasa Indonesia
      const isoDate = updatedDate.toISOString().split('T')[0];
      const options = { day: '2-digit', month: 'long', year: 'numeric' };
      const formattedDateIndo = updatedDate.toLocaleDateString('id-ID', options);

      // A. Update tampilan tanggal di HTML untuk pembaca
      timeElement.setAttribute('datetime', isoDate);
      timeElement.textContent = formattedDateIndo;

      // B. Update Schema JSON-LD untuk Google Bot
      const schemaScript = document.getElementById('article-schema');
      if (schemaScript) {
        try {
          let schemaData = JSON.parse(schemaScript.textContent);
          schemaData.dateModified = isoDate + "T08:00:00+07:00";
          schemaScript.textContent = JSON.stringify(schemaData, null, 2);
        } catch (e) {
          console.error("Gagal meng-update Schema JSON-LD:", e);
        }
      }
    }
  }

  // 2. Otomatis update tahun Copyright/Footer ke tahun berjalan
  const currentYearSpan = document.querySelectorAll('.current-year');
  const thisYear = new Date().getFullYear();
  currentYearSpan.forEach(el => {
    el.textContent = thisYear;
  });
});

