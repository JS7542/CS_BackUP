import "../css/modal.css";

const Modal = ({ getWide }) => {
  const clickModal = (v) => {
    getWide(v);
  };

  return (
    <div className="modalWrapper0">
      <div className="modalWrapper"></div>
      <div className="modalWrapperIn">
        <div className="Select" onClick={() => clickModal(25)}>
          25평
        </div>
        <div className="Select" onClick={() => clickModal(34)}>
          34평
        </div>
      </div>
    </div>
  );
};

export default Modal;
