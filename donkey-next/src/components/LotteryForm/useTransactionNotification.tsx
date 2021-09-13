/* eslint-disable react-hooks/exhaustive-deps */
import {
  ErrorSnackbar,
  ProgressSnackbar,
  SuccessSnackbar,
} from "components/Snackbars";
import { useSnackbar } from "notistack";
import { useCallback, useRef } from "react";

export const useTransactionNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const progressRef = useRef<number | string | null>(null);

  
  const hideProgress = useCallback(() => {
    if (progressRef.current !== null) {
      closeSnackbar(progressRef.current);
      progressRef.current = null;
    }
  }, []);
  const showProgress = useCallback((msg: string) => {
    hideProgress()
    progressRef.current = enqueueSnackbar(msg, {
      content: (_, msg) => <ProgressSnackbar message={msg as string} />,
      persist: true,
    });
  }, []);
  
  const showSuccess = useCallback((msg) => {
    hideProgress();
    enqueueSnackbar(msg, {
      content: (_, msg) => <SuccessSnackbar message={msg as string} />,
      autoHideDuration: 5000,
      persist: false,
    });
  }, []);

  const showFailure = useCallback((msg) => {
    hideProgress();
    enqueueSnackbar(msg, {
      content: (_, msg) => <ErrorSnackbar message={msg as string} />,
      autoHideDuration: 5000,
      persist: false,
    });
  }, []);

  return {
    showFailure,
    showProgress,
    showSuccess,
    hideProgress,
  };
};
