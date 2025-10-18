"use client";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { postChapta, postLoginChapta } from "@/services/api/xena";
import { Input } from "@heroui/react";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ModalOTP({ isOpen, onClose, isDisabled }) {
  const { mutate, isPending } = postChapta();
  const { mutate: loginOtp, isPending: loadingLogin } = postLoginChapta();
  const [resp, setRResp] = useState(null);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [login, setLogin] = useState({
    username: "",
    password: "",
    code: "",
    uuid: "",
  });

  useEffect(() => {
    if (resp) {
      setLogin({
        username: form.username,
        password: form.password,
        uuid: resp?.uuid,
        code: "",
      });
    }
  }, [resp]);

  const handleSubmit = () => {
    mutate(form, {
      onSuccess: (res) => {
        if (res?.code === 500) {
          toast.error(res.msg);
        } else {
          setRResp(res?.data);
        }
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      className="max-w-[300px] p-5 lg:p-10"
    >
      <div className="font-semibold text-gray-800 dark:text-white/90">
        GET API KEYS
      </div>

      <div className="mt-10">
        {resp ? (
          <div>
            <div>
              <Label>OTP</Label>
              <Input
                value={login.code}
                onChange={(e) =>
                  setLogin((prev) => ({ ...prev, code: e.target.value }))
                }
              />
            </div>
          </div>
        ) : (
          <>
            <div>
              <Label>Username</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, username: e.target.value }))
                }
              />
            </div>
            <div className="mt-2">
              <Label>Password</Label>
              <Input
                value={form.name}
                type="password"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
          </>
        )}

        <div className="mt-7 flex w-full items-center justify-center gap-3">
          <Button size="sm" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            size="sm"
            onClick={() => {
              if (resp) {
                loginOtp(login, {
                  onSuccess: (res) => {
                    toast.success("Berhasil");
                  },
                  onError: (err) => [toast.error("Error")],
                });
              } else {
                handleSubmit();
              }
            }}
            disabled={isPending}
            className="bg-error-500 hover:bg-error-600 text-white"
          >
            {resp ? "Submit OTP" : "Submit"}{" "}
            {isPending && <Loader2 className="animate-spin" />}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
