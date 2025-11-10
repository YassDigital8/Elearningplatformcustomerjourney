import { ArrowLeft, Star, Users, Clock, CheckCircle2, PlayCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import type { Course, User } from '../App';

interface CourseDetailProps {
  course: Course;
  user: User | null;
  isEnrolled: boolean;
  onBack: () => void;
  onEnroll: (courseId: string) => void;
  onStartCourse: () => void;
  onLoginClick: () => void;
}

export function CourseDetail({
  course,
  user,
  isEnrolled,
  onBack,
  onEnroll,
  onStartCourse,
  onLoginClick
}: CourseDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button onClick={onBack} variant="ghost" className="gap-2">
            <ArrowLeft className="size-4" />
            Back to Courses
          </Button>
        </div>
      </div>

      {/* Course Header */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-white text-blue-600">
                {course.level}
              </Badge>
              {course.isFree && (
                <Badge className="bg-green-500">FREE</Badge>
              )}
            </div>

            <h1 className="mb-4">{course.title}</h1>
            <p className="text-xl text-blue-100 mb-6">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Star className="size-5 fill-yellow-400 text-yellow-400" />
                <span>{course.rating} rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="size-5" />
                <span>{course.studentsCount.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-5" />
                <span>{course.duration}</span>
              </div>
            </div>

            <div className="text-sm text-blue-100">
              Created by {course.instructor}
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What you'll learn */}
            <Card className="p-6">
              <h2 className="mb-4">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex gap-3">
                  <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Build real-world projects from scratch</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Master the latest industry tools and technologies</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Gain practical experience with hands-on exercises</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Get certificate upon completion</span>
                </div>
              </div>
            </Card>

            {/* Course Content */}
            <Card className="p-6">
              <h2 className="mb-4">Course Content</h2>
              <div className="space-y-3">
                {course.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-sm">{lesson.title}</div>
                        <div className="text-xs text-gray-500">{lesson.duration}</div>
                      </div>
                    </div>
                    <PlayCircle className="size-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Requirements */}
            <Card className="p-6">
              <h2 className="mb-4">Requirements</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• No prior experience needed - we'll teach you everything</li>
                <li>• A computer with internet connection</li>
                <li>• Willingness to learn and practice</li>
              </ul>
            </Card>

            {/* Instructor */}
            <Card className="p-6">
              <h2 className="mb-4">Your Instructor</h2>
              <div className="flex items-start gap-4">
                <div className="size-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                  {course.instructor.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3>{course.instructor}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Professional instructor with 10+ years of experience in the industry. 
                    Passionate about teaching and helping students achieve their goals.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {!course.isFree && (
                <div className="mb-4">
                  <div className="text-gray-600 text-sm">Price</div>
                  <div className="text-blue-600">${course.price}</div>
                </div>
              )}

              {isEnrolled ? (
                <Button onClick={onStartCourse} className="w-full" size="lg">
                  Continue Learning
                </Button>
              ) : (
                <>
                  {user ? (
                    <Button
                      onClick={() => onEnroll(course.id)}
                      className="w-full"
                      size="lg"
                    >
                      {course.isFree ? 'Enroll for Free' : 'Buy Now'}
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        onClick={onLoginClick}
                        className="w-full"
                        size="lg"
                      >
                        Login to Enroll
                      </Button>
                      <p className="text-xs text-center text-gray-500">
                        Create an account to start learning
                      </p>
                    </div>
                  )}
                </>
              )}

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Level</span>
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Lessons</span>
                  <span>{course.lessons.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Certificate</span>
                  <span>Yes</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
