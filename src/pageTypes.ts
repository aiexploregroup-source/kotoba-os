import type { Page } from './types';

export interface PageProps {
  notify: (message: string) => void;
  navigate: (page: Page) => void;
}
