
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
import { mockPositions, mockUnits, type User } from '@/lib/data';
import { useState, type FormEvent, useEffect, cloneElement, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';

type UserFormDialogProps = {
  user?: User;
  onSave: (user: Omit<User, 'id' | 'unitId' | 'positionId'>) => void;
  triggerButton: React.ReactElement;
};

export function UserFormDialog({ user, onSave, triggerButton }: UserFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    ni: '',
    email: '',
    unit: '',
    position: '',
    role: 'Karyawan' as 'Karyawan' | 'Admin',
    avatar: '',
  });

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        name: user.name,
        ni: user.ni,
        email: user.email,
        unit: user.unit,
        position: user.position,
        role: user.role,
        avatar: user.avatar || '',
      });
    } else if (!user && isOpen) {
        // Reset form for new user
        setFormData({
            name: '',
            ni: '',
            email: '',
            unit: '',
            position: '',
            role: 'Karyawan',
            avatar: '',
        });
    }
  }, [user, isOpen]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };


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
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

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
          <div className="flex flex-col items-center gap-4">
             <div className="relative">
                <Avatar className="h-24 w-24 cursor-pointer" onClick={handleAvatarClick}>
                    <AvatarImage src={formData.avatar} alt={formData.name} />
                    <AvatarFallback>{getInitials(formData.name) || '??'}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Camera className="h-4 w-4" />
                </div>
             </div>
             <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
             <Button type="button" variant="outline" size="sm" onClick={handleAvatarClick}>Ubah Foto Profil</Button>
          </div>
        
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ni">Nomor Induk Karyawan Non-ASN</Label>
            <Input id="ni" name="ni" value={formData.ni} onChange={handleChange} required />
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
             <Select name="position" value={formData.position} onValueChange={(value) => handleSelectChange('position', value)} required>
              <SelectTrigger id="position">
                <SelectValue placeholder="Pilih jabatan" />
              </SelectTrigger>
              <SelectContent>
                {mockPositions.map(pos => <SelectItem key={pos.id} value={pos.name}>{pos.name}</SelectItem>)}
              </SelectContent>
            </Select>
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
