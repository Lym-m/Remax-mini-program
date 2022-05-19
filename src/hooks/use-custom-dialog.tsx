import React, {useCallback, useMemo, useState} from 'react';
import Dialog, {DialogProps} from '@/components/dialog';

type UseCustomDialogParam = Omit<DialogProps, 'show'>

export default function useCustomDialog() {
  const [show, setShow] = useState(false);
  const [param, setParam] = useState({} as UseCustomDialogParam);

  const dialog = useMemo(() => {
    return (
      <Dialog {...param} show={show}/>
    );
  }, [param, show]);

  const showDialog = useCallback((props: UseCustomDialogParam) => {
    const { onCancel, onConfirm } = props;
    let resolve: () => void;
    let reject: () => void;
    const dialogShowPromise = new Promise<void>((resolve1, reject1) => {
      resolve = resolve1;
      reject = reject1;
    });

    const cancel = () => {
      setShow(false);
      onCancel?.();
      reject();
    };
    const confirm = () => {
      setShow(false);
      onConfirm?.();
      resolve();
    };

    setShow(true);
    setParam({ ...param, ...props, onCancel: cancel, onConfirm: confirm });
    return dialogShowPromise;
  }, [param]);

  const hideDialog = useCallback(() => {
    setShow(false);
  }, []);

  return {dialog, showDialog, hideDialog};
}
