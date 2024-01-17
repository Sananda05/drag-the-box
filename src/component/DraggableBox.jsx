const DraggableBox = () => {
  return (
    <div
      style={{
        height: "100px",
        width: "200px",
        backgroundColor: "rgb(132, 206, 229)",
        border: "none",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      Drag the box
    </div>
  );
};

export default DraggableBox;
