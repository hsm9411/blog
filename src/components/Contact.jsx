// src/components/Contact.jsx
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("메일을 전송 중입니다...");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("❌ 설정 오류: 환경 변수를 확인해주세요.");
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, form.current, { publicKey: publicKey })
      .then(
        () => {
          setStatus("✅ 성공적으로 메일이 발송되었습니다!");
          e.target.reset();
        },
        (error) => {
          console.error('FAILED...', error.text);
          setStatus("❌ 전송 실패. 다시 시도해주세요.");
        }
      );
  };

  return (
    <section id="contact" className="section-wrapper">
      <div className="container">
        <h2>Contact</h2>
        <p className="contact-desc">
          궁금한 점이 있으시거나 협업 제안은 언제든 환영합니다.
        </p>

        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <div className="form-group">
            <input type="text" name="user_name" placeholder="이름 (Name)" required />
          </div>
          <div className="form-group">
            <input type="email" name="user_email" placeholder="이메일 (Email)" required />
          </div>
          <div className="form-group">
            <textarea name="message" placeholder="내용을 입력해주세요 (Message)" required />
          </div>
          <button type="submit" className="btn-send">메일 보내기</button>
        </form>

        {status && <p className="status-msg">{status}</p>}
      </div>
    </section>
  );
}

export default Contact;