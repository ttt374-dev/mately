import type { Problem } from '../types/Problem';
import { v4 } from 'uuid'
import { parseKif } from '@/domain/kif/parser';
import { createKifContent } from '@/domain/kif/factory';

export function splitFilename(filename: string): { basename: string, ext: string } {
    let basename = filename;
    let ext = "";
    const dotIndex = filename.lastIndexOf(".");
    if (dotIndex >= 0) {
        basename = filename.slice(0, dotIndex);
        ext = filename.slice(dotIndex);
    }
    return { basename, ext }
}

export function validateTitle(title: string, entries: Problem[]): boolean {
    const existingTitles = new Set(entries.map(e => e.title));
    return existingTitles.has(title)
}

export function resolveUniqTitle(filename: string, existingEntries: Problem[]): string {
    // ファイル名と拡張子を分離
    const { basename, ext } = splitFilename(filename)
    const title = basename + ext

    let newTitle = basename + ext;
    let counter = 1;
    const existingTitles = new Set([...existingEntries].map(e => e.title));
    while (existingTitles.has(title)) {
        newTitle = `${basename}(${counter})${ext}`;
        counter++;
    }    
    return newTitle
}
export function createProblemFromText(text: string, title?: string): Problem | null {
    const kifContentResult = parseKif(text);
    if (kifContentResult.ok === false) return null
    return createProblem({
        title: title,
        kifContent: kifContentResult.value,
    }
    )
}

export function createProblem( partial?: Partial<Problem>): Problem {
  return {
    id: v4(),
    title: 'untitled',
    kifContent: createKifContent(),
    createdAt: Date.now(),
    ...partial,
  };
}
