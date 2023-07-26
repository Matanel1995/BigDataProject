import {ColorModeContext, useMode} from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import MySideBar from "./global/MySideBar";
import MyTopBar from "./global/MyTopBar"
import DashBoard from "./pages/dashboard";
import Search from "./pages/search";
import Analyze from "./pages/analyze";
import CardsScreen from "./pages/CardScreen"
import { Routes,Route } from "react-router-dom";
import SunPage from "./pages/SunPage";

function App() {
  const [theme,colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <MySideBar/>
          <main className="content">  
            <MyTopBar/>
          <Routes>
            <Route path="/" element = {<DashBoard/>}/>
            <Route path="/search" element = {<Search/>}/>
            <Route path="/analyze" element = {<Analyze/>}/>
            <Route path="/cards" element = {<CardsScreen/>}/>
            <Route path="/sunPage" element = {<SunPage/>}/>
          </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
