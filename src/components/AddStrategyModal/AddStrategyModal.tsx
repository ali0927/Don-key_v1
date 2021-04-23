import { ContainedButton } from "components/Button";
import { DonKeySpinner } from "components/DonkeySpinner";
import { DonCommonmodal } from "components/DonModal";
import { useAxios } from "hooks/useAxios";
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

  const [{ loading }, createStrategy] = useAxios(
    { url: "/api/v2/strategy", method: "POST" },
    { manual: true }
  );

  const renderButtonText = () => {
    if (loading) {
      return <DonKeySpinner />;
    }

    return "Create";
  };

  const handleCreate = async () => {
    try {

      await createStrategy();
      onClose();
      onSuccess && onSuccess();
    } catch (e) {
      onFail && onFail();
   
    }
  };

  return (
    <DonCommonmodal
      variant="v1"
      size="xs"
      icon={<FaPlus />}
      isOpen={isOpen}
      onClose={onClose}
      title="Add a New Strategy"
    >
      Strategy Will be added 
      <ContainedButton disabled={loading} onClick={handleCreate} className="mt-3">
        {renderButtonText()}
      </ContainedButton>
    </DonCommonmodal>
  );
};
