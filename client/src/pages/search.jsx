import { DatePicker } from 'react-rainbow-components';
import EventPicker from '../components/EventPicker';
import TelescopePicker from '../components/TelescopePicker';
import EsTable from '../components/EsTable';
import Button from '@mui/material/Button';
import { useState} from 'react';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";




const initialState = {
    range: undefined,
};


const Search = () => {

    const [state, setState] = useState(initialState);

    const [selectedEventOption, setSelectedEventOption] = useState('');
    const handleOptionChange = (selectedEventOption) => {
        setSelectedEventOption(selectedEventOption);
      };


    const [selectedTelescopOption, setSelectedTelescopOption] = useState("");
    const handleOptionTeleChange = (selectedTelescopOption) => {
        setSelectedTelescopOption(selectedTelescopOption);
      };
    // const [selectedUrgencyOption, setSelectedUrgencyOption] = useState("");
    // const handleOptionUrgencyChange = (selectedUrgencyOption) => {
    //     setSelectedUrgencyOption(selectedUrgencyOption);
    //   };

    const [recivedData, setRecivedData] = useState([]);

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

    
    async function sentRequestES(start,end,event,telescopName   ){
        const response = await fetch(`http://localhost:8000/getSearch?start=${start}&end=${end}&event=${event}&telescopName=${telescopName}`)
        const data = await response.json();
        const realData = data.response;
        setRecivedData(realData);
        console.log(recivedData);
    }


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
                <div className='Pickers' style={{display: 'flex', flexDirection: 'row'}} >
                    <EventPicker selectedOption={selectedEventOption} setSelectedOption={handleOptionChange}/>
                    <div style={{margin:20}}/>
                    <TelescopePicker selectedOption={selectedTelescopOption} setSelectedOption={handleOptionTeleChange}/>
                    {/* <EventPicker selectedOption={selectedUrgencyOption} setSelectedOption={handleOptionUrgencyChange}/> */}
                </div>
            <div className='button'>
                <Button
                    variant='outlined'
                    style={{color:colors.grey[100], backgroundColor: colors.primary[300],marginTop:30, marginBottom: 20}}
                    onClick={ () =>{
                        if(state.range !== undefined){
                            sentRequestES(
                                new Date(state.range[0]).getTime(),
                                new Date(state.range[1]).getTime(),
                                selectedEventOption,
                                selectedTelescopOption
                            ) 
                        } 
                        else{
                            alert(' You have to choose time range!')
                        }
                    }
                    }>Lunch</Button>
            </div>
            <div className='resultTable' style={{backgroundColor: colors.primary[400], padding:10, borderRadius:16}}>
                <EsTable data = {recivedData}/>
            </div>
        </div>
    )
}

export default Search;
