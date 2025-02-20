// 유효성 검사 조건만 설정하는 곳. 에러 메시지는 해당 파일에서 수정.
import { useState } from "react";
import { API_ENDPOINTS } from "../../../api/api";

type Field = "email" | "password" | "passwordConfirm" | "profile" | "nickName" | "birthDate" ;

interface ValidationState {
  value: string;
  error: string;
}

interface ValidationMessages {
  emailInvalid?: string;
  passwordInvalid?: string;
  passwordConfirmInvalid?: string;
  nicknameInvalid?: string;
  nicknameTaken?: string;
  nicknameAvailable?: string;
  birthDateInvalid?: string;
}

export const useFormValidation = (messages?: ValidationMessages) => {
  const [email, setEmail] = useState<ValidationState>({ value: "", error: "" });
  const [password, setPassword] = useState<ValidationState>({ value: "", error: "" });
  const [passwordConfirm, setPasswordConfirm] = useState<ValidationState>({ value: "", error: "" });
  const [profile, setProfile] = useState<ValidationState>({ value: "", error: ""});
  const [nickname, setNickname] = useState<ValidationState>({ value: "", error: "" });
  const [nicknameCheckMessage, setNicknameCheckMessage] = useState<string>("");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [birthDate, setBirthDate] = useState<ValidationState>({ value: "", error: ""});

  // 이메일: 이메일 형식 확인
  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return messages?.emailInvalid || "아이디 형식 에러 메시지";
    }
    return "";
  };

  // 비밀번호:  7자 이상, 대문자 소문자 특수문자 중 2가지 조합
  const validatePassword = (password: string): string => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d|.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/;
    if (!passwordRegex.test(password)) {
      return messages?.passwordInvalid || "비밀번호 형식 에러 메시지";
    }
    return "";
  };
  const validatePasswordConfirm = (password: string, passwordConfirm: string) : string => {
    if (passwordConfirm !== password) {
      return messages?.passwordConfirmInvalid || "비밀번호가 일치하지 않습니다.";
    }
    return "";
  };

  // 닉네임: 공백이면 안됨
  const validateNickname = (nickname: string): string => {
    if (nickname.trim().length === 0){
      return messages?.nicknameInvalid || "닉네임을 입력해주세요." ;
    }
    return "";
  };
  // 닉네임: 중복 확인 (비동기)
  const checkNicknameAvailability = async () => {
    if (!nickname.value.trim()) {
      setNicknameCheckMessage("닉네임을 입력해주세요.");
      return;
    }
    try {
      const response = await fetch(API_ENDPOINTS.USER_SIGNUP_NICKNAME, {
        headers: {
          "Content-Type" : "application/json",
        },
        method: "POST",
        body: JSON.stringify({ nickname: nickname.value }),
      });

      if (!response) {
        setNicknameCheckMessage("닉네임 중복 확인 중 오류가 발생했습니다.");
        setIsNicknameChecked(false);
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setNicknameCheckMessage(data.result);
        setIsNicknameChecked(true);
      } else {
        setNicknameCheckMessage("닉네임 중복 확인 중 오류가 발생했습니다..");
        setIsNicknameChecked(false);
      } 
    } catch (error) {
      console.error("닉네임 중복 확인 api 호출 중 에러 발생:", error);
      setNicknameCheckMessage("닉네임 중복 확인 중 오류가 발생했습니다.");
      setIsNicknameChecked(false);
    }
  };

  // 생년월일: yyyymmdd형식으로 입력했는지, 19000101부터 현재날까지
  const validateBirthDate = (birthDate: string): string => {
    const birthDateRegex = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;
    if (!birthDateRegex.test(birthDate)) {
      return messages?.birthDateInvalid || "생년월일 8개의 숫자로 입력해주세요.";
    }
  
    const year = parseInt(birthDate.slice(0, 4), 10);
    const month = parseInt(birthDate.slice(4, 6), 10);
    const day = parseInt(birthDate.slice(6, 8), 10);

    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
      return messages?.birthDateInvalid || "유효한 연도를 입력해주세요.";
    }
    const date = new Date(year, month - 1, day); 
    if (date.getFullYear() !== year || date.getMonth() +1 !== month || date.getDate() !== day) {
      return messages?.birthDateInvalid || "올바른 날짜를 입력해주세요.";
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
    } else if (field === "passwordConfirm") {
      const error = validatePasswordConfirm(password.value, passwordConfirm.value);
      setPasswordConfirm({ ...passwordConfirm, error });
    } else if (field === "profile") {
      setProfile({...profile, error: "" });
    } else if (field === "nickName") {
      const error = validateNickname(nickname.value);
      setNickname({ ...nickname, error });
    } else if (field === "birthDate") {
      const error = validateBirthDate(birthDate.value);
      setBirthDate({ ...birthDate, error });
    }
  };

  const handleChange = (field: Field, value: string) => {
    if (field === "email") {
      const error = validateEmail(value);
      setEmail({ ...email, value, error });
    } else if (field === "password") {
      const error = validatePassword(value);
      setPassword({ ...password, value, error });
    } else if (field === "passwordConfirm") {
      const error = validatePasswordConfirm(password.value, value);
      setPasswordConfirm({ ...passwordConfirm, value, error });
    } else if (field === "profile") {
      setProfile({...profile, value});
    } else if (field === "nickName") {
      const error = validateNickname(value);
      setNickname({ ...nickname, value, error });
      setNicknameCheckMessage("");
    } else if (field === "birthDate") {
      const error = validateBirthDate(value);
      setBirthDate({ ...birthDate, value, error });
    }
  };

  return {
    email,
    password,
    passwordConfirm,
    profile,
    nickname,
    setNickname,
    nicknameCheckMessage,
    checkNicknameAvailability,
    isNicknameChecked,
    setIsNicknameChecked,
    birthDate,
    handleBlur,
    handleChange,
  };
};
