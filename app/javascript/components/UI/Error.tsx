import React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface ErrorProps {
  error?: string;
  touched?: boolean;
}

function Error({ error, touched }: ErrorProps) {
  return (
    <Box>
      <Typography color={"red"} paragraph={true} ml={2} mt={0.5}>
        {error && touched ? error : null}
      </Typography>
    </Box>
  );
}

export default Error;
