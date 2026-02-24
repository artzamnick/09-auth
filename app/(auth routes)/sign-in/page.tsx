"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { login } from "@/lib/api/clientApi";
import { useLogin } from "@/lib/store/authStore";

import css from "./page.module.css";

const Schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Min 6 characters").required("Required"),
});

export default function SignInPage() {
  const router = useRouter();
  const setUser = useLogin((s) => s.setUser);
  const [serverError, setServerError] = useState("");

  return (
    <main className={css.mainContent}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Schema}
        onSubmit={async (values, helpers) => {
          setServerError("");

          try {
            const user = await login(values);
            setUser(user);
            router.push("/profile");
          } catch {
            setServerError("Login failed");
          } finally {
            helpers.setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={css.form}>
            <h1 className={css.formTitle}>Sign In</h1>

            <div className={css.formGroup}>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                className={css.input}
              />
              {touched.email && errors.email && (
                <p className={css.error}>{errors.email}</p>
              )}
            </div>

            <div className={css.formGroup}>
              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                className={css.input}
              />
              {touched.password && errors.password && (
                <p className={css.error}>{errors.password}</p>
              )}
            </div>

            <div className={css.actions}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={css.submitButton}
              >
                Log in
              </button>
            </div>

            {serverError && (
              <p className={css.error}>{serverError}</p>
            )}
          </Form>
        )}
      </Formik>
    </main>
  );
}