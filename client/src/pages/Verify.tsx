/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AiOutlineFacebook } from "react-icons/ai";
import { BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Dialog } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const Verify = async () => {
    const response = await axios.post(
      "http://localhost:7777/otp/signin/verify",
      {
        otp: Number(otp),
        email: router.query.email,
      }
    );
    const data = await response.data;
    localStorage.setItem("token", data.token);
    toast.success("Login Success");
    router.push({ pathname: "/" });
    if (otp !== otp) {
      toast.error("Token not match!!!");
    }
  };

  return (
    <div className="fixed top-16 w-56 text-right">
      <>
        <Transition appear show={true} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            open={true}
            onClose={() => true}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl p-3 bg-white text-left align-middle shadow-xl transition-all">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        Verify();
                      }}
                    >
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-bold leading-6 text-gray-900 mb-4"
                      >
                        Find your account
                      </Dialog.Title>
                      <div>
                        <input
                          type="text"
                          name="otp"
                          id="otp"
                          value={otp}
                          className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Token"
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn w-full h-full bg-o rounded-full"
                      >
                        Submit
                      </button>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <ToastContainer />
      </>
    </div>
  );
}
