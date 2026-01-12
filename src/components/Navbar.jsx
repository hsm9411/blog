import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

function Navbar() {
  // [1] 초기 테마 상태 설정 로직 (우선순위 적용)
  const [theme, setTheme] = useState(() => {
    // 1순위: 사용자가 이전에 버튼을 눌러 저장된 설정이 있는지 확인
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme; // 'dark' 또는 'light'
    }

    // 2순위: 저장된 게 없다면, 시스템(OS) 설정을 확인
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    // 3순위: 둘 다 아니면 기본값은 라이트모드
    return 'light';
  });

  // [2] 테마가 바뀔 때마다 HTML 태그에 클래스 적용 & 저장
  useEffect(() => {
    // html 태그 가져오기
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // 변경된 사항을 로컬 스토리지에 저장 (다음 방문 기억)
    localStorage.setItem('theme', theme);
  }, [theme]);

  // [3] 토글 핸들러
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* 클릭 시 최상단으로 이동 */}
        <a href="#hero" className="logo">Portfolio</a>
        
        <div className="nav-right">
          {/* 네비게이션 링크들 */}
          <ul className="nav-links">
            <li><a href="#about">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          {/* 다크모드 토글 버튼 */}
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            title={theme === 'light' ? "다크모드로 전환" : "라이트모드로 전환"}
          >
            {/* 라이트모드일 땐 달(Moon), 다크모드일 땐 해(Sun) 아이콘 */}
            {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;