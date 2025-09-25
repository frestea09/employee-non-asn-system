'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockUsers, type User } from '@/lib/data';
import { MoreHorizontal, PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { UserFormDialog } from './components/user-form-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const { toast } = useToast();

  const handleAddUser = (newUser: Omit<User, 'id'>) => {
    const userToAdd: User = {
      ...newUser,
      id: (Math.random() * 10000).toString(),
    };
    setUsers((prev) => [userToAdd, ...prev]);
    toast({
      title: 'Pengguna Ditambahkan',
      description: `Pengguna "${userToAdd.name}" telah berhasil ditambahkan.`,
      className: 'bg-green-500 text-white',
    });
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    toast({
      title: 'Pengguna Diperbarui',
      description: `Data untuk "${updatedUser.name}" telah berhasil diperbarui.`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(user => user.id === userId);
    setUsers((prev) => prev.filter((user) => user.id !== userId));
     toast({
      title: 'Pengguna Dihapus',
      description: `Pengguna "${userToDelete?.name}" telah berhasil dihapus.`,
      variant: 'destructive',
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Manajemen Pengguna</CardTitle>
            <CardDescription>
              Kelola data pengguna, peran, dan unit kerja untuk karyawan non-ASN.
            </CardDescription>
          </div>
          <UserFormDialog onSave={handleAddUser} triggerButton={
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah Pengguna
            </Button>
          } />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Unit Kerja</TableHead>
              <TableHead>Jabatan</TableHead>
              <TableHead>Peran</TableHead>
              <TableHead className="text-right">Tindakan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.unit}</TableCell>
                <TableCell>{user.position}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.role === 'Admin' ? 'destructive' : 'secondary'}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <AlertDialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Buka menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <UserFormDialog
                          user={user}
                          onSave={(updatedUser) => handleUpdateUser(updatedUser as User)}
                          triggerButton={
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                          }
                        />
                        <DropdownMenuSeparator />
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Hapus</span>
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Anda yakin ingin menghapus pengguna ini?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Tindakan ini tidak dapat dibatalkan. Pengguna
                          bernama <span className='font-semibold'>{user.name}</span> akan dihapus secara permanen.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Ya, Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
