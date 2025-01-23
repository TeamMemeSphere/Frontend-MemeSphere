import { useState } from "react";

type Field = "email" | "password";

interface ValidationState {
  value: string;
  error: string;
}

interface ValidationMessages {
  emailInvalid?: string;
  passwordInvalid?: string;
}
 
export const useFormValidation = (messages?: ValidationMessages) => {
  const [email, setEmail] = useState<ValidationState>({ value: "", error: "" });
  const [password, setPassword] = useState<ValidationState>({ value: "", error: "" });

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return messages?.emailInvalid || "아이디 형식 에러 메시지";
    }
    return "";
  };

  const validatePassword = (password: string): string => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d|.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/; // 8자 이상, 2가지 조합
    if (!passwordRegex.test(password)) {
      return messages?.passwordInvalid || "비밀번호 형식 에러 메시지";
    }
    return "";
  };

  const handleBlur = (field: Field) => {
    if (field === "email") {
      const error = validateEmail(email.value);
      setEmail({ ...email, error });
    } else if (field === "password") {
      const error = validatePassword(password.value);
      setPassword({ ...password, error });
    }
  };

  const handleChange = (field: Field, value: string) => {
    if (field === "email") {
      setEmail({ ...email, value });
    } else if (field === "password") {
      setPassword({ ...password, value });
    }
  };

  return {
    email,
    password,
    handleBlur,
    handleChange,
  };
};
