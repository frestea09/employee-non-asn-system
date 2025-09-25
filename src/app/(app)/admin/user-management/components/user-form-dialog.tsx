'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockUnits, type User } from '@/lib/data';
import { useState, type FormEvent, useEffect, cloneElement } from 'react';

type UserFormDialogProps = {
  user?: User;
  onSave: (user: User | Omit<User, 'id'>) => void;
  triggerButton: React.ReactElement;
};

export function UserFormDialog({ user, onSave, triggerButton }: UserFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    unit: '',
    position: '',
    role: 'Karyawan' as 'Karyawan' | 'Admin',
  });

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        name: user.name,
        email: user.email,
        unit: user.unit,
        position: user.position,
        role: user.role,
      });
    } else if (!user && isOpen) {
        // Reset form for new user
        setFormData({
            name: '',
            email: '',
            unit: '',
            position: '',
            role: 'Karyawan',
        });
    }
  }, [user, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      onSave({ ...user, ...formData });
    } else {
      onSave(formData);
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {cloneElement(triggerButton, { onClick: () => setIsOpen(true) })}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{user ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Alamat Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
           <div className="space-y-2">
            <Label htmlFor="unit">Unit Kerja</Label>
            <Select name="unit" value={formData.unit} onValueChange={(value) => handleSelectChange('unit', value)} required>
              <SelectTrigger id="unit">
                <SelectValue placeholder="Pilih unit kerja" />
              </SelectTrigger>
              <SelectContent>
                {mockUnits.map(unit => <SelectItem key={unit.id} value={unit.name}>{unit.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Jabatan</Label>
            <Input id="position" name="position" value={formData.position} onChange={handleChange} required placeholder="Contoh: Perawat, Bidan, Analis" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Peran Sistem</Label>
            <Select name="role" value={formData.role} onValueChange={(value) => handleSelectChange('role', value)} required>
              <SelectTrigger id="role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Karyawan">Karyawan</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Batal
              </Button>
            </DialogClose>
            <Button type="submit">Simpan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
