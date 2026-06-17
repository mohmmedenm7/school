import React from 'react';
import { Link } from 'react-router';
import { curriculum, getCoursesForLevel } from '../../../data/curriculum';

const subjectIcons = {
  math: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  ),
  science: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6v7l4 8H5l4-8V3z" />
      <line x1="10" y1="1" x2="14" y2="1" />
      <circle cx="12" cy="16" r="1" />
      <circle cx="10" cy="14" r="0.5" />
    </svg>
  ),
  arabic: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h8M8 11h6M8 15h4" />
    </svg>
  ),
  english: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  physics: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  ),
  chemistry: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6v7l4 8a2 2 0 0 1-1.8 3H6.8A2 2 0 0 1 5 18l4-8V3z" />
      <line x1="10" y1="1" x2="14" y2="1" />
      <path d="M8.5 14h7" />
    </svg>
  )
};

export default function SubjectGrid({ level }) {
  const levelData = curriculum[level];

  if (!levelData) {
    return (
      <div className="subject-grid subject-grid--empty" dir="rtl">
        <p>اختر مرحلة دراسية لعرض المواد المتاحة</p>
      </div>
    );
  }

  const subjects = levelData.subjects;

  return (
    <div className="subject-grid" dir="rtl">
      <h2 className="subject-grid__title">
        المواد الدراسية - {levelData.name}
      </h2>

      <div className="subject-grid__cards">
        {subjects.map((subject) => {
          const totalCourses = subject.courses.length;
          const totalLessons = subject.courses.reduce(
            (sum, course) => sum + course.lessons.length,
            0
          );

          return (
            <div
              key={subject.id}
              className="subject-card"
              style={{ '--subject-color': subject.color }}
            >
              <div className="subject-card__icon">
                {subjectIcons[subject.id] || <span className="subject-card__emoji">{subject.icon}</span>}
              </div>

              <h3 className="subject-card__name">{subject.name}</h3>

              <div className="subject-card__stats">
                <span className="subject-card__stat">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                  {totalCourses} دورة
                </span>
                <span className="subject-card__stat">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  {totalLessons} درس
                </span>
              </div>

              <div className="subject-card__courses">
                {subject.courses.map((course) => (
                  <Link
                    key={course.id}
                    to={`/courses/${course.id}`}
                    className="subject-card__course-link"
                  >
                    <span className="subject-card__course-title">{course.title}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
