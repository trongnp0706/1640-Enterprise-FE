import { Box, Button, TextField } from "@mui/material";
import "./comments.scss";

import React, { memo, useCallback, useState } from "react";

const Comments = (props) => {
    const { idPost } = props;
    const [formVal, setFormVal] = useState({
        idPost,
        comment: "",
    });
    const onChange = (e) => {
        setFormVal({
            ...formVal,
            comment: e.target.value,
        });
    };

    const handleSubmit = useCallback(() => {
        console.log(formVal);
        //Apply Api and (call api get list comment => update list comment)
    }, [formVal]);
    return (
        <Box>
            <TextField
                id="outlined-basic"
                label="Comment"
                variant="outlined"
                fullWidth
                onChange={(e) => onChange(e)}
            />
            <Box display={"flex"} justifyContent={"end"} mt={1}>
                <Button variant="contained" onClick={handleSubmit}>
                    Comment
                </Button>
            </Box>
        </Box>
    );
};

export default memo(Comments);
