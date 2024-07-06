"use client";
import { FormEvent, useState } from "react";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const subscribeUser = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await fetch("/api/subscribeUser", {
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (res.ok) {
        setMessage("Thanks for subscribing!");
        setIsError(false);
        setEmail(""); // Limpiar el campo de entrada después de la suscripción
      } else {
        setMessage("There was an error. Please try again.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Error en la suscripción:", error);
      setMessage("There was an error. Please try again.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="2xl:mx-auto 2xl:container mx-4 py-16">
      <div className="w-full relative flex items-center justify-center">
        <div className="prose dark:prose-invert bg-opacity-80 md:my-16 lg:py-16 py-10 w-full md:mx-24 md:px-12 px-4 flex flex-col items-center justify-center relative z-40">
          <h1 className="text-4xl font-semibold leading-9 text-center text-gray-900 dark:text-white">
            Don't Miss Out!
          </h1>
          <p className="text-base leading-normal text-center text-gray-700 dark:text-gray-300 mt-6">
            Subscribe to our newsletter to stay updated. Our newsletter is sent
            once a week, every Friday, so subscribe to receive the latest news
            and updates.
          </p>
          <form
            onSubmit={subscribeUser}
            className="sm:border border-gray-300 dark:border-gray-600 flex-col sm:flex-row flex items-center w-full mt-12 space-y-4 sm:space-y-0"
          >
            <input
              type="email"
              value={email}
              className="border border-gray-300 dark:border-gray-600 sm:border-transparent text-base w-full font-medium leading-none text-gray-900 dark:text-white p-4 focus:outline-none bg-transparent placeholder-gray-600 dark:placeholder-gray-400"
              placeholder="Correo Electrónico"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className={`focus:outline-none focus:ring-offset-2 focus:ring-indigo-500 border border-gray-300 dark:border-gray-600 sm:border-transparent w-full sm:w-auto bg-gray-900 dark:bg-gray-700 text-white py-4 px-6 hover:bg-opacity-75 ${
                email === "" || isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={email === "" || isLoading}
            >
              {isLoading ? "Loading..." : "Subscribe"}
            </button>
          </form>
          {message && (
            <p
              className={`text-center text-base mt-4 ${
                isError
                  ? "text-red-600 dark:text-red-400"
                  : "text-green-600 dark:text-green-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
