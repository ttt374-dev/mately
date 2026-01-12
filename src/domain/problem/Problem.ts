import { createKifContent } from "@/domain/kif/factory";
import { parseKif } from "@/domain/kif/parser";
import type { KifContent } from "@/domain/kif/types";
import { v4 } from "uuid";

export type ProblemInit = {
    id?: string
    title?: string
    createdAt?: number
    kifContent?: KifContent
    starred?: boolean
}

export type ProblemId = string

export class Problem {
    constructor(
        readonly id: ProblemId,
        readonly title: string,
        readonly createdAt: number,
        readonly kifContent: KifContent,
        readonly starred: boolean,
    ) { }
    static create(partial?: ProblemInit): Problem {
        const now = Date.now()
        return new Problem(
            partial?.id ?? v4(),
            partial?.title ?? "untitled",
            partial?.createdAt ?? now, 
            partial?.kifContent ?? createKifContent(), 
            partial?.starred ?? false)
    }

    static createFromText(text: string, title: string = "untitled"): Problem | null {
        const now = Date.now()
        const kifContentResult = parseKif(text);
        if (kifContentResult.ok === false) return null
        return this.create({kifContent: kifContentResult.value, title: title})
        //return new Problem(v4(), title, now,  kifContentResult.value, false)        
    }
    setTitle(title: string){
        return Problem.create({...this, title: title})
    }

    toggleStar() {
        return Problem.create({...this, starred: !this.starred})
    }

}

// domain/problem.ts
export type ProblemType = {
    id: string;
    title: string;
    createdAt: number;
    kifContent: KifContent,
    starred: boolean,
};

//export type ProblemEntry = Problem


