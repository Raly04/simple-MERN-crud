import { useState} from "react";
import Handler from "./components/handler";
import TableComponent from "./components/table";
import { createContext } from "react";

const components = {
  TableComponent,
  Handler,
};

export const NavContext = createContext();

function App() {
  const [cc, setCC] = useState({
    value : "TableComponent",
    action : null,
    content : null,
  });

  const DynamicComponent = components[cc.value] || (() => <div>Not Found</div>);

  return (
    <NavContext.Provider value={{cc, setCC}}>
      <div className="flex items-start justify-center w-full relative top-48">
        <DynamicComponent/>
      </div>
    </NavContext.Provider>
  );
}

export default App;
