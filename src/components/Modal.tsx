import { Dialog, Transition } from '@headlessui/react';
import { Fragment, PropsWithChildren } from 'react';

interface Props {
  isOpened: boolean;
  onClose: () => void;
}

export default function Modal(props: PropsWithChildren<Props>) {
  return <Transition appear show={props.isOpened} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={props.onClose}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/25"/>
      </Transition.Child>
      <div className="fixed inset-0 overflow-y-auto">
        <div
          className="flex min-h-full items-end
          justify-center p-2 text-center"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-12"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-12"
          >
            <Dialog.Panel
              className="w-screen max-w-md overflow-hidden
               rounded-2xl bg-white p-6 text-left
               align-middle shadow-xl transition-all"
            >
              {props.children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>;
}

