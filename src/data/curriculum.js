/**
 * Curriculum data for the stemschool educational platform.
 * Organized by education level, subject, and course.
 */

export const curriculum = {
  primary: {
    id: 'primary',
    name: 'ابتدائي',
    nameEn: 'Primary',
    grades: 'الصف الأول - السادس',
    gradeCount: 6,
    icon: 'book',
    subjects: [
      {
        id: 'math',
        name: 'رياضيات',
        nameEn: 'Math',
        color: '#ff4757',
        icon: '➗',
        courses: [
          {
            id: 'primary-math-1',
            title: 'رياضيات - الصف الأول',
            level: 'primary',
            levelName: 'ابتدائي',
            grade: 'الصف الأول',
            subject: 'رياضيات',
            description: 'تعلم أساسيات الأرقام والعمليات الحسابية البسيطة',
            lessons: [
              { id: 'pm1-l1', title: 'الأعداد من ١ إلى ١٠', playbackId: '', duration: '12:30', order: 1 },
              { id: 'pm1-l2', title: 'الجمع البسيط', playbackId: '', duration: '15:00', order: 2 },
              { id: 'pm1-l3', title: 'الطرح البسيط', playbackId: '', duration: '14:20', order: 3 },
              { id: 'pm1-l4', title: 'المقارنة بين الأعداد', playbackId: '', duration: '10:45', order: 4 }
            ]
          },
          {
            id: 'primary-math-2',
            title: 'رياضيات - الصف الثاني',
            level: 'primary',
            levelName: 'ابتدائي',
            grade: 'الصف الثاني',
            subject: 'رياضيات',
            description: 'الأعداد الأكبر وعمليات الجمع والطرح المتقدمة',
            lessons: [
              { id: 'pm2-l1', title: 'الأعداد حتى ١٠٠', playbackId: '', duration: '13:00', order: 1 },
              { id: 'pm2-l2', title: 'جمع الأعداد المكونة من رقمين', playbackId: '', duration: '16:30', order: 2 },
              { id: 'pm2-l3', title: 'الضرب - مفهوم أساسي', playbackId: '', duration: '18:00', order: 3 }
            ]
          }
        ]
      },
      {
        id: 'science',
        name: 'علوم',
        nameEn: 'Science',
        color: '#2ed573',
        icon: '🔬',
        courses: [
          {
            id: 'primary-science-1',
            title: 'علوم - الصف الأول',
            level: 'primary',
            levelName: 'ابتدائي',
            grade: 'الصف الأول',
            subject: 'علوم',
            description: 'اكتشاف العالم من حولنا - الحيوانات والنباتات',
            lessons: [
              { id: 'ps1-l1', title: 'الكائنات الحية وغير الحية', playbackId: '', duration: '11:00', order: 1 },
              { id: 'ps1-l2', title: 'أجزاء النبات', playbackId: '', duration: '13:45', order: 2 },
              { id: 'ps1-l3', title: 'الحواس الخمس', playbackId: '', duration: '12:15', order: 3 }
            ]
          }
        ]
      },
      {
        id: 'arabic',
        name: 'لغة عربية',
        nameEn: 'Arabic',
        color: '#ffa502',
        icon: '📖',
        courses: [
          {
            id: 'primary-arabic-1',
            title: 'لغة عربية - الصف الأول',
            level: 'primary',
            levelName: 'ابتدائي',
            grade: 'الصف الأول',
            subject: 'لغة عربية',
            description: 'تعلم الحروف العربية والقراءة الأساسية',
            lessons: [
              { id: 'pa1-l1', title: 'الحروف الهجائية - المجموعة الأولى', playbackId: '', duration: '10:00', order: 1 },
              { id: 'pa1-l2', title: 'الحروف الهجائية - المجموعة الثانية', playbackId: '', duration: '10:30', order: 2 },
              { id: 'pa1-l3', title: 'الحركات القصيرة', playbackId: '', duration: '12:00', order: 3 }
            ]
          }
        ]
      },
      {
        id: 'english',
        name: 'لغة إنجليزية',
        nameEn: 'English',
        color: '#1e90ff',
        icon: '🌐',
        courses: [
          {
            id: 'primary-english-1',
            title: 'لغة إنجليزية - الصف الأول',
            level: 'primary',
            levelName: 'ابتدائي',
            grade: 'الصف الأول',
            subject: 'لغة إنجليزية',
            description: 'Learn the English alphabet and basic words',
            lessons: [
              { id: 'pe1-l1', title: 'The Alphabet A-M', playbackId: '', duration: '11:00', order: 1 },
              { id: 'pe1-l2', title: 'The Alphabet N-Z', playbackId: '', duration: '11:30', order: 2 },
              { id: 'pe1-l3', title: 'Colors and Numbers', playbackId: '', duration: '13:00', order: 3 }
            ]
          }
        ]
      }
    ]
  },
  middle: {
    id: 'middle',
    name: 'متوسط',
    nameEn: 'Middle',
    grades: 'الصف الأول - الثالث',
    gradeCount: 3,
    icon: 'school',
    subjects: [
      {
        id: 'math',
        name: 'رياضيات',
        nameEn: 'Math',
        color: '#ff4757',
        icon: '➗',
        courses: [
          {
            id: 'middle-math-1',
            title: 'رياضيات - الصف الأول متوسط',
            level: 'middle',
            levelName: 'متوسط',
            grade: 'الصف الأول متوسط',
            subject: 'رياضيات',
            description: 'الجبر والهندسة الأساسية',
            lessons: [
              { id: 'mm1-l1', title: 'المتغيرات والتعابير الجبرية', playbackId: '', duration: '20:00', order: 1 },
              { id: 'mm1-l2', title: 'حل المعادلات البسيطة', playbackId: '', duration: '22:30', order: 2 },
              { id: 'mm1-l3', title: 'الأشكال الهندسية', playbackId: '', duration: '18:45', order: 3 },
              { id: 'mm1-l4', title: 'المساحة والمحيط', playbackId: '', duration: '19:00', order: 4 }
            ]
          }
        ]
      },
      {
        id: 'science',
        name: 'علوم',
        nameEn: 'Science',
        color: '#2ed573',
        icon: '🔬',
        courses: [
          {
            id: 'middle-science-1',
            title: 'علوم - الصف الأول متوسط',
            level: 'middle',
            levelName: 'متوسط',
            grade: 'الصف الأول متوسط',
            subject: 'علوم',
            description: 'مقدمة في الفيزياء والكيمياء والأحياء',
            lessons: [
              { id: 'ms1-l1', title: 'المادة وخواصها', playbackId: '', duration: '18:00', order: 1 },
              { id: 'ms1-l2', title: 'الخلية - وحدة بناء الكائن الحي', playbackId: '', duration: '21:00', order: 2 },
              { id: 'ms1-l3', title: 'القوة والحركة', playbackId: '', duration: '19:30', order: 3 }
            ]
          }
        ]
      },
      {
        id: 'arabic',
        name: 'لغة عربية',
        nameEn: 'Arabic',
        color: '#ffa502',
        icon: '📖',
        courses: [
          {
            id: 'middle-arabic-1',
            title: 'لغة عربية - الصف الأول متوسط',
            level: 'middle',
            levelName: 'متوسط',
            grade: 'الصف الأول متوسط',
            subject: 'لغة عربية',
            description: 'القواعد النحوية والنصوص الأدبية',
            lessons: [
              { id: 'ma1-l1', title: 'أقسام الكلام', playbackId: '', duration: '17:00', order: 1 },
              { id: 'ma1-l2', title: 'الفعل الماضي والمضارع والأمر', playbackId: '', duration: '20:00', order: 2 },
              { id: 'ma1-l3', title: 'الفاعل والمفعول به', playbackId: '', duration: '18:30', order: 3 }
            ]
          }
        ]
      },
      {
        id: 'english',
        name: 'لغة إنجليزية',
        nameEn: 'English',
        color: '#1e90ff',
        icon: '🌐',
        courses: [
          {
            id: 'middle-english-1',
            title: 'لغة إنجليزية - الصف الأول متوسط',
            level: 'middle',
            levelName: 'متوسط',
            grade: 'الصف الأول متوسط',
            subject: 'لغة إنجليزية',
            description: 'Grammar, reading comprehension, and vocabulary building',
            lessons: [
              { id: 'me1-l1', title: 'Present Simple Tense', playbackId: '', duration: '16:00', order: 1 },
              { id: 'me1-l2', title: 'Past Simple Tense', playbackId: '', duration: '17:30', order: 2 },
              { id: 'me1-l3', title: 'Reading Comprehension', playbackId: '', duration: '20:00', order: 3 }
            ]
          }
        ]
      }
    ]
  },
  secondary: {
    id: 'secondary',
    name: 'ثانوي',
    nameEn: 'Secondary',
    grades: 'الصف الأول - الثالث',
    gradeCount: 3,
    icon: 'graduation',
    subjects: [
      {
        id: 'math',
        name: 'رياضيات',
        nameEn: 'Math',
        color: '#ff4757',
        icon: '➗',
        courses: [
          {
            id: 'secondary-math-1',
            title: 'رياضيات - الصف الأول ثانوي',
            level: 'secondary',
            levelName: 'ثانوي',
            grade: 'الصف الأول ثانوي',
            subject: 'رياضيات',
            description: 'المعادلات التربيعية والدوال والتحليل',
            lessons: [
              { id: 'sm1-l1', title: 'الدوال وأنواعها', playbackId: '', duration: '25:00', order: 1 },
              { id: 'sm1-l2', title: 'المعادلات التربيعية', playbackId: '', duration: '28:00', order: 2 },
              { id: 'sm1-l3', title: 'المتباينات', playbackId: '', duration: '22:30', order: 3 },
              { id: 'sm1-l4', title: 'كثيرات الحدود', playbackId: '', duration: '24:00', order: 4 }
            ]
          },
          {
            id: 'secondary-math-3',
            title: 'رياضيات - الصف الثالث ثانوي',
            level: 'secondary',
            levelName: 'ثانوي',
            grade: 'الصف الثالث ثانوي',
            subject: 'رياضيات',
            description: 'منهج الرياضيات المتخصصة لشهادة الثانوية السودانية - يشمل التفاضل والتكامل، المصفوفات، والاحتمالات والأعداد المركبة.',
            lessons: [
              { id: 'sm3-l1', title: 'الدرس الأول: النهايات والاتصال', playbackId: '9C52lOffUiVpWcbO9RFH9BjLe9cs7vmUxZ02YRIzQHxU', videoUrl: 'https://stream.mux.com/9C52lOffUiVpWcbO9RFH9BjLe9cs7vmUxZ02YRIzQHxU.m3u8', isHLS: true, duration: '0:01', durationMs: 1000, description: 'تعريف النهاية وحساب النهايات للدوال الحقيقية ودراسة الاتصال.', order: 1 },
              { id: 'sm3-l2', title: 'الدرس الثاني: قواعد الاشتقاق وتطبيقاته', playbackId: 'UQEQwdAy8Q00Nu7S7v00t01epwaEIDr995YaXFtytRIFRY', videoUrl: 'https://stream.mux.com/UQEQwdAy8Q00Nu7S7v00t01epwaEIDr995YaXFtytRIFRY.m3u8', isHLS: true, duration: '0:14', durationMs: 14000, description: 'قواعد الاشتقاق الأساسية والمشتقات ذات الرتب العليا وتطبيقاتها.', order: 2 },
              { id: 'sm3-l3', title: 'الدرس الثالث: القيم القصوى ونقاط الانعطاف', playbackId: 'bunny-1', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', isHLS: false, duration: '9:56', durationMs: 596000, description: 'تحديد القيم العظمى والصغرى المحلية ودراسة تقعر الدوال ونقاط الانعطاف.', order: 3 },
              { id: 'sm3-l4', title: 'الدرس الرابع: مفهوم التكامل غير المحدود', playbackId: 'sintel-2', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', isHLS: false, duration: '0:52', durationMs: 52000, description: 'مفهوم الدالة المقابلة وقواعد التكامل غير المحدود للدوال الجبرية.', order: 4 },
              { id: 'sm3-l5', title: 'الدرس الخامس: حساب المساحات بالتكامل المحدود', playbackId: 'tears-3', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', isHLS: false, duration: '12:14', durationMs: 734000, description: 'النظرية الأساسية للتفاضل والتكامل وحساب المساحة تحت المنحنى.', order: 5 },
              { id: 'sm3-l6', title: 'الدرس السادس: حساب الحجوم الدورانية والمصفوفات', playbackId: 'elephant-4', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', isHLS: false, duration: '10:53', durationMs: 653000, description: 'حساب حجوم الأجسام الدورانية المتولدة من دوران منطقة محددة حول المحاور.', order: 6 }
            ]
          }
        ]
      },
      {
        id: 'science',
        name: 'علوم',
        nameEn: 'Science',
        color: '#2ed573',
        icon: '🔬',
        courses: [
          {
            id: 'secondary-science-1',
            title: 'علوم - الصف الأول ثانوي',
            level: 'secondary',
            levelName: 'ثانوي',
            grade: 'الصف الأول ثانوي',
            subject: 'علوم',
            description: 'مقدمة متقدمة في العلوم الطبيعية',
            lessons: [
              { id: 'ss1-l1', title: 'الذرة وتركيبها', playbackId: '', duration: '23:00', order: 1 },
              { id: 'ss1-l2', title: 'الجدول الدوري', playbackId: '', duration: '25:00', order: 2 },
              { id: 'ss1-l3', title: 'الروابط الكيميائية', playbackId: '', duration: '22:00', order: 3 }
            ]
          }
        ]
      },
      {
        id: 'arabic',
        name: 'لغة عربية',
        nameEn: 'Arabic',
        color: '#ffa502',
        icon: '📖',
        courses: [
          {
            id: 'secondary-arabic-1',
            title: 'لغة عربية - الصف الأول ثانوي',
            level: 'secondary',
            levelName: 'ثانوي',
            grade: 'الصف الأول ثانوي',
            subject: 'لغة عربية',
            description: 'البلاغة والنقد الأدبي والنحو المتقدم',
            lessons: [
              { id: 'sa1-l1', title: 'علم البيان - التشبيه والاستعارة', playbackId: '', duration: '20:00', order: 1 },
              { id: 'sa1-l2', title: 'المنصوبات', playbackId: '', duration: '22:00', order: 2 },
              { id: 'sa1-l3', title: 'تحليل النص الأدبي', playbackId: '', duration: '25:00', order: 3 }
            ]
          }
        ]
      },
      {
        id: 'english',
        name: 'لغة إنجليزية',
        nameEn: 'English',
        color: '#1e90ff',
        icon: '🌐',
        courses: [
          {
            id: 'secondary-english-1',
            title: 'لغة إنجليزية - الصف الأول ثانوي',
            level: 'secondary',
            levelName: 'ثانوي',
            grade: 'الصف الأول ثانوي',
            subject: 'لغة إنجليزية',
            description: 'Advanced grammar, essay writing, and literature',
            lessons: [
              { id: 'se1-l1', title: 'Conditional Sentences', playbackId: '', duration: '20:00', order: 1 },
              { id: 'se1-l2', title: 'Passive Voice', playbackId: '', duration: '18:30', order: 2 },
              { id: 'se1-l3', title: 'Essay Writing', playbackId: '', duration: '25:00', order: 3 }
            ]
          }
        ]
      },
      {
        id: 'physics',
        name: 'فيزياء',
        nameEn: 'Physics',
        color: '#a55eea',
        icon: '⚛️',
        courses: [
          {
            id: 'secondary-physics-1',
            title: 'فيزياء - الصف الأول ثانوي',
            level: 'secondary',
            levelName: 'ثانوي',
            grade: 'الصف الأول ثانوي',
            subject: 'فيزياء',
            description: 'الميكانيكا الكلاسيكية - القوة والحركة والطاقة',
            lessons: [
              { id: 'sp1-l1', title: 'الكميات الفيزيائية والقياس', playbackId: '', duration: '22:00', order: 1 },
              { id: 'sp1-l2', title: 'الحركة في خط مستقيم', playbackId: '', duration: '26:00', order: 2 },
              { id: 'sp1-l3', title: 'قوانين نيوتن', playbackId: '', duration: '28:00', order: 3 },
              { id: 'sp1-l4', title: 'الشغل والطاقة', playbackId: '', duration: '24:00', order: 4 }
            ]
          }
        ]
      },
      {
        id: 'chemistry',
        name: 'كيمياء',
        nameEn: 'Chemistry',
        color: '#ff6348',
        icon: '🧪',
        courses: [
          {
            id: 'secondary-chemistry-1',
            title: 'كيمياء - الصف الأول ثانوي',
            level: 'secondary',
            levelName: 'ثانوي',
            grade: 'الصف الأول ثانوي',
            subject: 'كيمياء',
            description: 'مقدمة في الكيمياء العامة والعضوية',
            lessons: [
              { id: 'sc1-l1', title: 'تركيب الذرة', playbackId: '', duration: '23:00', order: 1 },
              { id: 'sc1-l2', title: 'التفاعلات الكيميائية', playbackId: '', duration: '25:00', order: 2 },
              { id: 'sc1-l3', title: 'المول والحسابات الكيميائية', playbackId: '', duration: '27:00', order: 3 }
            ]
          }
        ]
      }
    ]
  }
};

/**
 * Get all courses for a specific education level.
 * @param {'primary'|'middle'|'secondary'} level
 * @returns {Array} Flat array of all courses in that level
 */
export function getCoursesForLevel(level) {
  const levelData = curriculum[level];
  if (!levelData) return [];

  return levelData.subjects.flatMap(subject => subject.courses);
}

/**
 * Get a specific course by its ID.
 * @param {string} courseId
 * @returns {object|null} The course object or null
 */
export function getCourseById(courseId) {
  for (const level of Object.values(curriculum)) {
    for (const subject of level.subjects) {
      const course = subject.courses.find(c => c.id === courseId);
      if (course) return course;
    }
  }
  return null;
}

/**
 * Get a specific lesson by its ID across all courses.
 * @param {string} lessonId
 * @returns {{ lesson: object, course: object }|null}
 */
export function getLessonById(lessonId) {
  for (const level of Object.values(curriculum)) {
    for (const subject of level.subjects) {
      for (const course of subject.courses) {
        const lesson = course.lessons.find(l => l.id === lessonId);
        if (lesson) return { lesson, course };
      }
    }
  }
  return null;
}

/**
 * Get all subjects for a specific level.
 * @param {'primary'|'middle'|'secondary'} level
 * @returns {Array} Array of subject objects with course counts
 */
export function getSubjectsForLevel(level) {
  const levelData = curriculum[level];
  if (!levelData) return [];

  return levelData.subjects.map(subject => ({
    ...subject,
    courseCount: subject.courses.length
  }));
}

/**
 * Get the total number of subjects available for a level.
 * @param {'primary'|'middle'|'secondary'} level
 * @returns {number}
 */
export function getSubjectCount(level) {
  const levelData = curriculum[level];
  if (!levelData) return 0;
  return levelData.subjects.length;
}
