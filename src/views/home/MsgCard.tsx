import { cibDependabot, cilUser } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { Box, Card, CardContent, IconButton, Stack } from "@mui/material"
import Markdown from "react-markdown"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useState } from "react"
import axios from "axios"
import constants from "../../constants"

const MsgCard = ({ res }) => {
    const [like, setlike] = useState(false)
    const [dislike, setdislike] = useState(false)

    function updateval(res): void {
        axios.post(`${constants.likeMsg}/${res}/0`).then(res=>{
            setlike(true);
            setdislike(false);
        })
    }
    function updateval1(res): void {
        axios.post(`${constants.likeMsg}/${res}/1`).then(res=>{
            setlike(false);
            setdislike(true);
        })
    }

    return (
        <Card
            sx={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                m: 0.5,
                borderRadius: '16px',
            }}
        >
                    <CardContent>
                <Markdown>{res.message}</Markdown>
                <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                >
                    {res.msgBy === 'AI' ? (
                        <>
                            <CIcon icon={cibDependabot} size="sm" color="white" />
                        </>
                    ) : (
                        <CIcon icon={cilUser} size="sm" />
                    )}
                    <Box>

                        {(res.msgBy === 'AI' && res.id != 0) && (
                            <>
                                <IconButton size="small">
                                </IconButton>
                                <IconButton size="small" onClick={()=>updateval(res.msgId)}>
                                    {like ? <ThumbUpIcon fontSize="small" /> :
                                        <ThumbUpOffAltIcon fontSize="small" />}
                                </IconButton>
                                <IconButton size="small" onClick={()=>updateval1(res.msgId)}>

                                    {dislike ? <ThumbDownIcon fontSize="small" /> :
                                        <ThumbDownOffAltIcon fontSize="small" />}
                                </IconButton>
                            </>
                        )}
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default MsgCard