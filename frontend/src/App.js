import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./components/StrictModeDroppable";
import Layout from "./components/Layout";
import TaskCard from "./components/TaskCard";
import StatusColumnLayout from "./components/StatusColumnLayout";
import AddModal from "./components/Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  reorderBetweenContainer,
  reorderWithinContainer,
} from "./features/task/taskSlice";
import {
  useGetTasksQuery,
  useReorderMutation,
} from "./features/api/taskApiSlice";
import { useEffect } from "react";

const onDragEnd = (result, dispatch, reorder, tasks) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (destination.droppableId !== source.droppableId) {
    const order = tasks[destination.droppableId].tasks.map((task) => task.id);
    order.splice(destination.index, 0, +result.draggableId);

    reorder({
      task: result.draggableId,
      status: destination.droppableId,
      order,
    });
    dispatch(reorderBetweenContainer({ source, destination }));
  } else {
    const order = tasks[destination.droppableId].tasks.map((task) => task.id);
    const index = order.findIndex((o) => o === +result.draggableId);
    order.splice(index, 1);
    order.splice(destination.index, 0, +result.draggableId);

    reorder({
      task: result.draggableId,
      status: destination.droppableId,
      order,
    });
    dispatch(
      reorderWithinContainer({
        source,
        destination,
      })
    );
  }
};

function App() {
  const tasks = useSelector((state) => state.task.value);
  const { data, isLoading } = useGetTasksQuery();
  const [reorder] = useReorderMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(fetchData({ data }));
    }
  }, [data]);
  return (
    <Layout className="flex flex-col w-[100vw] h-[100vh] p-5 overflow-x-auto space-y-3">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, dispatch, reorder, tasks)}
      >
        <div className="flex h-full w-full justify-center space-x-5">
          {data &&
            tasks.map((item, index) => (
              <StrictModeDroppable droppableId={`${index}`} key={index}>
                {(droppableprovided, _) => (
                  <StatusColumnLayout
                    {...droppableprovided.droppableProps}
                    reference={droppableprovided.innerRef}
                    title={item.title}
                  >
                    {[...item.tasks].map((it, index) => (
                      <Draggable
                        key={it.id}
                        draggableId={`${it.id}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <TaskCard
                            item={it}
                            droppableId={
                              droppableprovided.droppableProps[
                                "data-rbd-droppable-id"
                              ]
                            }
                            isDragging={snapshot.isDragging}
                            reference={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    ))}
                    {droppableprovided.placeholder}
                  </StatusColumnLayout>
                )}
              </StrictModeDroppable>
            ))}

          {isLoading &&
            new Array(3)
              .fill(1)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 shadow-md rounded-md max-h-full w-full p-2 overflow-auto animate-pulse"
                ></div>
              ))}
        </div>
      </DragDropContext>
      <AddModal />
    </Layout>
  );
}

export default App;
