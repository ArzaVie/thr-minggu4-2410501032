## Informasi Mahasiswa

- Nama : Arzza Munabim
- NIM : 2410501032
- Opsi : B - []

## Deskripsi Aplikasi

Aplikasi ini adalah aplikasi manajemen keuangan yang memungkinkan pengguna untuk mencatat pemasukan dan pengeluaran mereka. Aplikasi ini memiliki fitur untuk menambahkan transaksi baru, menghapus transaksi, dan melihat ringkasan keuangan seperti total pemasukan, total pengeluaran, dan saldo.

## Hooks yang Digunakan

- **useState**: Digunakan di file `DashboardScreen.js` untuk mengelola state filter transaksi (baris 11) dan di file `AddTransactionScreen.js` untuk mengelola state lokal seperti `name`, `amount`, dan `isIncome` (baris 9-11).
- **useEffect**: Digunakan di file `WalletContext.js` untuk memuat data awal dari AsyncStorage (baris 32) dan menyimpan data transaksi setiap kali terjadi perubahan pada state `transactions` (baris 49).
- **useReducer**: Digunakan di file `WalletContext.js` (baris 29) untuk mengelola state global aplikasi yang mencakup daftar transaksi dan status loading. Action types yang digunakan adalah `LOAD_DATA`, `ADD_INCOME`, `ADD_EXPENSE`, dan `DELETE_TRANSACTION`.
- **Custom Hook**: `useWallet` (file `useWallet.js`) digunakan untuk mengakses state global dari `WalletContext` dan menghitung total pemasukan, total pengeluaran, serta saldo berdasarkan transaksi yang ada.

## Screenshot
![Gambar 1] .assets/thr1.jpg
![Gambar 2] .assets/thr2.jpg
![Gambar 3] .assets/thr3.jpg
![Gambar 4] .assets/thr4.jpg

## Cara Install dari GitHub
1. Clone repository ini ke komputer Anda:

   ```bash
   git clone https://github.com/ArzaVie/thr-minggu4-2410501032
   ```

2. Masuk ke direktori proyek:

   ```bash
   cd thr-management
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Cara Menjalankan

1. Pastikan Anda berada di direktori proyek.

2. Jalankan perintah berikut untuk memulai aplikasi:

   ```bash
   npx expo start
   ```

3. Gunakan aplikasi Expo Go di perangkat seluler Anda atau emulator untuk menjalankan aplikasi.
