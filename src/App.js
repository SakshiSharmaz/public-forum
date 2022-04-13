import "./components/css/login.css";
import Login from "../src/components/screens/login";
import Dashboard from "../src/components/screens/Dashboard/Dashboard";
import Topics from "../src/components/screens/Dashboard/components/topics";
import CreateTopic from "../src/components/screens/Dashboard/components/CreateTopic";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login title="Sign In" />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Topics />} />
          <Route path="topic" element={<CreateTopic />} />
        </Route>
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
