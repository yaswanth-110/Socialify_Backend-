import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { redirect, useSubmit } from "react-router-dom";

import Button from "./Button";
import { PageStatus } from "../../store/PageStatusProvder";

const Modal = ({ children, method, path, data, buttonCaption }) => {
  const pageStatusCtx = useContext(PageStatus);
  const open = pageStatusCtx.path === path;

  const submit = useSubmit();
  const dialogRef = useRef();

  useEffect(() => {
    const ref = dialogRef.current;
    if (open) {
      ref.showModal();
    }

    return () => {
      ref.close();
      redirect("/posts");
    };
  }, [open]);

  const handleClose = () => {
    dialogRef.current.close();
    pageStatusCtx.changePath("/posts");
    submit(null, { method });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let key of Object.keys(data)) {
      formData.append(key, data[key]);
    }
    console.log("data", data);
    console.log("formData", formData.get("image"));
    submit(formData, { method, encType: "multipart/form-data" });
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className="flex flex-col gap-4 rounded-md w-[40%] p-8 justify-center align-middle backdrop:backdrop-blur shadow-xl"
    >
      <form onSubmit={handleSubmit}>
        {children}
        <div className="flex justify-center m-6">
          <Button textonly onClick={handleClose} type="button">
            Cancel
          </Button>
          <Button type="submit">{buttonCaption}</Button>
        </div>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
};

export default Modal;
