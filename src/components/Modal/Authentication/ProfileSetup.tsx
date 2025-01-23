import React from "react";

interface ProfileSetupProps {
  onStart: () => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onStart }) => {
  return (
    <div>
      <h2>프로필 설정</h2>
      <p>프로필 사진, 닉네임, 생년월일을 설정하세요.</p>
      <button onClick={onStart}>시작하기</button>
    </div>
  );
};

export default ProfileSetup;
