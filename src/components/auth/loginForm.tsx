import { useState } from "react";
import { loginUser } from "../utils/auth";

interface LoginFormProps {
  onLoginSuccess: () => void;
  onSignup: () => void;
}

export default function LoginForm({
  onLoginSuccess,
  onSignup,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    const result = loginUser(
      email,
      password
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    onLoginSuccess();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label
          className="
            mb-2
            block
            font-mono
            text-[10px]
            tracking-[0.16em]
            text-slate-500
          "
        >
          EMAIL ADDRESS
        </label>

        <input
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="operator@polaris.ai"
          className="
            h-12
            w-full
            rounded-lg
            border
            border-cyan-400/15
            bg-[#020913]
            px-4
            font-mono
            text-sm
            text-slate-200
            outline-none
            placeholder:text-slate-700
            transition
            focus:border-cyan-400/50
            focus:ring-1
            focus:ring-cyan-400/20
          "
        />
      </div>

      <div>
        <label
          className="
            mb-2
            block
            font-mono
            text-[10px]
            tracking-[0.16em]
            text-slate-500
          "
        >
          PASSWORD
        </label>

        <input
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          placeholder="Enter your password"
          className="
            h-12
            w-full
            rounded-lg
            border
            border-cyan-400/15
            bg-[#020913]
            px-4
            font-mono
            text-sm
            text-slate-200
            outline-none
            placeholder:text-slate-700
            transition
            focus:border-cyan-400/50
            focus:ring-1
            focus:ring-cyan-400/20
          "
        />
      </div>

      {error && (
        <div
          className="
            rounded-lg
            border
            border-red-400/20
            bg-red-400/[0.05]
            px-4
            py-3
            font-mono
            text-[10px]
            tracking-wide
            text-red-300
          "
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        className="
          flex
          h-12
          w-full
          items-center
          justify-center
          rounded-lg
          border
          border-cyan-400/40
          bg-cyan-400/[0.06]
          font-mono
          text-[11px]
          font-semibold
          tracking-[0.2em]
          text-cyan-300
          transition
          duration-200
          hover:border-cyan-300/70
          hover:bg-cyan-400/[0.1]
          hover:text-cyan-200
          hover:shadow-[0_0_25px_rgba(34,211,238,0.1)]
        "
      >
        LOGIN →
      </button>

      <div
        className="
          flex
          items-center
          justify-center
          gap-2
          pt-1
        "
      >
        <span
          className="
            font-mono
            text-[10px]
            text-slate-600
          "
        >
          NEW TO POLARIS?
        </span>

        <button
          type="button"
          onClick={onSignup}
          className="
            font-mono
            text-[10px]
            tracking-[0.12em]
            text-cyan-400
            transition
            hover:text-cyan-200
          "
        >
          CREATE ACCOUNT
        </button>
      </div>
    </form>
  );
}