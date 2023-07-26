import { Application, DatePicker } from 'react-rainbow-components';
import {state, setState, useState} from 'react';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";


const initialState = {
    range: undefined,
};
const containerStyles = {
    maxWidth: 400,
};

const Search = () => {

    const [state, setState] = useState(initialState);

    const Mytheme = useTheme();
    const colors = tokens(Mytheme.palette.mode);
    const theme = {
        rainbow: {
            palette: {
                brand: colors.primary[100], // text inside calander
                mainBackground: colors.primary[400], // backgrounf of calander
                border: colors.primary[300], // border color of calander
                text: colors.grey[900], // text color in text
            },
        },
    };

    return (
        <div className="dash" style={{ paddingLeft: '20px' }}>
            <h1>Search</h1>
                <DatePicker
                    id="datePicker-15"
                    label="Please pick the dates:"
                    placeholder="Select range of dates"
                    selectionType="range"
                    formatStyle="large"
                    variant="single"
                    value={state.range}
                    onChange={value =>  setState({ range: value })}
                />
        </div>
    )
}

export default Search;
