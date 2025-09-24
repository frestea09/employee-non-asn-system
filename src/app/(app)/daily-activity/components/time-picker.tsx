'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface TimePickerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TimePicker({ className, ...props }: TimePickerProps) {
  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, '0')
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, '0')
  );

  return (
    <div className={cn('grid grid-cols-2 gap-2', className)} {...props}>
      <Select defaultValue="08">
        <SelectTrigger className="h-12 text-base">
          <SelectValue placeholder="Jam" />
        </SelectTrigger>
        <SelectContent>
          {hours.map((hour) => (
            <SelectItem key={hour} value={hour}>
              {hour}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select defaultValue="00">
        <SelectTrigger className="h-12 text-base">
          <SelectValue placeholder="Menit" />
        </SelectTrigger>
        <SelectContent>
          {minutes.map((minute) => (
            <SelectItem key={minute} value={minute}>
              {minute}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
