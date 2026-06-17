import React from 'react';
import LessonCard from './LessonCard';

export default function CourseDetail({ course }) {
  if (!course) {
    return (
      <div className="course-detail course-detail--empty" dir="rtl">
        <p>لم يتم العثور على الدورة المطلوبة</p>
      </div>
    );
  }

  const totalLessons = course.lessons.length;
  const progressPercent = 0; // Mock data: 0% progress for now

  // Calculate total duration
  const totalDuration = course.lessons.reduce((total, lesson) => {
    const parts = lesson.duration.split(':');
    const minutes = parseInt(parts[0], 10) || 0;
    const seconds = parseInt(parts[1], 10) || 0;
    return total + minutes * 60 + seconds;
  }, 0);

  const totalMinutes = Math.floor(totalDuration / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  const durationDisplay = totalHours > 0
    ? `${totalHours} ساعة و ${remainingMinutes} دقيقة`
    : `${totalMinutes} دقيقة`;

  return (
    <div className="course-detail" dir="rtl">
      <div className="course-header glass-panel">
        <div className="course-header__top">
          <div className="course-header__badges">
            <span className="course-header__badge course-header__badge--level">
              {course.levelName}
            </span>
            <span className="course-header__badge course-header__badge--grade">
              {course.grade}
            </span>
            <span className="course-header__badge course-header__badge--subject">
              {course.subject}
            </span>
          </div>
        </div>

        <h1 className="course-header__title">{course.title}</h1>
        <p className="course-header__description">{course.description}</p>

        <div className="course-header__stats">
          <div className="course-header__stat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span>{totalLessons} درس</span>
          </div>
          <div className="course-header__stat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{durationDisplay}</span>
          </div>
          <div className="course-header__stat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>{progressPercent}% مكتمل</span>
          </div>
        </div>

        <div className="course-header__progress">
          <div className="course-header__progress-bar">
            <div
              className="course-header__progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="course-header__progress-label">
            {progressPercent === 0
              ? 'لم تبدأ بعد'
              : `${progressPercent}% مكتمل`}
          </span>
        </div>
      </div>

      <div className="lessons-list">
        <h2 className="lessons-list__title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          الدروس ({totalLessons})
        </h2>

        <div className="lessons-list__items">
          {course.lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              courseId={course.id}
              isActive={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
