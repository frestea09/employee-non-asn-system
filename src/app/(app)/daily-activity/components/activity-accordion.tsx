'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ClipboardList, Briefcase, Target, PlusCircle } from 'lucide-react';
import type { UserActionPlans } from '../page';
import { LogActivityDialog } from './log-activity-dialog';
import type { DailyActivity } from '@/lib/data';

type ActivityAccordionProps = {
  actionPlans: UserActionPlans;
  onLogActivity: (activity: Omit<DailyActivity, 'id' | 'status'>) => void;
};

export function ActivityAccordion({ actionPlans, onLogActivity }: ActivityAccordionProps) {
  const { skpTargets, unitPlans, jobStandards } = actionPlans;
  
  return (
    <Accordion type="multiple" defaultValue={['skp', 'unit', 'job']} className="w-full">
      <AccordionItem value="skp">
        <AccordionTrigger className="text-lg font-semibold">
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-primary" />
            Target Kinerja Pribadi (SKP)
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 pt-2">
            {skpTargets.length > 0 ? (
                skpTargets.map((target) => (
                <div
                    key={target.id}
                    className="flex items-center justify-between rounded-md border p-3"
                >
                    <div>
                    <p className="font-medium">{target.target}</p>
                    <p className="text-sm text-muted-foreground">{target.description}</p>
                    </div>
                     <LogActivityDialog 
                        actionPlan={target.target}
                        category="SKP"
                        onSave={onLogActivity}
                     >
                        <Button variant="outline" size="sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Catat Aktivitas
                        </Button>
                     </LogActivityDialog>
                </div>
                ))
            ) : (
                <p className="py-4 text-center text-sm text-muted-foreground">
                    Tidak ada target SKP yang ditetapkan untuk Anda.
                </p>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="unit">
        <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-3">
                <Briefcase className="h-6 w-6 text-primary" />
                Rencana Kerja Unit
            </div>
        </AccordionTrigger>
        <AccordionContent>
            <div className="space-y-2 pt-2">
                {unitPlans.length > 0 ? (
                    unitPlans.map((plan) => (
                    <div
                        key={plan.id}
                        className="flex items-center justify-between rounded-md border p-3"
                    >
                        <div>
                        <p className="font-medium">{plan.program}</p>
                        <p className="text-sm text-muted-foreground">{plan.activities}</p>
                        </div>
                        <LogActivityDialog 
                            actionPlan={plan.program}
                            category="Unit"
                            onSave={onLogActivity}
                        >
                            <Button variant="outline" size="sm">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Catat Aktivitas
                            </Button>
                        </LogActivityDialog>
                    </div>
                    ))
                ) : (
                    <p className="py-4 text-center text-sm text-muted-foreground">
                        Tidak ada rencana kerja yang ditetapkan untuk unit Anda.
                    </p>
                )}
            </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="job">
        <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-3">
                <ClipboardList className="h-6 w-6 text-primary" />
                Standar Kinerja Jabatan
            </div>
        </AccordionTrigger>
        <AccordionContent>
            <div className="space-y-2 pt-2">
                {jobStandards.length > 0 ? (
                    jobStandards.map((standard) => (
                    <div
                        key={standard.id}
                        className="flex items-center justify-between rounded-md border p-3"
                    >
                        <div>
                        <p className="font-medium">{standard.standard}</p>
                        <p className="text-sm text-muted-foreground">{standard.description}</p>
                        </div>
                        <LogActivityDialog
                            actionPlan={standard.standard}
                            category="Jabatan"
                            onSave={onLogActivity}
                        >
                            <Button variant="outline" size="sm">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Catat Aktivitas
                            </Button>
                        </LogActivityDialog>
                    </div>
                    ))
                ) : (
                    <p className="py-4 text-center text-sm text-muted-foreground">
                        Tidak ada standar kinerja yang ditetapkan untuk jabatan Anda.
                    </p>
                )}
            </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
