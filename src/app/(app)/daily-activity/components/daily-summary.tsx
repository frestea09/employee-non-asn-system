'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Archive, ClipboardCheck, Target } from "lucide-react";

type DailySummaryProps = {
    data: {
        skp: number;
        unit: number;
        jabatan: number;
    }
}

export function DailySummary({ data }: DailySummaryProps) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Target SKP</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{data.skp}</div>
                    <p className="text-xs text-muted-foreground">Aktivitas tercatat hari ini</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Rencana Unit</CardTitle>
                    <Archive className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{data.unit}</div>
                     <p className="text-xs text-muted-foreground">Aktivitas tercatat hari ini</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Kinerja Jabatan</CardTitle>
                    <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{data.jabatan}</div>
                     <p className="text-xs text-muted-foreground">Aktivitas tercatat hari ini</p>
                </CardContent>
            </Card>
        </div>
    )
}
