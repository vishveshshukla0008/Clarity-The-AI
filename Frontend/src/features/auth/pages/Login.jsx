import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Eye } from "lucide-react";
import { useSelector } from "react-redux";
import AuthLoader from "../components/authLoader";

const schema = z.object({
  email: z.string().email("Enter valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be less than 16 characters"),
});

const Login = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const { handleLogin } = useAuth();

  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    await handleLogin(data);
    navigate("/");
  };

  if (loading) return <AuthLoader />;

  return !loading && user ? (
    <Navigate to="/" />
  ) : (
    <div className="relative min-h-screen  w-full flex justify-center pt-15 pb-10">
      <div className="absolute inset-0 brightness-50 bg-[url('/images/dark2.jpg')] bg-cover bg-center blur-xs"></div>

      <div className="relative z-10 w-[90%] inset-0 md:w-[70%] lg:w-1/3 flex flex-col gap-4 items-center bg-black shadow-sm shadow-gray-600  px-6 py-4 rounded-xl">
        {/* TEXT PART (unchanged) */}
        <div className="upper-text w-full flex flex-col pt-5 gap-4 items-center">
          <h1 className="text-3xl">Clarity</h1>
          <h1 className="font-medium text-4xl">Welcome</h1>
          <p>Log in to continue to Clarity</p>
        </div>

        {/* FORM */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-6">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>

                  <Input
                    {...field}
                    placeholder="Enter your email"
                    className={`py-3 h-10  ${
                      fieldState.invalid
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="relative" data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>

                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter password"
                    className={` py-3 h-10 ${
                      fieldState.invalid
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="mt-6 w-full">
            <Button type="submit" className="w-full cursor-pointer">
              Login
            </Button>
          </div>
        </form>

        <div className="links w-full flex flex-col items-center gap-3 mt-5">
          <p>
            <Link to="/forget-password">Forget Password</Link>
          </p>

          <p className="text-gray-400">
            No have an account ?{" "}
            <Link className="text-green-500" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
