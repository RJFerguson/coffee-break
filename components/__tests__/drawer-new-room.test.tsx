// DrawerDialogNewRoom.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { DrawerDialogNewRoom } from '../drawer-new-room';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock toast
vi.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

// Partially mock generateRandomSequence and keep other exports intact
vi.mock('@/lib/utils', async () => {
  const originalModule = await vi.importActual<typeof import('@/lib/utils')>('@/lib/utils');
  return {
    ...originalModule,
    generateRandomSequence: () => '1234',
  };
});

describe('DrawerDialogNewRoom', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<DrawerDialogNewRoom title="hi" subtitle="hello" />);
  });

  it('renders the correct title and subtitle', () => {
    render(<DrawerDialogNewRoom title="Test Title" subtitle="Test Subtitle" />);
    const titleElement = screen.getByText('Test Title');
    const subtitleElement = screen.getByText('Test Subtitle');
    expect(titleElement).not.toBeNull();
    expect(subtitleElement).not.toBeNull();
  });

  it('renders multiple instances correctly', () => {
    render(
      <>
        <DrawerDialogNewRoom title="Title 1" subtitle="Subtitle 1" />
        <DrawerDialogNewRoom title="Title 2" subtitle="Subtitle 2" />
      </>
    );
    const title1 = screen.getByText('Title 1');
    const subtitle1 = screen.getByText('Subtitle 1');
    const title2 = screen.getByText('Title 2');
    const subtitle2 = screen.getByText('Subtitle 2');

    expect(title1).not.toBeNull();
    expect(subtitle1).not.toBeNull();
    expect(title2).not.toBeNull();
    expect(subtitle2).not.toBeNull();
  });
});
