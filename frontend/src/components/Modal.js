import { Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useCreateTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../features/api/taskApiSlice";
import { toggleModal } from "../features/modal/modalSlice";
import { addNewTask, updateTask } from "../features/task/taskSlice";

const AddModal = () => {
  const editModal = useSelector((state) => state.editModal.value);
  const [editTask] = useUpdateTaskMutation();
  const [createTask] = useCreateTaskMutation();
  const { data } = useGetTasksQuery();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const modal = useSelector((state) => state.modal.value);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editModal) {
      dispatch(
        updateTask({
          droppableId: editModal.droppableId,
          draggableId: editModal.draggableId,
          priority: editModal.priority,
          title,
          description,
        })
      );
      editTask({ id: editModal.draggableId, title, description });
    } else {
      dispatch(
        addNewTask({
          title,
          description,
        })
      );
      createTask({
        title,
        description,
        priority: !!data[0].tasks.length
          ? Math.max(...data?.at(0).tasks.map((d) => d.priority)) + 1
          : 0,
      });
    }
    dispatch(toggleModal());
  };

  const handleClose = () => {
    dispatch(toggleModal());
  };

  useEffect(() => {
    if (editModal) {
      setTitle(editModal.title);
      setDescription(editModal.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editModal, modal]);

  return (
    <Modal
      centered
      opened={modal}
      onClose={handleClose}
      title={editModal ? "Edit the task" : "Create a new task"}
      closeOnClickOutside={true}
      closeOnEscape={true}
    >
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <label htmlFor="title">Title</label>
        <input
          required
          className="border p-1"
          id="title"
          name="title"
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="title">Description</label>
        <textarea
          id="description"
          name="description"
          cols="30"
          rows="10"
          className="min-w-min max-h-[35rem] border p-1"
          required
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="bg-blue-600 w-max p-2 px-4 text-white rounded-md self-center">
          {editModal ? "Save" : "Create"}
        </button>
      </form>
    </Modal>
  );
};

export default AddModal;
