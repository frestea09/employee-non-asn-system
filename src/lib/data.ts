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
  ni: string;
  name: string;
  email: string;
  unit: string;
  position: string;
  role: 'Karyawan' | 'Admin';
};

export type Unit = {
  id: string;
  name: string;
  description: string;
};

export type Position = {
  id: string;
  name: string;
  description: string;
};

export type SkpTarget = {
  id: string;
  userId: string;
  target: string;
  description: string;
  deadline: string;
  status: 'Rencana' | 'Realisasi' | 'Selesai';
};

export type WorkPlan = {
  id: string;
  unitId: string;
  program: string;
  activities: string;
  target: string;
  budget: number;
};

export type JobStandard = {
  id: string;
  positionId: string;
  standard: string;
  description: string;
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
  { id: '1', ni: 'K.21.08.001', name: 'Ahmad Budi', email: 'ahmad.budi@rumahsakit.com', unit: 'Unit Gawat Darurat (UGD)', position: 'Perawat Terampil', role: 'Karyawan' },
  { id: '2', ni: 'K.21.08.002', name: 'Siti Aminah', email: 'siti.aminah@rumahsakit.com', unit: 'Instalasi Rawat Inap', position: 'Bidan Pelaksana', role: 'Karyawan' },
  { id: '3', ni: 'A.20.01.001', name: 'Dr. Candra', email: 'candra.dr@rumahsakit.com', unit: 'Manajemen', position: 'Staf Administrasi', role: 'Admin' },
  { id: '4', ni: 'K.22.03.015', name: 'Dewi Lestari', email: 'dewi.lestari@rumahsakit.com', unit: 'Laboratorium', position: 'Analis Kesehatan', role: 'Karyawan' },
];

export const mockUnits: Unit[] = [
  { id: '1', name: 'Unit Gawat Darurat (UGD)', description: 'Memberikan pelayanan gawat darurat 24 jam.' },
  { id: '2', name: 'Instalasi Rawat Inap', description: 'Menyediakan pelayanan perawatan bagi pasien yang memerlukan observasi lanjutan.' },
  { id: '3', name: 'Laboratorium', description: 'Melakukan pemeriksaan penunjang diagnostik.' },
  { id: '4', name: 'Farmasi', description: 'Menyediakan dan mengelola obat-obatan untuk pasien.' },
  { id: '5', name: 'Manajemen', description: 'Mengelola operasional dan administrasi rumah sakit.' },
];

export const mockPositions: Position[] = [
  { id: '1', name: 'Perawat Terampil', description: 'Memberikan asuhan keperawatan dasar kepada pasien.' },
  { id: '2', name: 'Bidan Pelaksana', description: 'Memberikan asuhan kebidanan pada ibu hamil, bersalin, dan nifas.' },
  { id: '3', name: 'Analis Kesehatan', description: 'Melaksanakan pelayanan laboratorium kesehatan.' },
  { id: '4', name: 'Asisten Apoteker', description: 'Membantu Apoteker dalam pelayanan kefarmasian.' },
  { id: '5', name: 'Staf Administrasi', description: 'Melaksanakan tugas-tugas administrasi dan kearsipan.' },
];

export const mockSkpTargets: SkpTarget[] = [
    { id: '101', userId: '1', target: 'Meningkatkan Kecepatan Respon UGD', description: 'Mengurangi waktu tunggu pasien UGD dari 15 menit menjadi 10 menit.', deadline: '2024-12-31', status: 'Rencana' },
    { id: '102', userId: '1', target: 'Mengikuti Pelatihan Advanced Cardiac Life Support (ACLS)', description: 'Mendapatkan sertifikasi ACLS untuk meningkatkan kompetensi penanganan pasien jantung.', deadline: '2024-10-30', status: 'Rencana' },
    { id: '201', userId: '2', target: 'Meningkatkan Kualitas Asuhan Kebidanan', description: 'Menerapkan metode persalinan gentle birth pada minimal 5 pasien.', deadline: '2024-11-30', status: 'Rencana' },
];

export const mockWorkPlans: WorkPlan[] = [
  { id: 'wp1', unitId: '1', program: 'Peningkatan Kualitas Pelayanan UGD', activities: 'Pelatihan BLS/ALS untuk perawat, Pengadaan alat medis baru', target: 'Waktu respon < 5 menit', budget: 150000000 },
  { id: 'wp2', unitId: '1', program: 'Pencegahan Infeksi', activities: 'Sosialisasi cuci tangan, Audit kepatuhan APD', target: 'Angka infeksi nosokomial turun 15%', budget: 50000000 },
  { id: 'wp3', unitId: '2', program: 'Program Keselamatan Pasien', activities: 'Implementasi check list keselamatan pasien, Ronde keselamatan', target: 'Zero KTD (Kejadian Tidak Diharapkan)', budget: 75000000 },
];

export const mockJobStandards: JobStandard[] = [
    { id: 'js1', positionId: '1', standard: 'Waktu Respon Pasien Gawat Darurat', description: 'Waktu respon maksimal 5 menit setelah pasien tiba.' },
    { id: 'js2', positionId: '1', standard: 'Ketepatan Pemberian Obat', description: 'Zero error dalam pemberian obat sesuai resep dokter.' },
    { id: 'js3', positionId: '2', standard: 'Pendampingan Persalinan', description: 'Memberikan pendampingan penuh pada 100% proses persalinan normal.' },
];
