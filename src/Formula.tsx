import { Box, Paper, Stack, TextField } from "@mui/material";
import { FormEventHandler, FunctionComponent, useState } from "react";
import { Formula } from "./formulas";

interface Props {
    formula: Formula;
}

const Component: FunctionComponent<Props> = ({ formula }) => {
    let [variables, setVariables] = useState<(number | null)[]>(formula.variables.map(_ => null));

    const onFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
    };

    return (
        <Box component="form" onSubmit={onFormSubmit} noValidate sx={{ height: "100%" }}>
            <Paper sx={{ p: { xs: 2, sm: 4 }, boxShadow: { xs: "none", sm: undefined }, height: { xs: "100%", sm: "auto" } }}>
                <Stack key={-1} direction="row" sx={{ pb: 1 }}>
                    {`${formula.name} = ${variables.includes(null) ? "?" : formula.calculate(...(variables as any))}`}
                </Stack>
                <Stack spacing={2}>
                    {formula.variables.map((variable, ind) =>
                        <Stack key={ind} direction="row">
                            <TextField
                                fullWidth
                                label={variable}
                                value={variables[ind] ?? ""}
                                type="number"
                                onChange={event => {
                                    let newVariables = [...variables];
                                    newVariables[ind] = event.target.value ? isNaN(+event.target.value) ? newVariables[ind] : +event.target.value : null;
                                    setVariables(newVariables);
                                }}
                            />
                        </Stack>
                    )}
                </Stack>
            </Paper>
        </Box>
    );
};

export default Component;