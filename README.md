# 🎋 Rotanera: Platform Desain Produk Rotan Berbasis AI

<img width="736" height="174" alt="Frame 5" src="https://github.com/user-attachments/assets/0ee38a41-3c11-488b-a275-6265a0d16a8d" />

[🌐 Coba Demo Aplikasi](https://rotanera.vercel.app/) | [📽️ Video Demo](https://github.com/username/repo/issues)

---

## 👋 Tentang Rotanera

**Rotanera** adalah platform inovatif yang menggabungkan kerajinan tradisional rotan dengan kecanggihan kecerdasan buatan (AI). Aplikasi ini dirancang untuk membantu pengrajin, desainer, dan pemilik bisnis UMKM dalam memvisualisasikan ide produk rotan dengan cepat dan meningkatkan kualitas materi pemasaran mereka.

Tidak perlu keahlian menggambar profesional atau menyewa fotografer mahal—Rotanera mendemokratisasi proses desain untuk semua orang.

---

## 📖 Panduan & Fitur Utama

Berikut adalah cara menggunakan fitur-fitur unggulan di Rotanera untuk memaksimalkan kreativitasmu:

### 1. 🎨 AI Canvas: Dari Coretan Kasar Menjadi Nyata
Fitur ini mengubah sketsa tangan sederhana menjadi gambar produk yang fotorealistik.

* **Cara Pakai:**
    1.  Masuk ke menu **Canvas/Buat Desain**.
    2.  Gunakan alat gambar (brush/pencil) untuk membuat sketsa kasar bentuk produk (misal: kursi, lampu, tas).
    3.  *(Opsional)* Tambahkan detail teks di kolom **Prompt** (contoh: *"Kursi rotan minimalis, kaki besi hitam"*).
    4.  Klik **Generate**. AI akan memproses sketsamu menjadi gambar visual berkualitas tinggi dalam hitungan detik.

### 2. 📸 Improve Design: Sulap Foto HP Jadi Foto Studio
Fitur andalan untuk UMKM! Tingkatkan kualitas foto produk mentah agar siap tampil di katalog atau marketplace.

* **Cara Pakai:**
    1.  Buka fitur **Improve Design**.
    2.  Upload foto produk rotanmu (bahkan foto dari kamera HP dengan latar berantakan pun bisa).
    3.  Biarkan AI memproses pencahayaan, ketajaman, dan mengganti latar belakang menjadi lebih estetik & profesional.
    4.  Download hasilnya dan siap diposting di media sosial.

### 3. 📂 Project
Agar alur kerjamu tetap rapi dan terorganisir.

* **Cara Pakai:**
    1.  Sebelum mulai mendesain, buat **Folder Proyek** baru di dashboard.
    2.  Beri nama sesuai koleksi atau pesanan klien.
    3.  Semua hasil generate dan sketsa akan tersimpan otomatis di dalam folder tersebut.

### 4. 🌍 Galeri Inspirasi
Kehabisan ide? Lihat apa yang dibuat oleh kreator lain.

* **Cara Pakai:**
    1.  Buka tab **Galeri**.
    2.  Jelajahi ribuan desain produk rotan hasil kreasi komunitas Rotanera.
    3.  Amati prompt atau gaya desain yang digunakan sebagai referensi karyamu selanjutnya.

---

## 🚀 Teknologi yang Digunakan

Proyek ini dibangun menggunakan teknologi web modern:

* **Frontend:** [Next.js](https://nextjs.org/) / React
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Drawing Engine:** Fabric.js / HTML5 Canvas
* **AI Integration:** Stable Diffusion / Replicate API (Sketch-to-Image & Image-to-Image)
* **Deployment:** [Vercel](https://vercel.com/)

---

## 🛠️ Cara Menjalankan di Lokal (Installation)

Ikuti langkah ini jika ingin mengembangkan proyek di komputermu sendiri:

1.  **Clone repositori ini**
    ```bash
    git clone [https://github.com/username-kamu/rotanera.git](https://github.com/username-kamu/rotanera.git)
    cd rotanera
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # atau
    yarn install
    ```

3.  **Konfigurasi Environment**
    Proyek ini membutuhkan variabel environment (seperti API Key) agar bisa berjalan. Kami telah menyediakan template di file `.env.example`.
    
    Salin file `.env.example` menjadi `.env.local` (atau `.env`):
    ```bash
    cp .env.example .env.local
    # Jika menggunakan Windows Command Prompt:
    # copy .env.example .env.local
    ```
    
    > **Penting:** Buka file `.env.local` yang baru saja dibuat, lalu isi nilai-nilainya (API Key, Database URL, dll) sesuai konfigurasi lokalmu.

4.  **Jalankan server development**
    ```bash
    npm run dev
    ```

5.  Buka [http://localhost:3000](http://localhost:3000) di browsermu.

---

## 🤝 Kontribusi

Kami sangat terbuka untuk kontribusi! Jika kamu punya ide fitur baru atau ingin memperbaiki bug:

1.  Fork repositori ini.
2.  Buat branch fitur baru (`git checkout -b fitur-keren`).
3.  Commit perubahanmu (`git commit -m 'Menambahkan fitur keren'`).
4.  Push ke branch (`git push origin fitur-keren`).
5.  Buat Pull Request.

---

<p align="center">
  Dibuat dengan ❤️ untuk Memajukan Industri Rotan Indonesia
</p>
