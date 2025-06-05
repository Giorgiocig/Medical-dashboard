import { IconButton, Tooltip } from "@mui/material";
import FeedbackIcon from '@mui/icons-material/Feedback'
import type { TooltipIconBtnProps } from "../utilities/interfaces";

export default function TooltipIconBtn({ title, action }: TooltipIconBtnProps) {
    return (
        <Tooltip title={title}>
            <IconButton onClick={action}>
                <FeedbackIcon />
            </IconButton>
        </Tooltip>
    )
}