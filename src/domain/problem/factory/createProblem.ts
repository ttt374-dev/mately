import type { Problem } from '../types/Problem';
import { v4 } from 'uuid'
import { createKifContent } from '@/domain/kif/factory';

export function createProblem( partial?: Partial<Problem>): Problem {
  return {
    id: v4(),
    title: 'untitled',
    kifContent: createKifContent(),
    createdAt: Date.now(),
    ...partial,
  };
}
