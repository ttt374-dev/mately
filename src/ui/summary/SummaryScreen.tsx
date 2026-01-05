
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { AppLayout } from "@/shared/components/AppLayout/AppLayout"
import type { PlaySession } from '@/domain/session/types';
import { Box, List, ListItem, Button } from '@mui/material';
import type { AnswerResult } from '@/domain/learning/types';
import type { AnswerEntry } from '@/domain/session/types/AnswerEntry';

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

export default function SummaryScreen(){
    const location = useLocation();
    const { session } = location.state as { session: PlaySession };
    const summary = summaryResult(session.results)
    const navigate = useNavigate()
    return (
        <AppLayout
            header={"Summary"}
            footer={                
                <Button fullWidth variant="outlined" onClick={()=> navigate("/deck")}>
                    デッキに戻る
                </Button>
            }
        >
            <>
                おつかれさまでした。

                <Box>
                    <List>
                        <ListItem>
                            正解： { summary.solved}
                        </ListItem>
                        <ListItem>
                            不正解： { summary.failed}
                        </ListItem>
                        <ListItem>
                            正解率： { summary.accuracy * 100} %
                        </ListItem>
                    </List>
                </Box>

            </>
        </AppLayout>
    )
}