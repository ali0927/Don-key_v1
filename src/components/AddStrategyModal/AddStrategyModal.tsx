import { FormGroup } from "@material-ui/core";
import { ContainedButton } from "components/Button";
import { DonKeySpinner } from "components/DonkeySpinner";
import { DonCommonmodal } from "components/DonModal";
import { useAxios } from "hooks/useAxios";

import { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export const AddStrategyModal = ({
  isOpen,
  onClose,
  onSuccess,
  onFail,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onFail?: () => void;
}) => {
  const [name, setName] = useState("");

  const [{ loading, data }, executePut] = useAxios(
    { url: "/api/v2/strategy", method: "POST" },
    { manual: true }
  );
  const [errorMsg, setErrorMsg] = useState("");

  const renderButtonText = () => {
    if (loading) {
      return <DonKeySpinner />;
    }

    return "Create";
  };

  const handleCreate = async () => {
    try {
      if (!name) {
        return setErrorMsg("Please enter a name");
      }
      await executePut({ data: { name } });
      onClose();
      onSuccess && onSuccess();
    } catch (e) {
      onFail && onFail();
      setErrorMsg("Try Again Later");
    }
  };

  useEffect(() => {
    setErrorMsg("");
  }, [name]);

  return (
    <DonCommonmodal
      variant="v1"
      size="xs"
      icon={<FaPlus />}
      isOpen={isOpen}
      onClose={onClose}
      title="Add a New Strategy"
    >
      <FormGroup>
        <Form.Label className="signup-field-label">Strategy Name</Form.Label>
        <Form.Control
          className="signup-field signup-field-Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Strategy Name"
        />
      </FormGroup>
      {errorMsg && <p className="text-danger mb-0 mt-3">{errorMsg}</p>}
      <ContainedButton disabled={loading} onClick={handleCreate} className="mt-3">
        {renderButtonText()}
      </ContainedButton>
    </DonCommonmodal>
  );
};
