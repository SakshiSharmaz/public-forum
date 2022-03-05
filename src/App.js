import "./components/css/login.css"
import Topics from './components/screens/topics';
import Login from "../src/components/screens/login"
import TopicDetails from "./components/helpercomponents/TopicDetails";
import CreateTopic from "./components/screens/CreateTopic";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (

    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login title="Sign In" />} />
          <Route path="/dashboard" element={<Topics />} />
          <Route path="/topic" element={<CreateTopic />} />


        </Routes>
      </BrowserRouter>

    // <Login  
    //   title="Sign In"
    //  />
    // <Topics />
    // <CreateTopic />

  );
}

export default App;
