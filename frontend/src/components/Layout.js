import { PlusIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { stopEditing } from "../features/modal/editModalSlice";
import { toggleModal } from "../features/modal/modalSlice";

const Layout = ({ children, ...props }) => {
  const dispatch = useDispatch();
  const handleCreate = () => {
    dispatch(toggleModal());
    dispatch(stopEditing());
  };

  return (
    <div {...props}>
      <header className="p-5 px-10 bg-gray-200 shadow-md rounded-md flex items-center justify-between">
        <h1 className="text-[1.3rem] font-bold">Tasks</h1>
        <PlusIcon
          onClick={handleCreate}
          className="h-10 w-10 bg-white p-2 rounded-md cursor-pointer active:scale-90 active:bg-opacity-60 transition-all duration-200 ease-out"
        />
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
