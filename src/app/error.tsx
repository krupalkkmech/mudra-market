"use client";
import './globals.css';

import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <Head>
        <title>404 - Not Found</title>
      </Head>

      <div className="text-center">
        <div className="text-9xl font-bold mb-4 animate-bounce">404</div>
        <h1 className="text-4xl font-bold mb-2">Lost in Space</h1>
        <p className="text-xl text-gray-300 mb-8">
          You have reached the edge of the universe.
          <br />
          The page you requested could not be found.
        </p>
        <Link href="/">
          <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition transform hover:scale-105">
            <svg
              className="-ml-1 mr-3 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Return to Home
          </a>
        </Link>
      </div>
    </div>
  );
}
