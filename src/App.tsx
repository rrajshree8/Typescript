import { Box, Container } from "@chakra-ui/react";
import NavBar from "./Components/NavBar";
import Slider from "./Components/Slider";

function App() {
 

  return (
    <Box>
      <NavBar/>
      <Container>
        <Slider/>
      </Container>

    </Box>
  );
}

export default App;
