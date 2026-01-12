import { useEffect, useReducer, useRef } from "react";

import type { LearningRepository } from "@/domain/learning/LearningRepository";
import type { Problem, ProblemId } from "@/domain/problem/Problem";
import type { ProblemRepository } from "@/domain/problem/problemRepository";
import { exerciseReducer } from "@/domain/Exercise/exerciseReducer";
import { LearningEntry, type AnswerResult, type LearningRecord } from "@/domain/learning/types";
import  { Exercise } from "@/domain/Exercise/Exercise";

export function useExerciseStore(
    problemRepo: ProblemRepository,
    learningRepo: LearningRepository
) {
    const [state, dispatch] = useReducer(exerciseReducer, [] as Exercise[]);

    const isInitialized = useRef(false);

    // 初期ロード
    useEffect(() => {
        reload().catch(() => reset())
    }, []);

    // 永続化
    useEffect(() => {
        if (!isInitialized.current) {
            isInitialized.current = true;
            return;
        }
        const problems: Problem[] = Object.values(state).map(pwl => pwl.problem);
        const learnings: LearningRecord = Object.fromEntries(
            Object.values(state).map(pwl => [pwl.problem.id, pwl.learning])
        );

        problemRepo.save(problems);
        learningRepo.save(learnings);
    }, [state]);

    // Action helpers
    const reload = async () => {
        const problems = await problemRepo.load();
        const learnings = await learningRepo.load();

        const exercise: Exercise[] = problems.map(p => ({
            problem: p,
            learning: learnings[p.id] ?? LearningEntry.create(p.id),
        }));
        dispatch({ type: 'SET_ALL', payload: exercise });
    }
    const reset = async () => {
        dispatch({ type: 'CLEAR_ALL' });
    }
    const update = async (problemId: string, updater: (p: Exercise) => Exercise) => {
        // updater は Problem インスタンスのメソッドを呼ぶ形にする
        dispatch({ type: "UPDATE", payload: { id: problemId, updater } });

        const next = state.map(e => {
            if (e.problem.id === problemId) {
                updater(e); // Problem クラスのメソッドで更新
            }
            return e;
        });
    };

    const remove = async (problemId: string) => dispatch({ type: 'REMOVE', problemId });
    const removeMany = async (ids: string[]) => {
        if (!ids || ids.length === 0) return;
        dispatch({ type: "REMOVE_MANY", problemIds: ids });
    };


    const clearAll = async () => dispatch({ type: 'CLEAR_ALL' });
    const addProblem = async (newProblem: Problem) => {
        const exercise = Exercise.create(newProblem)
        dispatch({ type: "ADD", payload: exercise });        
    };
    const markAnswer = async (problemId: string, answerResult: AnswerResult, secondsToAnswer?: number) =>
        dispatch({ type: 'ANSWER', problemId, answerResult, secondsToAnswer, now: Date.now() });

    const markSolved = async (problemId: ProblemId, secondsToAnswer?: number) => 
        markAnswer(problemId, "solved", secondsToAnswer)
    const markFailed = async (problemId: ProblemId, secondsToAnswer?: number) => 
        markAnswer(problemId, "failed", secondsToAnswer)
    
    const toggleStar = async (problemId: string) => {                
        update(problemId, e => {            
            return new Exercise(e.problem.toggleStar(), e.learning)
        })
        //dispatch({ type: 'UPDATE', problemId });
    }
    const updateTitle = async (problemId: ProblemId, title: string) => {
        update(problemId, e => {            
            return new Exercise(e.problem.setTitle(title), e.learning)
        })
    }
    

    return {
        exercises: state,        
        reload,
        remove, removeMany,
        clearAll,

        addProblem,
        updateTitle, toggleStar,
        
        markAnswer, markSolved, markFailed
    };
}
