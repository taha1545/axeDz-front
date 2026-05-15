export default function LoginAside() {
  return (<aside className="w-full lg:w-1/2 px-6 sm:px-10 lg:px-20 py-10 flex flex-col justify-arround gap-7">
        <h2 className="text-sky-500 font-bold text-2xl">AxeDz</h2>

        <h2 className="text-3xl font-bold">Create an account</h2>

        <ul className="list-disc list-inside text-gray-500 py-4 space-y-3">
          <li>
            Start building with AxeDz in minutes. Create your account to access
            a unified platform for SMS, Email, and Cloud Storage APIs — all in
            one place.
          </li>

          <li>
            Set up your workspace, generate your API keys, and begin integrating
            powerful communication tools into your applications with ease.
          </li>

          <li>
            No complex setup, no external payment barriers — everything is
            designed for developers in Algeria, with local billing in DZD.
          </li>

          <li>
            Join a growing ecosystem of developers and teams building scalable,
            reliable digital products across the country.
          </li>
        </ul>

        <button
          className="bg-gray-800 text-white rounded-4xl px-4 py-2"
          type="button"
        >
          Create Account
        </button>
      </aside>);
}