import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useFormValidation } from "./FormValidation"; 
import { ErrorMessage, Form, FormContainer, InputContainer, Label, StyledInput, Button, Input } from "./SharedAuthenticationStyles";

interface ProfileSetupProps {
  onStart: () => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onStart }) => {
  const { nickname, birthDate, handleBlur, handleChange } = useFormValidation();

  const defaultProfileImage = "../../../../public/assets/common/autentication/ProfileImage.svg";
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [useDefaultImage, setUseDefaultImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
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
      setProfileImage(defaultProfileImage);
    }
  };

  return (
    <ProfileSetupContainer>
    <FormContainer>
      <Form>
        <InputContainer>
          <Label>프로필 사진</Label>
          <ProfileImage src={profileImage} alt="Profile" onClick={handleProfileClick} />
          <ImageButton onClick={handleProfileClick}>이미지 불러오기 {">"} </ImageButton>
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
              hasError={!!nickname.error} />
            <NicknameConfirmButton type="button">중복 확인</NicknameConfirmButton>
          </NicknameInputContainer>
        </InputContainer>

        <InputContainer>     
          <Label>생년월일</Label>
          <StyledInput
            type="text"
            placeholder="YYYYMMDD"
            value={birthDate.value}
            onChange={(e) => handleChange("birthDate", e.target.value)}
            onBlur={() => handleBlur("birthDate")}
            hasError={!!birthDate.error} />
          {birthDate.error && <ErrorMessage>생년월일 형식이 잘못되었습니다.</ErrorMessage>}
          <Button onClick={onStart}>시작하기</Button>
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