import { Provider } from "react-redux";
import { store } from "./store/store";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import EditEmployee from "./components/EditEmployee";

function App() {
  const [editing, setEditing] = useState(null);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/edit/:id" element={<EditEmployee />} />
          <Route
            path="/"
            element={
              <div>
                <EmployeeForm editing={editing} setEditing={setEditing} />
                <EmployeeList setEditing={setEditing} />
              </div>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
