import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useFormValidation } from "./FormValidation"; 
import { ErrorMessage, Form, FormContainer, InputContainer, Label, StyledInput, Button } from "./SharedAuthenticationStyles";
import { API_ENDPOINTS } from "../../../api/api";

interface SignupProps {
  email: string;
  password: string;
  onSuccess?: () => void;
}

const ProfileSetup: React.FC<SignupProps> = ({email, password, onSuccess}) => {
  const { nickname, checkNicknameAvailability, nicknameCheckMessage, isNicknameChecked, birthDate, handleBlur, handleChange } = useFormValidation();

  const defaultProfileImage = "/assets/common/autentication/ProfileImage.svg";
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [useDefaultImage, setUseDefaultImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSignup(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitted(true);

    // 프로필 사진을 설정하지 않으면 '프로필 사진 없이 이용하기' 체크가 활성화됨
    if (!profileImage) {
      setUseDefaultImage(true);
    }
    if (!nickname.value || !birthDate.value) {
      return;
    }
    if (!isNicknameChecked) {
      return;
    }

    try{
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      if (!useDefaultImage && profileImage) {
        formData.append("profile", profileImage);
      }
      formData.append("nickname", nickname.value);
      formData.append("birth", birthDate.value);
      
      console.log("📡 백엔드로 보낼 데이터:");
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      
      const response = await fetch(API_ENDPOINTS.USER_SIGNUP, {
        method:"POST",
        body: formData,
      });
      const data = await response.json();
      console.log("백엔드 응답:", data);
  
      if (response.ok) {
        console.log("회원가입 성공:", data);
        if (onSuccess) onSuccess();
      } else {
        console.error("회원가입 실패:", data);
        alert(`회원가입 실패: ${data.message || "알 수 없는 오류로 회원가입에 실패했습니다. 다시 시도해주세요."}`);
      }
    } catch (error) {
      console.error("회원가입 요청 오류:", error);
      alert("네트워크 오류로 회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfileImage(file);
      setUseDefaultImage(false);
    }
  };

  const handleProfileClick = (event: React.MouseEvent<Element>) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCheckboxChange = () => {
    setUseDefaultImage((prev) => !prev);
    if (!useDefaultImage) {
      setProfileImage(null);
    }
  };

  const handleCheckNickname = async() => {
    await checkNicknameAvailability();
  };

  return (
    <ProfileSetupContainer>
    <FormContainer>
      <Form onSubmit={handleSignup}>

        <InputContainer>
          <Label>프로필 사진</Label>
          <ProfileImage 
            src={profileImage ? URL.createObjectURL(profileImage) : defaultProfileImage} 
            alt="Profile" 
            onClick={handleProfileClick} />
          <ImageButton onClick={handleProfileClick}>이미지 불러오기 </ImageButton>
          <HiddenFileInput
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload} />
          <CheckboxContainer>
            <Check
              type="checkbox"
              checked={useDefaultImage}
              onChange={handleCheckboxChange}
            />
            <CheckboxLabel>프로필 사진 없이 이용하기</CheckboxLabel>
          </CheckboxContainer>
        </InputContainer>

        <InputContainer>
          <Label>닉네임</Label>
          <NicknameInputContainer>
            <NicknameStyledInput 
              type="text"
              placeholder="닉네임을 입력해주세요."
              value={nickname.value}
              onChange={(e) => handleChange("nickname", e.target.value)}
              onBlur={() => handleBlur("nickname")}
              $hasError={isSubmitted && (!nickname.value || (!isNicknameChecked && nicknameCheckMessage !== "사용 가능한 닉네임입니다."))}
              isAvailable={nicknameCheckMessage === "사용 가능한 닉네임입니다." ? true : undefined} />
            <NicknameConfirmButton type="button" onClick={handleCheckNickname}>중복 확인</NicknameConfirmButton>
          </NicknameInputContainer>
          {isSubmitted && nickname.value && (!isNicknameChecked || nicknameCheckMessage) 
          && (<ErrorMessage isAvailable={nicknameCheckMessage === "사용 가능한 닉네임입니다."}>{isNicknameChecked ? nicknameCheckMessage : "중복 확인을 진행해주세요"}</ErrorMessage>)}
        </InputContainer>

        <InputContainer>     
          <Label>생년월일</Label>
          <StyledInput
            type="text"
            placeholder="YYYYMMDD"
            value={birthDate.value}
            onChange={(e) => handleChange("birthDate", e.target.value)}
            onBlur={() => handleBlur("birthDate")}
            $hasError={isSubmitted && (!birthDate.value || !!birthDate.error)} />
          {isSubmitted && !birthDate.value && !!birthDate.error && <ErrorMessage>생년월일 형식이 잘못되었습니다.</ErrorMessage>}
          <Button type="submit">시작하기</Button>
        </InputContainer>
      </Form>
    </FormContainer>
    </ProfileSetupContainer>
  );
};

export default ProfileSetup;

const NicknameInputContainer = styled(InputContainer)`
  display: flex;   
  flex-direction: row;
  gap: 16px;
`;

const NicknameStyledInput = styled(StyledInput)`
  width: 277px;
`;

const NicknameConfirmButton = styled(Button)`
  cursor: pointer;
  background-color: rgba(225, 225, 225, 0.05);
  border: 0.094rem solid var(--purple);
  width: 96px;

  margin: 0;
  padding: 0;
  line-height: 3.563rem;

  color: var(--purple);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  display: inline-block;
`;


const ProfileSetupContainer = styled.div`
`;

const ProfileImage = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 1px solid var(--grey-10);
  object-fit: cover;
  object-position: center;

  margin: 0 auto;
  display: block;
  cursor: pointer;
`;

const HiddenFileInput = styled.input`
  display: none; // 파일 입력 요소 숨기기
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Check = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  background-color: transparent;
  border: 1px solid rgba(225, 225, 225, 0.1);
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;

  &:checked {
    background-color: var(--purple);
  }
`;

const CheckboxLabel = styled.span`
  margin-left: 5px;
  color: rgba(225, 225, 225, 0.3);
  font-size: var(--font-size-small-caption);
`;

const ImageButton = styled(Button)`
  cursor: pointer;
  background-color: rgba(225, 225, 225, 0.05);
  border: 0.094rem solid var(--purple);
  
  padding: 0;
  line-height: 3.563rem;

  color: var(--purple);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
`;