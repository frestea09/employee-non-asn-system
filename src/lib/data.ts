export type DailyActivity = {
  id: string;
  date: string;
  activity: string;
  status: 'Menunggu Validasi' | 'Disetujui' | 'Ditolak';
};

export type MonthlyPerformance = {
  id: string;
  month: string;
  year: number;
  realization: string;
  status: 'Menunggu Validasi' | 'Disetujui' | 'Ditolak';
};

export type Attendance = {
  id: string;
  date: string;
  status: 'Hadir' | 'Sakit' | 'Izin';
};

export const mockDailyActivities: DailyActivity[] = [
  { id: '1', date: '2024-07-28', activity: 'Melakukan pemeriksaan rutin pasien di bangsal A.', status: 'Disetujui' },
  { id: '2', date: '2024-07-28', activity: 'Mengupdate rekam medis pasien.', status: 'Disetujui' },
  { id: '3', date: '2024-07-29', activity: 'Membantu dokter dalam tindakan operasi kecil.', status: 'Menunggu Validasi' },
  { id: '4', date: '2024-07-29', activity: 'Memberikan obat kepada pasien sesuai jadwal.', status: 'Menunggu Validasi' },
];

export const mockMonthlyPerformances: MonthlyPerformance[] = [
  { id: '1', month: 'Juni', year: 2024, realization: 'Menyelesaikan semua tugas bulanan dengan baik dan tepat waktu. Berhasil menangani 5 kasus darurat dengan sigap.', status: 'Disetujui' },
  { id: '2', month: 'Juli', year: 2024, realization: 'Mengikuti pelatihan manajemen pasien dan mulai menerapkan ilmu yang didapat.', status: 'Menunggu Validasi' },
];

export const mockAttendance: Attendance[] = [
    { id: '1', date: '2024-07-28', status: 'Hadir' },
    { id: '2', date: '2024-07-29', status: 'Hadir' },
    { id: '3', date: '2024-07-27', status: 'Sakit' },
];

export const mockValidationActivities: DailyActivity[] = [
    { id: '3', date: '2024-07-29', activity: 'Membantu dokter dalam tindakan operasi kecil.', status: 'Menunggu Validasi' },
    { id: '4', date: '2024-07-29', activity: 'Memberikan obat kepada pasien sesuai jadwal.', status: 'Menunggu Validasi' },
    { id: '5', date: '2024-07-30', activity: 'Membersihkan dan merapikan ruang perawatan.', status: 'Menunggu Validasi' },
];

export const mockValidationPerformances: MonthlyPerformance[] = [
    { id: '2', month: 'Juli', year: 2024, realization: 'Mengikuti pelatihan manajemen pasien dan mulai menerapkan ilmu yang didapat.', status: 'Menunggu Validasi' },
];
