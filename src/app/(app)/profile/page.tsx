
'use client';

import { useState, useRef, FormEvent } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUsers, User } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Camera, Eye, EyeOff } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  const { toast } = useToast();
  // In a real app, this user would come from an auth context/provider
  const [user, setUser] = useState<User>(mockUsers[0]);
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  const handleProfileSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic to update profile info
    toast({
        title: "Profil Diperbarui",
        description: "Informasi profil Anda telah berhasil disimpan."
    });
  };
  
  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic to update password
    toast({
        title: "Kata Sandi Diperbarui",
        description: "Kata sandi Anda telah berhasil diubah."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profil Saya</CardTitle>
          <CardDescription>
            Kelola informasi profil dan kredensial Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 cursor-pointer" onClick={handleAvatarClick}>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Camera className="h-5 w-5" />
                </div>
              </div>
               <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              <div>
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-muted-foreground">{user.position}</p>
                <p className="text-sm text-muted-foreground">{user.unit}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" defaultValue={user.name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Alamat Email</Label>
                <Input id="email" type="email" defaultValue={user.email} required />
              </div>
               <div className="space-y-2">
                <Label htmlFor="ni">Nomor Induk</Label>
                <Input id="ni" defaultValue={user.ni} disabled />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Simpan Perubahan Profil</Button>
            </div>
          </form>

          <Separator className="my-8" />

           <form onSubmit={handlePasswordSubmit} className="space-y-6">
               <div>
                   <h3 className='text-lg font-medium'>Ubah Kata Sandi</h3>
                   <p className='text-sm text-muted-foreground'>Pastikan untuk menggunakan kata sandi yang kuat.</p>
               </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                     <div className="space-y-2">
                        <Label htmlFor="current-password">Kata Sandi Saat Ini</Label>
                         <div className="relative">
                            <Input
                            id="current-password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            />
                            <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground hover:bg-transparent"
                            onClick={() => setShowPassword((prev) => !prev)}
                            >
                            {showPassword ? <EyeOff /> : <Eye />}
                            </Button>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="new-password">Kata Sandi Baru</Label>
                        <Input id="new-password" type="password" required />
                     </div>
                </div>

                <div className="flex justify-end">
                    <Button type="submit">Ubah Kata Sandi</Button>
                </div>

           </form>

        </CardContent>
      </Card>
    </div>
  );
}
