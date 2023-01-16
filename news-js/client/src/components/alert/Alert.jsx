import React from "react";
import { useStore } from "../../contexts/StoreContext";
import Toast from "./Toast";

function Alert() {
  const { state, action } = useStore();
  const { success, error } = state.alert;
  const { setAlertSuccess, setAlertError } = action.alert;

  return (
    <>
      {error && (
        <Toast msg={error} handleShow={() => setAlertError("")} color="red" />
      )}

      {success && (
        <Toast
          msg={success}
          handleShow={() => setAlertSuccess("")}
          color="green"
        />
      )}
    </>
  );
}

export default Alert;
