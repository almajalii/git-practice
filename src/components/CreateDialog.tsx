import { useEffect, useRef } from "react";
export function CreateDialog({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClose={onClose}
      aria-labelledby="create-title"
      className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-40px)] max-w-xl overflow-y-auto rounded-3xl border-0 bg-[#f8f8f5] p-8 text-stone-800 backdrop:bg-black/30 backdrop:backdrop-blur-sm"
    >
      {children}
    </dialog>
  );
}
