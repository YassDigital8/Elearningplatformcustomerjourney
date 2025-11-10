import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { CourseDetail } from './components/CourseDetail';
import { UserDashboard } from './components/UserDashboard';
import { CourseViewer } from './components/CourseViewer';
import { AuthModal } from './components/AuthModal';
import { PaymentModal } from './components/PaymentModal';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  price: number;
  isFree: boolean;
  thumbnail: string;
  rating: number;
  studentsCount: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'course-detail' | 'dashboard' | 'course-viewer'>('landing');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const courses: Course[] = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      description: 'Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB from scratch. Build real-world projects and become a full-stack developer.',
      instructor: 'Sarah Johnson',
      duration: '40 hours',
      level: 'Beginner',
      price: 99.99,
      isFree: false,
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      rating: 4.8,
      studentsCount: 15234,
      lessons: [
        { id: '1-1', title: 'Introduction to Web Development', duration: '15:30', isCompleted: false },
        { id: '1-2', title: 'HTML Fundamentals', duration: '25:45', isCompleted: false },
        { id: '1-3', title: 'CSS Styling and Layout', duration: '30:20', isCompleted: false },
        { id: '1-4', title: 'JavaScript Basics', duration: '35:15', isCompleted: false },
        { id: '1-5', title: 'React Framework', duration: '40:00', isCompleted: false },
      ]
    },
    {
      id: '2',
      title: 'Digital Marketing Masterclass',
      description: 'Master SEO, social media marketing, email marketing, and paid advertising. Learn to create effective marketing campaigns.',
      instructor: 'Mike Chen',
      duration: '25 hours',
      level: 'Intermediate',
      price: 79.99,
      isFree: false,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      rating: 4.6,
      studentsCount: 9876,
      lessons: [
        { id: '2-1', title: 'Marketing Fundamentals', duration: '20:00', isCompleted: false },
        { id: '2-2', title: 'SEO Strategies', duration: '25:30', isCompleted: false },
        { id: '2-3', title: 'Social Media Marketing', duration: '22:45', isCompleted: false },
        { id: '2-4', title: 'Email Marketing Campaigns', duration: '18:20', isCompleted: false },
      ]
    },
    {
      id: '3',
      title: 'Introduction to Python Programming',
      description: 'Start your coding journey with Python. Learn programming fundamentals, data structures, and build practical projects.',
      instructor: 'Dr. Emily Roberts',
      duration: '15 hours',
      level: 'Beginner',
      price: 0,
      isFree: true,
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80',
      rating: 4.9,
      studentsCount: 23456,
      lessons: [
        { id: '3-1', title: 'Python Basics', duration: '18:00', isCompleted: false },
        { id: '3-2', title: 'Variables and Data Types', duration: '22:15', isCompleted: false },
        { id: '3-3', title: 'Control Flow', duration: '20:30', isCompleted: false },
        { id: '3-4', title: 'Functions and Modules', duration: '25:00', isCompleted: false },
      ]
    },
    {
      id: '4',
      title: 'Graphic Design Fundamentals',
      description: 'Learn design principles, typography, color theory, and master tools like Figma and Adobe Creative Suite.',
      instructor: 'Alex Martinez',
      duration: '30 hours',
      level: 'Beginner',
      price: 89.99,
      isFree: false,
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      rating: 4.7,
      studentsCount: 12098,
      lessons: [
        { id: '4-1', title: 'Design Principles', duration: '24:00', isCompleted: false },
        { id: '4-2', title: 'Typography Essentials', duration: '28:30', isCompleted: false },
        { id: '4-3', title: 'Color Theory', duration: '22:00', isCompleted: false },
        { id: '4-4', title: 'Working with Figma', duration: '30:45', isCompleted: false },
      ]
    },
    {
      id: '5',
      title: 'Photography Basics',
      description: 'Free course covering camera basics, composition, lighting, and photo editing. Perfect for beginners.',
      instructor: 'Lisa Anderson',
      duration: '12 hours',
      level: 'Beginner',
      price: 0,
      isFree: true,
      thumbnail: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
      rating: 4.5,
      studentsCount: 18765,
      lessons: [
        { id: '5-1', title: 'Camera Settings', duration: '15:00', isCompleted: false },
        { id: '5-2', title: 'Composition Techniques', duration: '20:30', isCompleted: false },
        { id: '5-3', title: 'Understanding Light', duration: '18:45', isCompleted: false },
        { id: '5-4', title: 'Photo Editing Basics', duration: '22:00', isCompleted: false },
      ]
    },
    {
      id: '6',
      title: 'Data Science with R',
      description: 'Learn statistical analysis, data visualization, and machine learning with R programming language.',
      instructor: 'Dr. James Wilson',
      duration: '35 hours',
      level: 'Advanced',
      price: 119.99,
      isFree: false,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      rating: 4.8,
      studentsCount: 8543,
      lessons: [
        { id: '6-1', title: 'R Programming Basics', duration: '30:00', isCompleted: false },
        { id: '6-2', title: 'Data Manipulation', duration: '28:15', isCompleted: false },
        { id: '6-3', title: 'Statistical Analysis', duration: '32:30', isCompleted: false },
        { id: '6-4', title: 'Machine Learning with R', duration: '35:45', isCompleted: false },
      ]
    }
  ];

  const handleCourseClick = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentPage('course-detail');
  };

  const handleEnroll = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    
    if (!user) {
      setAuthMode('signup');
      setShowAuthModal(true);
      return;
    }

    if (course && !course.isFree && !user.enrolledCourses.includes(courseId)) {
      setShowPaymentModal(true);
    } else {
      // Enroll in free course
      setUser({
        ...user,
        enrolledCourses: [...user.enrolledCourses, courseId]
      });
      setCurrentPage('course-viewer');
    }
  };

  const handlePaymentComplete = () => {
    if (user && selectedCourseId) {
      setUser({
        ...user,
        enrolledCourses: [...user.enrolledCourses, selectedCourseId]
      });
      setShowPaymentModal(false);
      setCurrentPage('course-viewer');
    }
  };

  const handleLogin = (email: string, password: string) => {
    // Mock login
    setUser({
      id: '1',
      name: email.split('@')[0],
      email: email,
      enrolledCourses: []
    });
    setShowAuthModal(false);
  };

  const handleSignup = (name: string, email: string, password: string) => {
    // Mock signup
    setUser({
      id: '1',
      name: name,
      email: email,
      enrolledCourses: []
    });
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  const handleStartCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentPage('course-viewer');
  };

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'landing' && (
        <LandingPage
          courses={courses}
          user={user}
          onCourseClick={handleCourseClick}
          onDashboardClick={() => setCurrentPage('dashboard')}
          onLoginClick={() => {
            setAuthMode('login');
            setShowAuthModal(true);
          }}
          onSignupClick={() => {
            setAuthMode('signup');
            setShowAuthModal(true);
          }}
          onLogout={handleLogout}
        />
      )}

      {currentPage === 'course-detail' && selectedCourse && (
        <CourseDetail
          course={selectedCourse}
          user={user}
          isEnrolled={user?.enrolledCourses.includes(selectedCourse.id) || false}
          onBack={() => setCurrentPage('landing')}
          onEnroll={handleEnroll}
          onStartCourse={() => handleStartCourse(selectedCourse.id)}
          onLoginClick={() => {
            setAuthMode('login');
            setShowAuthModal(true);
          }}
        />
      )}

      {currentPage === 'dashboard' && user && (
        <UserDashboard
          user={user}
          courses={courses}
          onBack={() => setCurrentPage('landing')}
          onCourseClick={handleStartCourse}
          onBrowseCourses={() => setCurrentPage('landing')}
          onLogout={handleLogout}
        />
      )}

      {currentPage === 'course-viewer' && selectedCourse && user && (
        <CourseViewer
          course={selectedCourse}
          onBack={() => setCurrentPage('dashboard')}
        />
      )}

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onSignup={handleSignup}
          onSwitchMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
        />
      )}

      {showPaymentModal && selectedCourse && (
        <PaymentModal
          course={selectedCourse}
          onClose={() => setShowPaymentModal(false)}
          onComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}
