import Cards from "./components/cards";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Circles } from "react-loader-spinner";
import TodoModal from "./components/modals/todoModal";
import { useState } from "react";

function App() {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fetchGroups = async () => {
        const res = await fetch("http://localhost:3000/groups?_embed=todos");
        return res.json();
    };
    const { data: groups = [], isFetching } = useQuery({
        refetchOnWindowFocus: true,
        queryKey: ["fetchGroupsKey"],
        queryFn: fetchGroups,
    });

    return (
        <>
            <div className="container mx-auto min-w-2xl mt-16 h-96">
                {isFetching ? (
                    <container className="flex justify-center items-center h-full">
                        <Circles
                            height="80"
                            width="80"
                            color="#4fa94d"
                            className="mx-auto my-auto"
                            ariaLabel="circles-loading"
                            visible={true}
                        />
                    </container>
                ) : (
                    <>
                        <button
                            onClick={() => {
                                setIsModalOpen(true);
                            }}
                            className="py-1 mt-12 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 whitespace-nowrap"
                        >
                            Add New
                        </button>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            {groups.map((group) => {
                                return <Cards key={group.id} group={group} />;
                            })}
                        </div>
                    </>
                )}
            </div>
            <TodoModal
                isOpen={isModalOpen}
                onClose={() => {
                    queryClient.invalidateQueries(["fetchGroupsKey"]);
                    setIsModalOpen(false);
                }}
            />
        </>
    );
}

export default App;
