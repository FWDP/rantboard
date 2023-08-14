import { useEffect, useState } from "react";
import Select from "react-select";
import avatar from "../../assets/myAvatar.png";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import RichTextInput from "../inputs/richText";
import { message } from "antd";
import { v4 as uuidv4 } from "uuid";
import { Cloudinary } from "@cloudinary/url-gen";
import { CloudinaryUploadWidget } from "../inputs/CloudinaryUploadWidget";

function TodoModal({ isOpen, onClose, todoData }) {
    if (!isOpen) return null;
    const queryClient = useQueryClient();
    const [groupData, setGroupData] = useState([]);
    const [groupOptions, setGroupOptions] = useState([]);
    const [richTextValue, setRichTextValue] = useState("");
    const [editDescription, setEditDescription] = useState(false);
    const [editName, setEditName] = useState(todoData ? false : true);
    const [defaultGroup, setDefaultGroup] = useState("");
    const [imageUrl, setImageUrl] = useState(todoData?.userPhoto ?? avatar);

    const initialValues = {
        groupId: todoData?.groupId ?? "",
        description: todoData?.description ?? "",
        name: todoData?.name ?? "",
        id: todoData?.id ?? "",
    };

    const { handleSubmit, setValue, control, register, reset, getValues } = useForm({
        defaultValues: initialValues,
    });

    const cld = new Cloudinary({
        cloud: {
            cloudName: "TodoUsers",
        },
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
        reset(initialValues);
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
            if (todoData) {
                const groupFilter = groupData.filter((d) => d.id == todoData.groupId);
                console.log(groupFilter);
                setValue("groupId", { value: groupFilter[0].id, label: groupFilter[0].name });

                setRichTextValue(todoData ? todoData.description : "");
            } else {
                setValue("groupId", {
                    value: groupData[0]?.id ?? 1,
                    label: groupData[0]?.name ?? "To Do",
                });
            }
        }
    }, [groupData]);
    const reStructureData = (data) => {
        let newData = {};
        for (let key in data) {
            typeof data[key] === "object"
                ? (newData[key] = data[key].value)
                : (newData[key] = data[key]);
        }
        return newData;
    };
    const onUpload = (result) => {
        setValue("userPhoto", result.secure_url);
        setImageUrl(result.secure_url);
    };

    const onSubmit = async () => {
        const formData = getValues();

        try {
            if (formData.id != "") {
                const res = await fetch(`http://localhost:3000/todos/${todoData.id}`, {
                    method: "PATCH",
                    body: JSON.stringify(reStructureData(formData)),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                });
                const response = await res.json();

                message.success("Updated Successfully");

                onClose();
            } else {
                let createData = reStructureData(formData);
                console.log(createData);
                const res = await fetch(`http://localhost:3000/todos/`, {
                    method: "POST",
                    body: JSON.stringify({
                        ...createData,
                        id: uuidv4(),
                        updatedAt: new Date().toISOString(),
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                });
                const response = await res.json();

                message.success("Added Successfully");

                onClose();
            }
        } catch (error) {}
    };

    const handleRichTextInputChange = (htmlValue) => {
        setRichTextValue(htmlValue);
        setValue("description", { value: htmlValue });
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
                            <div className="relative w- max-w-xl p-4 mx-auto bg-white rounded-md shadow-lg">
                                <div className="mt-3 gap-4 sm:flex ">
                                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                        <div className="grid grid-cols-3 ">
                                            <div className="col-span-2">
                                                {editName ? (
                                                    <input
                                                        type="text"
                                                        className="mb-6 shadow appearance-none border border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-400 focus:shadow-outline"
                                                        {...register("name")}
                                                        placeholder={
                                                            todoData ? todoData.name : "Add Title"
                                                        }
                                                        onKeyUp={(e) => {
                                                            if (
                                                                e.key == "Enter" ||
                                                                e.keyCode == 13
                                                            ) {
                                                                setValue("name", e.target.value);
                                                                setEditName(false);
                                                            }
                                                        }}
                                                        onChange={(e) =>
                                                            setValue("name", e.target.value)
                                                        }
                                                    />
                                                ) : (
                                                    <h4
                                                        title="Click to Edit"
                                                        className="text-lg font-medium text-gray-800 mb-6"
                                                        onClick={() => setEditName(true)}
                                                    >
                                                        {todoData?.name ?? ""}
                                                    </h4>
                                                )}

                                                {todoData ? (
                                                    !editDescription ? (
                                                        <>
                                                            <div
                                                                onClick={() => {
                                                                    setEditDescription(true);
                                                                }}
                                                                className="mt-2 text-[15px] leading-relaxed text-gray-500"
                                                                dangerouslySetInnerHTML={{
                                                                    __html:
                                                                        richTextValue != ""
                                                                            ? richTextValue
                                                                            : todoData.description,
                                                                }}
                                                            ></div>
                                                        </>
                                                    ) : (
                                                        <div>
                                                            <Controller
                                                                name="description"
                                                                control={control}
                                                                defaultValue={defaultGroup}
                                                                render={({ field }) => (
                                                                    <RichTextInput
                                                                        {...field}
                                                                        value={richTextValue}
                                                                        defaultValue={
                                                                            todoData.description ??
                                                                            ""
                                                                        }
                                                                    />
                                                                )}
                                                            />
                                                        </div>
                                                    )
                                                ) : (
                                                    <>
                                                        <div>
                                                            <Controller
                                                                name="description"
                                                                control={control}
                                                                defaultValue={defaultGroup}
                                                                render={({ field }) => (
                                                                    <RichTextInput
                                                                        {...field}
                                                                        value={richTextValue}
                                                                    />
                                                                )}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div className="mt-12">
                                                <img
                                                    src={imageUrl}
                                                    className="w-6/12 mx-auto rounded-full"
                                                />
                                                <h3
                                                    title="Click to Edit"
                                                    className="font-bold text-center mt-4"
                                                ></h3>

                                                <div className="flex flex-col items-center w-full">
                                                    <CloudinaryUploadWidget onUpload={onUpload} />
                                                    <h3 className="mt-4 font-semibold">John Doe</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="items-center gap-2 mt-3 sm:flex w-12/12 justify-end">
                                            {editDescription && (
                                                <button
                                                    className="py-1 mt-12 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 whitespace-nowrap"
                                                    onClick={() => {
                                                        setEditDescription(false);
                                                        setEditName(false);
                                                    }}
                                                >
                                                    Preview
                                                </button>
                                            )}
                                            <form
                                                onSubmit={handleSubmit(onSubmit)}
                                                className="w-full"
                                            >
                                                <Controller
                                                    name="groupId"
                                                    control={control}
                                                    defaultValue={defaultGroup}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            className="w-6/12 ml-auto text-sm "
                                                            options={groupOptions}
                                                        />
                                                    )}
                                                />
                                                <div className="w-full flex justify-end">
                                                    <button
                                                        className="text-right mt-2 py-1 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 whitespace-nowrap"
                                                        type="submit"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
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
