import { Box, Container } from "@chakra-ui/react";
import NavBar from "./Components/NavBar";
import Slider from "./Components/Slider";
import CoinTable from "./Components/CoinTable";
import CoinCard from "./Components/CoinCard";
import News from "./Components/News";

function App() {
 

  return (
    <Box>
      <NavBar/>
      <Slider/>
      <CoinTable/>
      <CoinCard/>
      <News/>

    </Box>
  );
}

export default App;
