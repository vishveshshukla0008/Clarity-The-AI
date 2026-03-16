import React from "react";
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
import { useSelector } from "react-redux";
import AuthLoader from "../components/authLoader";

const schema = z.object({
  fullname: z
    .string()
    .min(3, "Fullname must be 3 characters long")
    .max(20, "Fullname must be less than 20 characters long !"),
  username: z
    .string()
    .min(3, "Username must be 3 characters long")
    .max(50, "Username must be less than 50 characters long !"),
  email: z.string().email("Enter valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be less than 16 characters"),
});

const Signup = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      fullname: "",
    },
  });

  const onSubmit = async (data) => {
    const res = await handleRegister(data);
    if (res?.success) {
      navigate("/verify-email", {
        state: {
          emailSent: true,
          email: res.user.email,
        },
      });
    }
  };

  if (loading) return <AuthLoader />;

  if (user) return <Navigate to={"/"} />;

  return (
    <div className="relative min-h-full w-full flex justify-center py-10">
      <div className="absolute inset-0 brightness-50 bg-[url('/images/scene.jpg')] bg-cover bg-center blur-xs"></div>

      <div className="relative z-10 h-fit w-[90%]  md:w-[70%] lg:w-1/3 flex flex-col gap-4 items-center bg-[#020206] shadow-sm shadow-gray-600  px-6 py-4 rounded-xl">
        {/* TEXT PART (unchanged) */}
        <div className="upper-text w-full flex flex-col pt-5 gap-4 items-center">
          <h1 className="text-3xl">Clarity</h1>
          <h1 className="font-medium text-4xl">Welcome</h1>
          <p>Signup to access the features</p>
        </div>

        {/* FORM */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-6">
          <FieldGroup>
            <Controller
              name="fullname"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Full Name</FieldLabel>

                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter your full name"
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
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>

                  <Input
                    {...field}
                    type="email"
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
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Username</FieldLabel>

                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter username"
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

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
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
              Signup
            </Button>
          </div>
        </form>

        <div className="links w-full flex flex-col items-center gap-3 mt-5">
          <p>
            <Link to="/forget-password">Forget Password</Link>
          </p>

          <p className="text-gray-400">
            Already have an account ?{" "}
            <Link className="text-green-500" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
