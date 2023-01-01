import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { toggleModal } from "../features/modal/modalSlice";
import { startEditing } from "../features/modal/editModalSlice";
import { deleteTask } from "../features/task/taskSlice";
import { useDeleteTaskMutation } from "../features/api/taskApiSlice";

const TaskCard = ({ item, reference, droppableId, isDragging, ...props }) => {
  const dispatch = useDispatch();
  const [deleteTaskDb] = useDeleteTaskMutation();

  const handleEdit = (
    droppableId,
    draggableId,
    title,
    description,
    priority
  ) => {
    dispatch(toggleModal());
    dispatch(
      startEditing({ droppableId, draggableId, priority, title, description })
    );
  };
  const handleDelete = (droppableId, taskId) => {
    deleteTaskDb(taskId);
    dispatch(
      deleteTask({
        droppableId,
        draggableId: props["data-rbd-draggable-id"],
      })
    );
  };

  return (
    <div
      ref={reference}
      {...props}
      className={`bg-white h-[10rem] w-full my-2 p-2 rounded-md shadow-sm select-none ${
        isDragging && "bg-opacity-80"
      }`}
    >
      <div className="border-b border-dashed p-2 flex items-center justify-between">
        <h2>{item.title}</h2>
        <div className="flex space-x-2">
          <TrashIcon
            onClick={() =>
              handleDelete(droppableId, props["data-rbd-draggable-id"])
            }
            className="w-8 p-1 cursor-pointer hover:bg-gray-100 rounded-md hover:text-red-500 transition-all active:hover:bg-gray-200 active:scale-90 ease-out duration-200"
          />
          <PencilIcon
            onClick={() =>
              handleEdit(
                droppableId,
                props["data-rbd-draggable-id"],
                item.title,
                item.description,
                item.priority
              )
            }
            className="w-8 p-1 cursor-pointer hover:bg-gray-100 rounded-md hover:text-orange-500 transition-all active:hover:bg-gray-200 active:scale-90 ease-out duration-200"
          />
        </div>
      </div>
      <p className="font-extralight p-2">{item.description}</p>
    </div>
  );
};

export default TaskCard;
