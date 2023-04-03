import {
    Avatar,
    Box,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import React from "react";

const CommentItem = (props) => {
    const { item } = props;
    return (
        <Box className="comment--item">
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Username" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={item.email}
                    secondary={<React.Fragment>{item.body}</React.Fragment>}
                />
            </ListItem>
        </Box>
    );
};

export default CommentItem;
