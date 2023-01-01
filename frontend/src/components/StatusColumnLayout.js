const StatusColumnLayout = ({ children, title, reference, ...props }) => {
  return (
    <div
      {...props}
      ref={reference}
      className="bg-gray-200 shadow-md rounded-md max-h-full w-full p-2"
    >
      <h1 className="shadow-md p-2 rounded-md font-bold">{title}</h1>

      {children}
    </div>
  );
};

export default StatusColumnLayout;
