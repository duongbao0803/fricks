import { useState } from "react";

export const useConfirmRemaek = (id: number) => {
  const [remark, setRemark] = useState("");
  const [isDot, setIsDot] = useState(false);
  const { closeModal } = useModal();

  const handleOnchangeName = (e) => {
    setRemark(e.target.value);
  };

  const hadnleConfirm = () => {
    if (remark !== "") {
      setIsDot(true);
    } else {
      setIsDot(false);
    }
    closeModal();
  };

  return {
    hadnleConfirm,
    handleOnchangeName,
    remark,
    isDot,
  };
};
