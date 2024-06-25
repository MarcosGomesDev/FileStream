"use client";

import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/float-input";
import { FloatingLabelInputPassword } from "@/components/ui/float-input-password";
import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
// import { loginAction } from "@/server-actions/auth.action";
import { loginAction } from "@/server-actions/auth.action";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginForm, loginSchema } from "../formSchema";

export function Form({ redirect_to }: { redirect_to: string }) {
  // const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const errorTimeout = setTimeout(() => {
        clearErrors();
      }, 10000);

      return () => clearTimeout(errorTimeout);
    }
  }, [errors, clearErrors]);

  const clientAction = async (formData: LoginForm) => {
    setIsLoading(true);
    const response = await loginAction(formData);

    if (response?.error) {
      // toast({
      //   title: "Uh oh! Algo deu errado",
      //   description: response.error.error.message,
      //   variant: "destructive",
      // });

      setIsLoading(false);
    }

    setIsLoading(false);
  };

  return (
    <form
      className="mx-auto my-auto flex h-screen w-full xl:my-0 xl:h-auto xl:py-0"
      onSubmit={handleSubmit(clientAction)}
    >
      <div className="mx-auto my-auto w-full rounded-md bg-white px-5 py-8 shadow-md dark:bg-background sm:w-3/4 sm:px-8 lg:w-2/4 xl:ml-20 xl:w-2/3 xl:bg-transparent xl:p-0 xl:shadow-none">
        <h2 className="intro-x text-center text-2xl font-bold text-primary xl:text-left xl:text-3xl">
          Login
        </h2>
        <div className="intro-x mt-2 text-center text-slate-400 xl:hidden">
          Apenas alguns click&apos;s para gerenciar seus arquivos.
        </div>
        <div className="intro-x mt-8 w-full">
          <Input
            type="hidden"
            value={redirect_to}
            {...register("redirect_to")}
          />

          <FloatingLabelInput
            id="email"
            label="Email"
            type="email"
            className="focus-within:border-primary"
            error={errors.email}
            {...register("email")}
          />
          <div className="my-2 text-xs text-red-500">
            {errors.email?.message ?? ""}
          </div>
          <FloatingLabelInputPassword
            id="password"
            label="Senha"
            register={{ ...register("password") }}
            error={errors.password}
          />
          <div className="mt-2 text-xs text-red-500">
            {errors.password?.message ?? ""}
          </div>
        </div>
        <div className="intro-x mt-4 flex text-xs text-primary dark:text-primary sm:text-sm">
          <Link href="#" className="hover:underline">
            Esqueceu sua senha?
          </Link>
        </div>
        <div className="intro-x mt-5 text-center xl:mt-8 xl:text-left">
          <Button
            className="w-full px-4 py-3 align-top xl:mr-3 xl:w-32"
            type="submit"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </div>
      </div>
    </form>
  );
}
