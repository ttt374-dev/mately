
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { AppLayout } from "@/ui/common/AppLayout"
import type { FsmState} from '@/domain/fsm/types';
import { Stack, Box, List, ListItem, Button } from '@mui/material';
import type { AnswerResult } from '@/domain/learning/types';
import type { AnswerEntry } from '@/domain/fsm/types/AnswerEntry';

const summaryResult = (results: AnswerEntry[]) => {
    const values = results
    const solved = values.filter(v => v.answerResult === "solved").length;
    const failed = values.filter(v => v.answerResult === "failed").length;

    return {
        totalAnswered: values.length,
        solved,
        failed,

        accuracy: values.length ? solved / values.length
            //? Math.round((solved / values.length) * 100 / 100)
            : 0,
    };
}

function SummaryRow({
    label,
    value,
    highlight = false,
}: {
    label: string
    value: React.ReactNode
    highlight?: boolean
}) {
    return (
        <Stack direction="row" justifyContent="space-between">
            <Box>{label}</Box>
            <Box
                sx={{
                    fontWeight: highlight ? "bold" : "normal",
                    fontSize: highlight ? 18 : 14,
                }}
            >
                {value}
            </Box>
        </Stack>
    )
}


export default function SummaryScreen() {
    const location = useLocation();
    const navigate = useNavigate()
    //const locationState = location.state as { session?: PlaySession } | null;
    const locationState = location.state as { fsmState?: FsmState } | null;
    const fsmState = locationState?.fsmState;

    useEffect(() => {
        if (!fsmState) {
            navigate("/deck");
        }
    }, [fsmState, navigate]);

    if (!fsmState) return null; // セーフティレンダリング
    //const { session } = location.state as { session: PlaySession };
    const summary = summaryResult(fsmState.results)

    return (
        <AppLayout
            header={"Summary"}
            footer={
                <Button fullWidth sx={{py: 2}} variant="outlined" onClick={() => navigate("/deck")}>
                    デッキに戻る
                </Button>
            }
        >
            <Stack spacing={3}>
                <Box>
                    おつかれさまでした。
                </Box>

                {/* 結果カード */}
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 2,
                        
                        p: 2,
                    }}
                >
                    <Stack spacing={2}>
                        <SummaryRow label="正解" value={summary.solved} />
                        <SummaryRow label="不正解" value={summary.failed} />
                        <SummaryRow label="正解率" value={`${Math.round(summary.accuracy * 100)} %`} />
                    </Stack>
                </Box>

            </Stack>
        
        </AppLayout >
    )
}