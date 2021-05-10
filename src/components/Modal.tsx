import { ComponentProps, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Icon from "./Icon";

export interface ModalProps extends ComponentProps<"div"> {
  open: boolean;
  onClose: () => void;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  const closeButtonRef = useRef();
  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={open}
        onClose={onClose}
        initialFocus={closeButtonRef}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="flex items-center justify-center w-6 h-6"
                  onClick={onClose}
                  ref={closeButtonRef}
                >
                  <Icon className="text-gray-400 hover:text-gray-500">
                    close
                  </Icon>
                </button>
              </div>
              <div className="mt-6">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
