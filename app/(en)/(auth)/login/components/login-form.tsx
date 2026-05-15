import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { EyeOff } from "lucide-react";
export default function LoginForm() {
  return (<form className="w-full lg:w-1/2 flex flex-col gap-4 px-6 sm:px-10 lg:px-20 py-10 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-300 bg-white">
        <h1 className="text-2xl w-fit font-bold text-amber-50 bg-black py-1 px-2">
          Login
        </h1>

        <label htmlFor="email" className="text-sm font-medium text-gray-400">
          Email
        </label>

        <input
          type="email"
          id="email"
          name="email"
          className="border border-gray-300 rounded-4xl px-3 py-2"
          required
        />

        <div className="flex justify-between items-center">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-400"
          >
            Password
          </label>

          <div className="flex items-center gap-1">
            <EyeOff size={18} color="gray" strokeWidth="3px" />
            <span className="text-sm text-gray-500 cursor-pointer mr-2">
              hide
            </span>
          </div>
        </div>

        <input
          type="password"
          id="password"
          name="password"
          className="border border-gray-300 rounded-4xl px-3 py-2"
          required
        />

        <a href="#" className="text-sm text-black-500 underline">
          Reset Password
        </a>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-4xl px-4 py-2"
        >
          Login
        </button>

        <div className="flex items-center gap-4 my-4 text-gray-500 text-sm">
          <div className="flex-1 border-t"></div>
          OR
          <div className="flex-1 border-t"></div>
        </div>

        <button
          className="flex justify-center items-center gap-2 border border-black text-black rounded-4xl px-4 py-2"
          type="button"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <button
          className="flex justify-center items-center gap-2 bg-gray-800 text-white rounded-4xl px-4 py-2"
          type="button"
        >
          <FaGithub size={20} />
          Continue with GitHub
        </button>

        <p className="text-xs text-gray-500 mt-4">
          By continuing, you agree to the{" "}
          <span className="underline">Terms of use</span> and{" "}
          <span className="underline">Privacy Policy</span>.
        </p>
      </form>);
}
