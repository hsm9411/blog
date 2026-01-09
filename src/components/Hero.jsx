import React from 'react';

function Hero() {
  return (
    <section id="hero">
      <div className="hero-container">
        
        {/* 1. 텍스트 영역 (div로 감싸서 Flex 아이템 1번이 됨) */}
        <div className="hero-text">
          <h1>안녕하세요,<br />개발자 하성민입니다.</h1>
          <p>
            최근에는 <strong>웹개발</strong>과 <strong>시스템 개발</strong>에 필요한 기능을 구현하기 위해<br />
            다양한 <strong>CS 개념</strong>과 <strong>기술</strong>들에 관심을 가지고 학습하고 있습니다.
            <br /><br />
            또한, 효율적인 <strong>협업</strong>을 위해 필요한 툴과 기술,<br />
            그리고 <strong>개발 프로세스 체계</strong>를 경험하며 성장하고 있습니다.
          </p>
        </div>

        {/* 2. 이미지 영역 (div로 감싸서 Flex 아이템 2번이 됨) */}
        <div className="profile-img-wrapper">
          <img 
            src={`${import.meta.env.BASE_URL}profile.png`} 
            alt="Profile" 
            className="profile-img" 
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;