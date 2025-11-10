import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Circle, PlayCircle, FileText, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import type { Course } from '../App';

interface CourseViewerProps {
  course: Course;
  onBack: () => void;
}

export function CourseViewer({ course, onBack }: CourseViewerProps) {
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const selectedLesson = course.lessons[selectedLessonIndex];
  const completedLessons = course.lessons.filter(l => l.isCompleted).length;
  const progress = (completedLessons / course.lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} variant="ghost" className="gap-2">
              <ArrowLeft className="size-4" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Progress: {Math.round(progress)}%
              </div>
              <Progress value={progress} className="w-32" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
                <img
                  src={course.thumbnail}
                  alt={selectedLesson.title}
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="rounded-full size-16 p-0">
                    <PlayCircle className="size-8" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Lesson Info */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="mb-2">{selectedLesson.title}</h2>
                  <p className="text-sm text-gray-600">
                    Lesson {selectedLessonIndex + 1} of {course.lessons.length} • {selectedLesson.duration}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Mark as Complete
                </Button>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700">
                  In this lesson, you'll learn the fundamental concepts and practical applications. 
                  Follow along with the video and complete the exercises to reinforce your understanding.
                </p>

                <h3>Key Takeaways</h3>
                <ul>
                  <li>Understand the core concepts</li>
                  <li>Apply knowledge through practical examples</li>
                  <li>Build a solid foundation for advanced topics</li>
                </ul>
              </div>
            </Card>

            {/* Resources */}
            <Card className="p-6">
              <h3 className="mb-4">Lesson Resources</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="size-5 text-blue-600" />
                    <div>
                      <div className="text-sm">Lesson Notes</div>
                      <div className="text-xs text-gray-500">PDF • 2.5 MB</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="size-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="size-5 text-blue-600" />
                    <div>
                      <div className="text-sm">Exercise Files</div>
                      <div className="text-xs text-gray-500">ZIP • 5.2 MB</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="size-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                disabled={selectedLessonIndex === 0}
                onClick={() => setSelectedLessonIndex(selectedLessonIndex - 1)}
              >
                Previous Lesson
              </Button>
              <Button
                disabled={selectedLessonIndex === course.lessons.length - 1}
                onClick={() => setSelectedLessonIndex(selectedLessonIndex + 1)}
              >
                Next Lesson
              </Button>
            </div>
          </div>

          {/* Sidebar - Course Content */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h3 className="mb-4">Course Content</h3>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {course.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    onClick={() => setSelectedLessonIndex(index)}
                    className={`
                      flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors
                      ${index === selectedLessonIndex ? 'bg-blue-50 border-2 border-blue-200' : 'hover:bg-gray-50'}
                    `}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {lesson.isCompleted ? (
                        <CheckCircle2 className="size-5 text-green-600" />
                      ) : (
                        <Circle className="size-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm line-clamp-2 mb-1">
                        {index + 1}. {lesson.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {lesson.duration}
                      </div>
                    </div>
                    {index === selectedLessonIndex && (
                      <PlayCircle className="size-5 text-blue-600 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
