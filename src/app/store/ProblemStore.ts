// UI hook

import { useState, useEffect } from 'react';

import type { Problem} from'@/domain/problem/types/Problem'
import type { ProblemRecord } from '@/domain/problemCatalog/types/ProblemRecord'
import type { ProblemRepository } from '@/domain/problem/problemRepository';
import { createProblem } from '@/domain/problem/factory';

export function createProblemStore (repository: ProblemRepository){
    const [problems, setProblems] = useState<Problem[]>([])

    useEffect(() => {
        reload().catch(() => setProblems([]))
    }, []);

    const reload = async () => {
        try {
            const data = await repository.load()
            setProblems(data)
            console.log("problems reload", data)
        } catch {
            setProblems([])
        }
    }

    
    const addProblem = (newProblem: Problem) => {
        console.log("add problem", newProblem)
        setProblems(prev => {
            const updated = { ...prev, [newProblem.id]: newProblem };
            repository.save(updated);  // ← prev ではなく updated を保存
            return updated;
        });
    }
    const replaceAll = async (newProblems: Problem[]) => {
        setProblems(newProblems)
        await repository.save(newProblems)
    }


    const update = (problemId: string, updater: (p: Problem) => Problem) => {
        setProblems(prev => {
            // 該当問題を探す
            const index = prev.findIndex(p => p.id === problemId);

            let next: Problem[];
            if (index >= 0) {
                // 既存があれば更新
                next = prev.map((p, i) => (i === index ? updater(p) : p));
            } else {
                // 新規作成
                next = [...prev, updater(createProblem())];
            }
            // 永続化
            repository.save(next);
            return next;
        });
    };


    const toggleStar = (problemId: string) =>{
        //console.log("toggleStar in hook", )
        update(problemId, r => ({
            ...r,
            starred: !(r?.starred ?? false),
        }))
    }

    const removeMany = (ids: string[]) => {
        if (!ids || ids.length === 0) return;

        setProblems(prev => {
            // 指定された id を除外
            const next = prev.filter(p => !ids.includes(p.id));

            // 永続化
            repository.save(next);

            return next;
        });
    };

    const removeAll = () => {
        setProblems([])
        repository.save([])
    }

    return {
        problems,        
        reload,        
        //getAll: records,
        replaceAll,
        //setRecords,
        addProblem, 
        removeAll,
        removeMany,
        toggleStar,

        //repository,
    }
}