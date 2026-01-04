import { useNavigate, useLocation } from 'react-router-dom';
import { Stack, Box, Button } from '@mui/material';

import { AppLayout } from "@/shared/components/AppLayout/AppLayout"
import type { Problem } from '@/domain/problem/types/Problem';
import type { ProblemRecord } from '@/domain/problemCatalog/types/ProblemRecord'
import { useProblemRecordsContext } from '@/app/providers/ProblemCollectionProvider';
import { usePlaySessionContext } from '@/app/providers/PlaySessionProvider';
import type { AnswerResult } from '@/domain/learning/types';
import type { PlaySession } from '@/domain/session/types';
import type { PlayerMode } from './types/PlayerMode';
import { useLearningRecordsContext } from '@/app/providers/LearningRecordsProvider';
import { usePlayerPhase } from './hooks/usePlayerPhase';
import { useEffect } from 'react';
import { useReplayBoard } from './hooks/useReplayBoard';
import BoardView from './components/BoardView';
import MovesView from './components/MoveView';
import { createProblem } from '@/domain/problem/factory/createProblem';

function getCurrentProblem(session: PlaySession | null, records: ProblemRecord): Problem | null {
    const currentProblemId = session && session.queue[session.currentIndex]?.problemId
    return currentProblemId ? records[currentProblemId] ?? null : null;        
}

function getPlayerMode(): PlayerMode {
    const location = useLocation();
    const state = location.state as { mode?: PlayerMode } | undefined;
    return state?.mode ?? "problem"
}

function AnswerButtons({onAnswer}: {
    onAnswer: (answer: AnswerResult) => void
}){
    return (<>
        <Button onClick={() => onAnswer("solved")}>
            正解
        </Button>
        <Button onClick={() => onAnswer("failed")}>
            不正解
        </Button>
    </>)
}
export default function PlayerScreen(){    
        //const { collection } = useProblemCollectionContext()
    const { session, advance, isFinished, answerCurrent } = usePlaySessionContext()
    //console.log("session info", session)   
    const { records } = useProblemRecordsContext()
    const currentProblem = getCurrentProblem(session, records) ?? createProblem()
    const navigate = useNavigate()
        ///////////
        
    // 最後のインデックスだったらサマリーに遷移
    useEffect(() => {
        console.log("effect", session?.currentIndex, isFinished)
        if (!session) return;
        if (!isFinished) return;

        navigate("/summary", { state: { session } });
    }, [session?.results]);
    
    useEffect(() => {
        resetPhase()
    }, [records, session])
/*
    // セッションがなければここで返す
    if (session === null || currentProblem == null){
        return (
            <div>
                セッションがありません
                <Button onClick={() => navigate("/deck")}>
                    デッキに戻る
                </Button>

            </div>)
    }
            
*/
    /////////////////////////////////////////    
    const { currentPhase, advancePhase, resetPhase } = usePlayerPhase()
    const moves = currentProblem.kifContent.events.filter(event => event.type ==="move")
    const { board, hands, advancePly, retreatPly, 
        currentPlyIndex, setCurrentPlyIndex } = useReplayBoard(
        currentProblem.kifContent.board, currentProblem.kifContent.hands, moves        
    )

    //console.log("player session", session)
    //const learningRepository = createLearningRepository()
    const { learningRecords, markAnswer } = useLearningRecordsContext()
    
    // 学習情報
    const learningEntry = learningRecords[currentProblem.id] || {}
    // モード    
    const mode = getPlayerMode()

    // ハンドラー
    const handleAnswer = (answer: AnswerResult) => { 
        if (currentProblem){                                   
            markAnswer(currentProblem.id, answer)
            answerCurrent(answer)
            console.log("handle solved", session?.results)
        }   
        //if (!isFinished){            
            advance()
        //}                  
    }    

    return (
        <AppLayout
            header={ `${session?.currentIndex}: ${currentProblem.title} -  ${currentProblem.id}`}
            footer={
                <>
                    {mode === "problem" && <>
                        { currentPhase === "problem" ?
                            (<>
                               <Button onClick={advancePhase}>
                                    手筋を見る
                                </Button> 
                            </>) : 
                            (
                                <AnswerButtons onAnswer={handleAnswer}/>
                            )
                        }                        
                        
                    </>
                    }
                    {mode === "review" && <>
                        <button onClick={() => navigate("/library")}>
                            ライブラリに戻る
                        </button>
                    </>
                    }
                </>}>

            <>

                <Box sx={{justifyContent: "center"}}>
                    <BoardView board={board} hands={hands}/>
                </Box>
                

                <Box sx={{ minHeight: 0, display: "flex", flexDirection: "row" }}>
                    { /* 手順リスト */}
                    <Box
                        border={1}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            overflowY: "auto",
                            gap: 2, flex: 7,
                        }}>
                        {currentPhase === "problem" &&
                            <>
                                {moves.length}手詰め
                            </>
                        }
                        {currentPhase === "solution" &&
                            <MovesView
                                moves={moves}
                                currentPlyIndex={currentPlyIndex}
                                onMoveClick={(i) => setCurrentPlyIndex(i)} />
                        }
                    </Box>

                    { /* コントロール */}
                    <Stack border={1} sx={{ width: 150 }} gap={2} p={2}>
                        <Box>
                            { learningEntry.solvedCount} / 
                            { learningEntry.solvedCount + learningEntry.failedCount}
                        </Box>
                        
                        {currentPhase === "solution" && <>
                            <button onClick={retreatPly}>
                                ↑前の手
                            </button>
                            <button onClick={advancePly}>
                                ↓次の手
                            </button>
                        </>}


                        <button onClick={() =>
                            navigate("/deck")
                        }>
                            デッキに戻る
                        </button>
                        <Box>
                            session: {session && `${session.currentIndex + 1} / ${session.queue.length}`}
                        </Box>

                    </Stack>
                </Box>

            </>
        </AppLayout>
    )
}