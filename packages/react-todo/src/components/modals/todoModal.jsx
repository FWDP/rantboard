import { useEffect, useState } from "react";
import Select from "react-select";
import avatar from "../../assets/myAvatar.png";
import { useForm, Controller } from "react-hook-form";

function TodoModal({ isOpen, onClose, todoData }) {
  if (!isOpen) return null;
  const [groupData, setGroupData] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);
  const [defaults, setDefaults] = useState("");

  const { handleSubmit, setValue, control } = useForm({
    defaultValues: { group: todoData.group },
  });

  const fetchGroups = () => {
    fetch("http://localhost:3000/Groups")
      .then((response) => response.json())
      .then((result) => {
        setGroupData(result);
      });
  };

  useEffect(() => {
    if (groupData.length == 0) {
      fetchGroups();
    }
  }, []);

  useEffect(() => {
    if (groupData.length > 0) {
      const newOption = groupData.map((d) => {
        return {
          label: d.name,
          value: d.id,
        };
      });
      setGroupOptions(newOption);
    }
  }, [groupData]);

  const groupValue = groupData.filter((d) => d.id === todoData.group);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      {isOpen ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={onClose}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 gap-4 sm:flex ">
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <div className="grid grid-cols-3">
                      <div className="col-span-2">
                        <h4 className="text-lg font-medium text-gray-800">
                          {todoData.name}
                        </h4>
                        <div
                          className="mt-2 text-[15px] leading-relaxed text-gray-500"
                          dangerouslySetInnerHTML={{
                            __html: todoData.description,
                          }}
                        ></div>
                      </div>
                      <div>
                        <img src={avatar} className="w-full rounded-full" />
                        <h3 className="font-bold text-center mt-12">
                          John Doe
                        </h3>
                      </div>
                    </div>
                    <div className="items-center gap-2 mt-3 sm:flex w-12/12 justify-end">
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full"
                      >
                        <Controller
                          name="group"
                          control={control}
                          render={({ field }) => (
                            <Select
                              className="w-6/12 ml-auto border-0 text-sm mb-6"
                              onChange={(e) => {
                                setValue(e.target.value);
                              }}
                              {...field}
                              options={groupOptions}
                            />
                          )}
                        />
                        <button
                          className="text-right w-full ml-auto border-0"
                          type="submit"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default TodoModal;
