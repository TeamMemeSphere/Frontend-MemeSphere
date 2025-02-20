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
  const { nickname, checkNicknameAvailability, nicknameCheckMessage, isNicknameChecked, setIsNicknameChecked, birthDate, handleBlur, handleChange } = useFormValidation();

  const defaultProfileImage = "https://umc-meme.s3.ap-northeast-2.amazonaws.com/defaultimage.png";
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [useDefaultImage, setUseDefaultImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const uploadData = await getPresignedUrl(file);

      if (uploadData && uploadData.presignedUrl && uploadData.imageUrl) {
        const uploadSuccess = await uploadImage(file, uploadData.presignedUrl);
        if (uploadSuccess) {
          setProfileImage(uploadData.imageUrl);
          setUseDefaultImage(false);
        }
      }
    }
  };

  // 프로필 이미지를 presigned url로 요청
  const getPresignedUrl = async (file: File) => {
    try {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (!fileExtension || !["jpg", "jpeg", "png"].includes(fileExtension)) {
        throw new Error("지원되지 않는 파일입니다.");
      }

      const response = await fetch(API_ENDPOINTS.USER_IMAGE, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({extension: fileExtension}),
      });

      const data = await response.json();

      return {
        presignedUrl: data.result.presignedUrl,
        imageUrl: data.result.imageUrl,
      };
    } catch (error) {
      console.error("Presigned Url 요청 실패:", error);
      return null;
    }
  };

  // s3에 이미지 업로드 요청
  const uploadImage = async (file: File, presignedUrl: string) => {
  try {
    const response = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`이미지 업로드 실패: ${response.status} ${response.statusText}`);
    }
    return true; 
  } catch (error) {
    console.error("이미지 업로드 오류:", error);
    return false;
  }
  };

  const handleProfileClick = (event: React.MouseEvent<Element>) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCheckboxChange = () => {
    setUseDefaultImage((prev) => {
    const newState = !prev;
    if (newState) {
      setProfileImage(null);
    }
    return newState;
  });
  };

  const handleCheckNickname = async() => {
    await checkNicknameAvailability();
    setIsNicknameChecked(true);
  };

  async function handleSignup(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitted(true);

    if (!profileImage) {
      setUseDefaultImage(true);
    }
    if (!nickname.value || !birthDate.value || !isNicknameChecked ) {
      return;
    }

    try {
      const formData = {
        email, password, nickname: nickname.value, birth: String(birthDate.value), profileImage: profileImage || defaultProfileImage,
      };
      if (!useDefaultImage && profileImage) {
        formData.profileImage = profileImage;
      }

      const response = await fetch(API_ENDPOINTS.USER_SIGNUP, {
        method:"POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(formData),
      });

      const data = await response.json();
    
      if (response.ok) {
        alert("회원가입이 완료되었습니다. 로그인 창으로 이동합니다.");
        onSuccess?.();
    } else {
      console.error("회원가입 실패:", data);
      alert(`회원가입 실패: ${data.message || "알 수 없는 오류로 회원가입에 실패했습니다. 다시 시도해주세요."}`);
    }
  } catch (error) {
    console.error("회원가입 요청 오류:", error);
    alert("네트워크 오류로 회원가입에 실패했습니다. 다시 시도해주세요.");
      }
  }

  return (
    <ProfileSetupContainer>
    <FormContainer>
      <Form onSubmit={handleSignup}>

        <InputContainer>
          <Label>프로필 사진</Label>
          <ProfileImage 
            src={useDefaultImage ? defaultProfileImage : profileImage || defaultProfileImage} 
            alt="Profile" 
            onClick={handleProfileClick} />
          <ImageButton onClick={handleProfileClick}>이미지 불러오기</ImageButton>
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
              onChange={(e) => handleChange("nickName", e.target.value)}
              onBlur={() => handleBlur("nickName")}
              $hasError={isSubmitted && (!nickname.value || (!isNicknameChecked && nicknameCheckMessage !== "사용 가능한 닉네임입니다."))}
              isAvailable={nicknameCheckMessage === "사용 가능한 닉네임입니다." ? true : undefined} />
            <NicknameConfirmButton type="button" onClick={handleCheckNickname}>중복 확인</NicknameConfirmButton>
          </NicknameInputContainer>
          {isSubmitted && !isNicknameChecked && nickname.value && (
            <ErrorMessage>닉네임 중복 확인을 진행해주세요.</ErrorMessage>
          )}
          {nickname.value && nicknameCheckMessage && (
            <ErrorMessage isAvailable={nicknameCheckMessage === "사용 가능한 닉네임입니다."}>
              {nicknameCheckMessage}</ErrorMessage>
          )}
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
          {isSubmitted && (!birthDate.value || !!birthDate.error) && <ErrorMessage>생년월일 형식이 잘못되었습니다.</ErrorMessage>}
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
  gap: 1rem;
`;

const NicknameStyledInput = styled(StyledInput)`
  width: 17.313rem;
`;

const NicknameConfirmButton = styled(Button)`
  cursor: pointer;
  background-color: rgba(225, 225, 225, 0.05);
  border: 0.094rem solid var(--purple);
  width: 6rem;

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
  width: 9,313rem;
  height: 8.75rem;
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
  width: 1rem;
  height: 1rem;
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
  margin-left: 0.313rem;
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
