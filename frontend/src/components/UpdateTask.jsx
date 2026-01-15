import { useEffect, useState } from "react";
import "../style/addtask.css";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateTask() {
    const [taskData, setTaskData] = useState({});
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        getTask(id);
    }, [id]);

    const getTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:3200/task/${id}`, {
                method: "GET",
                credentials: "include", // ✅ send cookies (JWT)
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                console.error(data.message || "Failed to fetch task");
                return;
            }

            if (data.success && data.result) {
                setTaskData(data.result);
            }
        } catch (error) {
            console.error("Error fetching task:", error);
        }
    };


    const updateTask = async () => {
        console.log("function called", taskData);
        let task = await fetch("http://localhost:3200/update-task", {
            method: "put",
            body: JSON.stringify(taskData),
            headers: {
                "Content-Type": "Application/Json",
            },
        });
        task = await task.json();
        if (task) {
            navigate("/");
        }
    };

    return (
        <div className="container">
            <h1>Update Task</h1>

            <label htmlFor="">Title</label>
            <input
                value={taskData?.title}
                onChange={(event) =>
                    setTaskData({ ...taskData, title: event.target.value })
                }
                type="text"
                name="title"
                placeholder="Enter task title"
            />
            <label htmlFor="">Description</label>
            <textarea
                value={taskData?.description}
                onChange={(event) =>
                    setTaskData({ ...taskData, description: event.target.value })
                }
                rows={4}
                name="description"
                placeholder="Enter task description "
                id=""
            ></textarea>
            <button onClick={updateTask} className="submit">
                Update Task
            </button>
        </div>
    );
}
