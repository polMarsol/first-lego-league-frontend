'use client';

import { Label } from '@/app/components/label';
import type { UseFormRegisterReturn } from 'react-hook-form';

export type Option = { label: string; value: string };

export const selectClassName =
    'border-input h-11 w-full border bg-card px-4 py-2 text-base outline-none ' +
    'focus-visible:border-ring focus-visible:ring-ring/35 focus-visible:ring-[3px] ' +
    'aria-invalid:border-destructive md:text-sm disabled:pointer-events-none disabled:opacity-50';

interface OptionSelectProps {
    id: string;
    label: string;
    options: Option[];
    registration: UseFormRegisterReturn;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
}

export function OptionSelect({ id, label, options, registration, error, disabled, placeholder }: OptionSelectProps) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <select id={id} className={selectClassName} disabled={disabled} {...registration}>
                <option value="">{placeholder ?? 'Select...'}</option>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}
