import Cards from "./components/cards";
import Modal from "./components/modals/todoModal";
import Example from "./components/modals/todoModal";
import { useState, useEffect } from "react";

function App() {
  const [groups, setGroups] = useState([]);

  const fetchGroups = () => {
    fetch("http://localhost:3000/Groups")
      .then((response) => response.json())
      .then((result) => {
        setGroups(result);
      });
  };
  useEffect(() => {
    if (groups.length == 0) {
      fetchGroups();
    }
  }, []);

  return (
    <div className="container mx-auto min-w-2xl mt-16 h-96 bg-white">
      <div className="grid grid-cols-3 gap-4 text-center">
        {groups.length > 0 &&
          groups.map((group) => {
            return <Cards key={group.id} group={group} />;
          })}
      </div>
    </div>
  );
}

export default App;
