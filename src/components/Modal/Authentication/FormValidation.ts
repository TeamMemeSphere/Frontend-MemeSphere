// 유효성 검사 조건만 설정하는 곳. 에러 메시지는 해당 파일에서 수정.
import { useState } from "react";

type Field = "email" | "password" | "profile" | "nickname" | "birthDate" ;

interface ValidationState {
  value: string;
  error: string;
}

interface BooleanValidationState {
  value: string;
  error: boolean;
}

interface ValidationMessages {
  emailInvalid?: string;
  passwordInvalid?: string;
  nicknameInvalid?: string;
  birthDateInvalid?: string;
}
 
export const useFormValidation = (messages?: ValidationMessages) => {
  const [email, setEmail] = useState<ValidationState>({ value: "", error: "" });
  const [password, setPassword] = useState<ValidationState>({ value: "", error: "" });
  const [profile, setProfile] = useState<ValidationState>({ value: "", error: ""});
  const [nickname, setNickname] = useState<ValidationState>({ value: "", error: "" });
  const [birthDate, setBirthDate] = useState<ValidationState>({ value: "", error: ""});


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

  const validateNickname = (nickname: string): boolean => {
    return nickname.length > 0; //닉네임이 비어있지 않은지 확인
  };

  const validateBirthDate = (birthDate: string): boolean => {
    const birthDateRegex = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;
    if (!birthDateRegex.test(birthDate)) return false;
  
    const year = parseInt(birthDate.slice(0, 4), 10);
    const month = parseInt(birthDate.slice(4, 6), 10);
    const day = parseInt(birthDate.slice(6, 8), 10);

    // 19000101부터 현재날짜까지
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;

    const date = new Date(year, month - 1, day); 
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
      return false;
    }
  
    return true;
  };
  

  const handleBlur = (field: Field) => {
    if (field === "email") {
      const error = validateEmail(email.value);
      setEmail({ ...email, error });
    } else if (field === "password") {
      const error = validatePassword(password.value);
      setPassword({ ...password, error });
    } else if (field === "profile") {
      setProfile({...profile, error: false });
    } else if (field === "nickname") {
      const error = !validateNickname(nickname.value);
      setNickname({...nickname, error});
    } else if (field === "birthDate") {
      const error = !validateBirthDate(birthDate.value);
      setBirthDate({...birthDate, error});
    }
  };

  const handleChange = (field: Field, value: string) => {
    if (field === "email") {
      setEmail({ ...email, value });
    } else if (field === "password") {
      setPassword({ ...password, value });
    } else if (field === "profile") {
      setProfile({...profile, value});
    } else if (field === "nickname") {
      setNickname({ ...nickname, value});
    } else if (field === "birthDate") {
      setBirthDate({ ...birthDate, value});
    }
  };

  return {
    email,
    password,
    profile,
    nickname,
    birthDate,
    handleBlur,
    handleChange,
  };
};
