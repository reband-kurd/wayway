"use client";
import Head from "next/head";
import Link from "next/link";
import Meteors from "../compuntents/Meteors";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import React from "react";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
        <Link href="/QuizPage">
          {" "}
          <Meteors number={30} />
          <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-300">
            <div className="text-center">
              <button>
                <h1
                  className="text-4xl font-bold text-gray-900"
                  style={{ fontFamily: '"Homemade Apple", cursive' }}
                >
                  Global Quiz
                </h1>

                <p className="mt-2 text-center text-sm text-gray-600">
                  This is the general quiz category.
                </p>
              </button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
