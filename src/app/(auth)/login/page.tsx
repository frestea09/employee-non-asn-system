'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // For demo purposes, directly navigate to the dashboard
    router.push('/dashboard');
  };

  return (
    <Card className="w-full max-w-sm shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Briefcase className="h-8 w-8" />
        </div>
        <CardTitle className="text-2xl tracking-tighter">e-Kinerja</CardTitle>
        <CardDescription>
          Masuk untuk mengelola aktivitas kerja Anda.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Alamat Email</Label>
          <Input id="email" type="email" placeholder="nama@email.com" defaultValue="karyawan@email.com" required className="h-12 text-base" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Kata Sandi</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              defaultValue="password123"
              required
              className="h-12 pr-10 text-base"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground hover:bg-transparent"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
              <span className="sr-only">
                {showPassword ? 'Sembunyikan' : 'Tampilkan'} kata sandi
              </span>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="h-12 w-full text-lg" onClick={handleLogin}>
          Masuk
        </Button>
      </CardFooter>
    </Card>
  );
}
