import { GraduationCap, Star, Users, Clock, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import type { Course, User } from '../App';

interface LandingPageProps {
  courses: Course[];
  user: User | null;
  onCourseClick: (courseId: string) => void;
  onDashboardClick: () => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogout: () => void;
}

export function LandingPage({
  courses,
  user,
  onCourseClick,
  onDashboardClick,
  onLoginClick,
  onSignupClick,
  onLogout
}: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="size-8 text-blue-600" />
              <span className="text-blue-600">LearnHub</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Courses</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            </nav>


          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Learn Without Limits</h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover thousands of courses from expert instructors. Start learning today with free and paid courses.
            </p>
            
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
              <Input
                placeholder="What do you want to learn?"
                className="pl-12 py-6 bg-white text-gray-900"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                <Users className="size-5" />
                <span>50,000+ Students</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                <GraduationCap className="size-5" />
                <span>100+ Courses</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                <Star className="size-5" />
                <span>4.8 Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2>Free Courses</h2>
              <p className="text-gray-600">Start learning without spending a penny</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.filter(c => c.isFree).map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => onCourseClick(course.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Courses Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2>Premium Courses</h2>
              <p className="text-gray-600">Invest in your future with expert-led courses</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.filter(c => !c.isFree).map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => onCourseClick(course.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="size-6" />
                <span>LearnHub</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering learners worldwide with quality education.
              </p>
            </div>
            
            <div>
              <h3 className="mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2025 LearnHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function CourseCard({ course, onClick }: { course: Course; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="aspect-video relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        {course.isFree && (
          <Badge className="absolute top-3 right-3 bg-green-500">
            FREE
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <span>{course.instructor}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{course.rating}</span>
            <span className="text-sm text-gray-500">({course.studentsCount.toLocaleString()})</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="size-4" />
            <span>{course.duration}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{course.level}</Badge>
          {!course.isFree && (
            <span className="text-blue-600">${course.price}</span>
          )}
        </div>
      </div>
    </div>
  );
}
