import React from 'react';
import { getSubjectCount } from '../../../data/curriculum';

const levelData = [
  {
    id: 'primary',
    name: 'ابتدائي',
    grades: 'الصف الأول - السادس',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="13" y2="11" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #ff4757 0%, #ff6b81 100%)',
    glowColor: 'rgba(255, 71, 87, 0.3)'
  },
  {
    id: 'middle',
    name: 'متوسط',
    grades: 'الصف الأول - الثالث',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
        <line x1="9" y1="7" x2="15" y2="7" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #00d2d3 0%, #54e4e5 100%)',
    glowColor: 'rgba(0, 210, 211, 0.3)'
  },
  {
    id: 'secondary',
    name: 'ثانوي',
    grades: 'الصف الأول - الثالث',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #ffa502 0%, #ffbe76 100%)',
    glowColor: 'rgba(255, 165, 2, 0.3)'
  }
];

export default function LevelSelector({ onSelectLevel, selectedLevel }) {
  return (
    <div className="level-selector" dir="rtl">
      <h2 className="level-selector__title">اختر المرحلة الدراسية</h2>
      <p className="level-selector__subtitle">ابدأ رحلتك التعليمية باختيار المرحلة المناسبة</p>

      <div className="level-selector__grid">
        {levelData.map((level) => {
          const subjectCount = getSubjectCount(level.id);
          const isActive = selectedLevel === level.id;

          return (
            <button
              key={level.id}
              className={`level-card${isActive ? ' level-card--active' : ''}`}
              onClick={() => onSelectLevel(level.id)}
              style={{
                '--card-gradient': level.gradient,
                '--card-glow': level.glowColor
              }}
            >
              <div className="level-card__icon-wrapper">
                <div className="level-card__icon" style={{ color: level.glowColor.replace('0.3', '1') }}>
                  {level.icon}
                </div>
              </div>

              <h3 className="level-card__name">{level.name}</h3>

              <div className="level-card__info">
                <span className="level-card__subjects">
                  {subjectCount} مادة دراسية
                </span>
                <span className="level-card__grades">{level.grades}</span>
              </div>

              {isActive && (
                <div className="level-card__check">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
