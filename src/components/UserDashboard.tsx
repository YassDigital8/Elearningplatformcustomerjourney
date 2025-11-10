import { ArrowLeft, BookOpen, GraduationCap, Award, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import type { Course, User } from '../App';

interface UserDashboardProps {
  user: User;
  courses: Course[];
  onBack: () => void;
  onCourseClick: (courseId: string) => void;
  onBrowseCourses: () => void;
  onLogout: () => void;
}

export function UserDashboard({
  user,
  courses,
  onBack,
  onCourseClick,
  onBrowseCourses,
  onLogout
}: UserDashboardProps) {
  const enrolledCourses = courses.filter(c => user.enrolledCourses.includes(c.id));
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} variant="ghost" className="gap-2">
              <ArrowLeft className="size-4" />
              Back to Home
            </Button>
            <Button onClick={onLogout} variant="ghost">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 text-sm">Enrolled Courses</div>
              <BookOpen className="size-5 text-blue-600" />
            </div>
            <div className="text-blue-600">{enrolledCourses.length}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 text-sm">Hours Learned</div>
              <TrendingUp className="size-5 text-green-600" />
            </div>
            <div className="text-green-600">
              {enrolledCourses.reduce((acc, c) => acc + parseInt(c.duration), 0)}h
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 text-sm">Certificates</div>
              <Award className="size-5 text-purple-600" />
            </div>
            <div className="text-purple-600">0</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-600 text-sm">Achievements</div>
              <GraduationCap className="size-5 text-orange-600" />
            </div>
            <div className="text-orange-600">0</div>
          </Card>
        </div>

        {/* My Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2>My Courses</h2>
            <Button onClick={onBrowseCourses} variant="outline">
              Browse More Courses
            </Button>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map(course => (
                <Card
                  key={course.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => onCourseClick(course.id)}
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
                    <p className="text-sm text-gray-600 mb-3">
                      {course.instructor}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span>0%</span>
                      </div>
                      <Progress value={0} />
                    </div>

                    <Button className="w-full mt-4" size="sm">
                      Continue Learning
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <BookOpen className="size-12 text-gray-400 mx-auto mb-4" />
              <h3 className="mb-2">No courses enrolled yet</h3>
              <p className="text-gray-600 mb-4">
                Start your learning journey by enrolling in a course
              </p>
              <Button onClick={onBrowseCourses}>
                Browse Courses
              </Button>
            </Card>
          )}
        </div>

        {/* Recommended Courses */}
        {enrolledCourses.length > 0 && (
          <div>
            <h2 className="mb-6">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter(c => !user.enrolledCourses.includes(c.id))
                .slice(0, 3)
                .map(course => (
                  <Card
                    key={course.id}
                    className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={onBack}
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
                      <p className="text-sm text-gray-600 mb-3">
                        {course.instructor}
                      </p>

                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{course.level}</Badge>
                        {!course.isFree && (
                          <span className="text-blue-600">${course.price}</span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
