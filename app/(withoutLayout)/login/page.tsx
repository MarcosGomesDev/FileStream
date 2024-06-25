import { AuthService } from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Form } from "./components/Form";

export default async function Login({
  searchParams,
}: {
  searchParams: { redirect_to?: string };
}) {
  const { redirect_to = "/" } = searchParams;

  const authService = new AuthService();
  const user = authService.getUser();

  if (user && !authService.isTokenExpired()) {
    redirect(redirect_to);
  }
  return (
    <>
      <div
        className={twMerge([
          "relative h-full w-full bg-primary p-3 dark:!bg-slate-700 sm:px-8 md:dark:!bg-background lg:-m-3 lg:-mx-8 lg:overflow-hidden xl:bg-white",
          "before:absolute before:inset-y-0 before:left-0 before:-mb-[16%] before:-ml-[13%] before:-mt-[28%] before:hidden before:w-[57%] before:rotate-[-4.5deg] before:transform before:rounded-[100%] before:bg-primary/20 before:content-[''] before:dark:bg-slate-400 before:xl:block",
          "after:absolute after:inset-y-0 after:left-0 after:-mb-[13%] after:-ml-[13%] after:-mt-[20%] after:hidden after:w-[57%] after:rotate-[-4.5deg] after:transform after:rounded-[100%] after:bg-primary after:content-[''] after:dark:bg-slate-700 after:xl:block",
        ])}
      >
        {/* <DarkModeSwitcher />
      <MainColorSwitcher /> */}
        <div className="container relative z-10 md:px-10">
          <div className="-mx-5 block gap-4 md:mr-0 md:grid-cols-2 xl:grid">
            {/* BEGIN: Login Info */}
            <div className="hidden min-h-screen flex-col xl:flex">
              <Link
                href="/login"
                className="-intro-x flex size-12 items-center pt-5"
              >
                <Image
                  alt="Logo FileStream"
                  className="-mt-1"
                  width={48}
                  height={48}
                  src="/logo.png"
                />
                <span className="text-2xl text-white">FileStream</span>
              </Link>
              <div className="my-auto">
                <Image
                  alt="Illustration BackOfficeX"
                  className="-intro-x -mt-16 w-1/2"
                  width={120}
                  height={120}
                  src="/illustration.svg"
                />
                <div className="-intro-x mt-10 text-4xl font-medium leading-tight text-white">
                  Apenas alguns click&apos;s para <br />
                  gerenciar seus arquivos.
                </div>
                <div className="-intro-x mt-5 w-9/12 text-lg text-white text-opacity-70 dark:text-slate-400">
                  Faça seus uploads de qualquer lugar!
                </div>
              </div>
            </div>

            <Form redirect_to={redirect_to} />
          </div>
        </div>
      </div>
    </>
  );
}
