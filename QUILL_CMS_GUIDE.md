# Quill CMS Guide - KeceGame Website

## Overview

Quill CMS adalah sistem manajemen konten yang dibuat khusus untuk website KeceGame menggunakan Quill Editor. Sistem ini memungkinkan Anda untuk mengelola konten game dengan mudah tanpa perlu pengetahuan teknis yang mendalam.

## Fitur Utama

✅ **Rich Text Editor** - Menggunakan Quill Editor untuk konten yang kaya  
✅ **Local Storage** - Data disimpan di browser untuk kemudahan akses  
✅ **Form Management** - Form yang user-friendly untuk input data game  
✅ **Real-time Preview** - Lihat perubahan secara langsung  
✅ **Responsive Design** - Bekerja di desktop dan mobile  
✅ **No Database Required** - Tidak perlu setup database

## Cara Menggunakan

### 1. Akses CMS

1. Jalankan development server:

   ```bash
   npm run dev
   ```

2. Buka browser dan navigasi ke:
   ```
   http://localhost:3000/admin/cms-quill
   ```

### 2. Menambah Game Baru

1. Klik tombol **"Tambah Game"**
2. Isi form dengan informasi game:
   - **Judul**: Nama game (wajib)
   - **Slug**: URL-friendly version (otomatis dibuat dari judul)
   - **Deskripsi Singkat**: Deskripsi untuk preview (wajib)
   - **Deskripsi Lengkap**: Deskripsi detail game (wajib)
   - **Kategori**: Pilih kategori game
   - **Developer**: Nama developer (wajib)
   - **Publisher**: Nama publisher (wajib)
   - **Tanggal Rilis**: Kapan game dirilis (wajib)
   - **Harga**: Harga game (opsional)
   - **Diskon**: Persentase diskon (opsional)
   - **Rating Usia**: Rating konten game
   - **Platform**: Pilih platform yang didukung
   - **Konten Detail**: Gunakan Quill Editor untuk konten rich text
   - **Status**: Featured dan Published

3. Klik **"Simpan"** untuk menyimpan game

### 3. Mengedit Game

1. Di halaman daftar games, klik ikon **pensil** pada game yang ingin diedit
2. Ubah informasi yang diperlukan
3. Klik **"Update"** untuk menyimpan perubahan

### 4. Menghapus Game

1. Di halaman daftar games, klik ikon **trash** pada game yang ingin dihapus
2. Konfirmasi penghapusan

### 5. Melihat Game

1. Di halaman daftar games, klik ikon **mata** untuk melihat game
2. Atau buka langsung di: `http://localhost:3000/games/[slug]`

## Struktur Data

Data game disimpan dalam format JSON dengan struktur berikut:

```json
{
  "id": "unique-id",
  "title": "Nama Game",
  "slug": "nama-game",
  "description": "Deskripsi lengkap",
  "shortDescription": "Deskripsi singkat",
  "category": "action|adventure|rpg|strategy|simulation|sports|racing|puzzle|horror|fighting",
  "platforms": ["pc", "ps5", "xbox-series"],
  "releaseDate": "2024-01-01",
  "developer": "Nama Developer",
  "publisher": "Nama Publisher",
  "price": 59.99,
  "discount": 20,
  "ageRating": "E|E10+|T|M|AO",
  "featured": true,
  "published": true,
  "content": "<p>Rich text content from Quill</p>",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Kategori Game

- **Action**: Game aksi dengan gameplay cepat
- **Adventure**: Game petualangan dengan fokus cerita
- **RPG**: Role-playing games dengan karakter development
- **Strategy**: Game strategi yang membutuhkan perencanaan
- **Simulation**: Game simulasi kehidupan atau aktivitas
- **Sports**: Game olahraga
- **Racing**: Game balapan
- **Puzzle**: Game puzzle dan teka-teki
- **Horror**: Game horor dan thriller
- **Fighting**: Game pertarungan

## Platform yang Didukung

- **PC**: Windows, Mac, Linux
- **PS5**: PlayStation 5
- **PS4**: PlayStation 4
- **Xbox Series**: Xbox Series X/S
- **Xbox One**: Xbox One
- **Switch**: Nintendo Switch
- **Mobile**: iOS, Android
- **Web**: Browser-based games

## Rating Usia

- **E (Everyone)**: Semua umur
- **E10+ (Everyone 10+)**: 10 tahun ke atas
- **T (Teen)**: Remaja (13+)
- **M (Mature)**: Dewasa (17+)
- **AO (Adults Only)**: Hanya dewasa (18+)

## Quill Editor Features

Quill Editor menyediakan berbagai fitur untuk membuat konten yang kaya:

### Toolbar Options

- **Headers**: H1, H2, H3, H4, H5, H6
- **Text Formatting**: Bold, Italic, Underline, Strikethrough
- **Colors**: Text color dan background color
- **Lists**: Ordered dan unordered lists
- **Indentation**: Increase/decrease indent
- **Alignment**: Left, center, right, justify
- **Media**: Links, images, videos
- **Special**: Blockquotes, code blocks
- **Clean**: Remove formatting

### Tips Menggunakan Quill Editor

1. **Gunakan Headers**: Buat struktur konten yang jelas dengan headers
2. **Format Text**: Gunakan bold dan italic untuk emphasis
3. **Tambahkan Lists**: Buat daftar fitur atau informasi penting
4. **Insert Links**: Tambahkan link ke website atau video terkait
5. **Use Colors**: Gunakan warna untuk highlight informasi penting
6. **Clean Format**: Gunakan tombol clean untuk menghapus formatting yang tidak perlu

## Data Storage

### Local Storage

Data disimpan di browser menggunakan localStorage dengan key:

- `kecegame-games`: Array semua games

### Backup Data

Untuk backup data, Anda bisa:

1. Buka Developer Tools (F12)
2. Go to Application/Storage tab
3. Find Local Storage
4. Copy data dari `kecegame-games`
5. Save ke file JSON

### Restore Data

Untuk restore data:

1. Buka Developer Tools (F12)
2. Go to Application/Storage tab
3. Find Local Storage
4. Paste data JSON ke `kecegame-games`
5. Refresh halaman

## Troubleshooting

### Common Issues

1. **Data tidak tersimpan**
   - Pastikan browser mendukung localStorage
   - Check apakah ada error di console
   - Coba refresh halaman

2. **Quill Editor tidak muncul**
   - Pastikan react-quill terinstall
   - Check import statement
   - Restart development server

3. **Game tidak muncul di halaman games**
   - Pastikan game sudah di-publish
   - Check slug game
   - Refresh halaman games

4. **Form tidak submit**
   - Pastikan semua field wajib diisi
   - Check console untuk error
   - Pastikan tidak ada karakter khusus di slug

### Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development

### File Structure

```
src/
├── app/(admin)/admin/cms-quill/page.jsx    # CMS Interface
├── app/(client)/games/
│   ├── page.jsx                           # Games Listing
│   └── [slug]/page.jsx                    # Game Detail
└── components/editor/
    └── QuillEditor.jsx                    # Quill Editor Component
```

### Customization

#### Menambah Field Baru

1. Update formData state di CMS
2. Tambah input field di form
3. Update handleInputChange function
4. Update data structure

#### Mengubah Styling

1. Edit CSS classes di komponen
2. Update Tailwind classes
3. Customize Quill theme

#### Menambah Validasi

1. Update handleSubmit function
2. Tambah validation rules
3. Show error messages

## Production Deployment

### Considerations

1. **Data Persistence**: LocalStorage data akan hilang jika user clear browser data
2. **Multi-user**: Tidak support multiple users editing simultaneously
3. **Backup**: Implement regular backup system
4. **Database**: Consider migrating to database for production

### Migration to Database

Untuk production, pertimbangkan untuk migrate ke database:

1. Setup database (MongoDB, PostgreSQL, etc.)
2. Create API endpoints
3. Update CMS untuk fetch/save ke API
4. Implement authentication
5. Add user management

## Support

Jika mengalami masalah:

1. Check console untuk error messages
2. Verify browser compatibility
3. Check localStorage quota
4. Restart development server
5. Clear browser cache

## Changelog

- **v1.0.0** - Initial release dengan Quill Editor
- Added game management interface
- Implemented localStorage data storage
- Added rich text editing capabilities
- Created responsive design
- Added form validation

---

**Happy Content Managing!** 🎮

Quill CMS siap digunakan untuk mengelola konten game website KeceGame dengan mudah dan efisien.
