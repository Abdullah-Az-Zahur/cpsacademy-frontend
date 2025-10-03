import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Course } from "@/types/course";
import { motion } from "framer-motion";
import Image from "next/image";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <HoverCard>
        <HoverCardTrigger asChild>
          <Card className="h-full overflow-hidden cursor-pointer transition-shadow hover:shadow-lg">
            <div className="relative h-48 w-full">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-primary/80">
                {course.level}
              </Badge>
            </div>
            <CardHeader className="p-4">
              <h4 className="font-semibold text-lg line-clamp-2">
                {course.title}
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={course.instructor.photo}
                    alt={course.instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  {course.instructor.name}
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-medium">
                    {course.rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({course.students_enrolled.toLocaleString()})
                  </span>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {course.lectures} lectures
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {course.duration}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {course.category.slice(0, 2).map((cat) => (
                  <Badge key={cat} variant="outline" className="text-xs">
                    {cat}
                  </Badge>
                ))}
                {course.category.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{course.category.length - 2}
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">${course.price}</span>
                {course.original_price > course.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${course.original_price}
                  </span>
                )}
              </div>
              <Button size="sm">Enroll Now</Button>
            </CardFooter>
          </Card>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-semibold">{course.title}</h4>
            <p className="text-sm text-muted-foreground">
              {course.description}
            </p>
            <div className="flex items-center pt-2">
              <span className="text-muted-foreground text-xs mr-4">
                Updated: {course.last_updated}
              </span>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="text-xs">
                  Instructor rating: {course.instructor.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </motion.div>
  );
};

export default CourseCard;
