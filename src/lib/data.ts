export type DailyActivity = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  actionPlan: string;
  activity: string;
  notes?: string;
  quantity: number;
  unit: string;
  proofUrl?: string;
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

export type User = {
  id: string;
  name: string;
  email: string;
  unit: string;
  position: string;
  role: 'Karyawan' | 'Admin';
};

export const mockDailyActivities: DailyActivity[] = [
  { id: '1', date: '2024-07-28', startTime: '08:00', endTime: '09:00', actionPlan: 'Melakukan pemeriksaan pasien', activity: 'Melakukan pemeriksaan rutin pada 5 pasien di bangsal A.', quantity: 5, unit: 'Pasien', status: 'Disetujui' },
  { id: '2', date: '2024-07-28', startTime: '09:00', endTime: '10:30', actionPlan: 'Mengelola rekam medis', activity: 'Mengupdate 10 rekam medis pasien.', quantity: 10, unit: 'Laporan', status: 'Disetujui' },
  { id: '3', date: '2024-07-29', startTime: '10:00', endTime: '12:00', actionPlan: 'Asistensi tindakan medis', activity: 'Membantu dokter dalam tindakan operasi kecil.', quantity: 1, unit: 'Tindakan', status: 'Menunggu Validasi' },
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

export const mockValidationActivities: Omit<DailyActivity, 'startTime' | 'endTime' | 'actionPlan' | 'notes' | 'quantity' | 'unit' | 'proofUrl'>[] = [
    { id: '3', date: '2024-07-29', activity: 'Membantu dokter dalam tindakan operasi kecil.', status: 'Menunggu Validasi' },
    { id: '4', date: '2024-07-29', activity: 'Memberikan obat kepada pasien sesuai jadwal.', status: 'Menunggu Validasi' },
    { id: '5', date: '2024-07-30', activity: 'Membersihkan dan merapikan ruang perawatan.', status: 'Menunggu Validasi' },
    { id: '6', date: '2024-07-30', activity: 'Menyiapkan peralatan medis untuk esok hari.', status: 'Menunggu Validasi' },
    { id: '7', date: '2024-07-31', activity: 'Edukasi pasien mengenai pola hidup sehat.', status: 'Menunggu Validasi' },
];

export const mockValidationPerformances: MonthlyPerformance[] = [
    { id: '2', month: 'Juli', year: 2024, realization: 'Mengikuti pelatihan manajemen pasien dan mulai menerapkan ilmu yang didapat.', status: 'Menunggu Validasi' },
    { id: '3', month: 'Agustus', year: 2024, realization: 'Meningkatkan efisiensi kerja tim sebesar 10% melalui sistem baru.', status: 'Menunggu Validasi' },
];

export const mockUsers: User[] = [
  { id: '1', name: 'Ahmad Budi', email: 'ahmad.budi@rumahsakit.com', unit: 'Unit Gawat Darurat', position: 'Perawat', role: 'Karyawan' },
  { id: '2', name: 'Siti Aminah', email: 'siti.aminah@rumahsakit.com', unit: 'Instalasi Rawat Inap', position: 'Bidan', role: 'Karyawan' },
  { id: '3', name: 'Dr. Candra', email: 'candra.dr@rumahsakit.com', unit: 'Manajemen', position: 'Kepala Bagian SDM', role: 'Admin' },
  { id: '4', name: 'Dewi Lestari', email: 'dewi.lestari@rumahsakit.com', unit: 'Laboratorium', position: 'Analis Kesehatan', role: 'Karyawan' },
];
