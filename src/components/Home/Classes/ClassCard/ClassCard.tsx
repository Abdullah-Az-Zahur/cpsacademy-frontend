"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ClassItem } from "@/types/classes";
import Link from "next/link";
import Image from "next/image";

import { Play } from "lucide-react";
import { getYoutubeThumbnail } from "../../../../utils/getYoutubeThumbnail";

interface ClassCardProps {
  cls: ClassItem;
}

const ClassCard: React.FC<ClassCardProps> = ({ cls }) => {
  const thumbnail = getYoutubeThumbnail(cls.videoUrl);

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="h-full overflow-hidden cursor-pointer transition-shadow hover:shadow-lg">
        {/* Thumbnail */}
        <div className="relative h-48 w-full group">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={cls.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
              No Thumbnail
            </div>
          )}

          {/* Recorded Badge */}
          {cls.recordAvailable && (
            <Badge className="absolute top-2 right-2 bg-primary/80">Recorded</Badge>
          )}

          {/* Play Button Overlay */}
          {cls.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Link href={cls.videoUrl} target="_blank" className="flex items-center justify-center">
                <div className="bg-black/50 p-4 rounded-full hover:bg-black/70 transition">
                  <Play className="text-white w-6 h-6" />
                </div>
              </Link>
            </div>
          )}
        </div>

        <CardHeader className="p-4 pt-2">
          <h4 className="font-semibold text-lg line-clamp-2">{cls.title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{cls.module.title}</p>
        </CardHeader>

        <CardContent className="p-4 pt-0 flex justify-between items-center">
          <Badge variant="secondary">{cls.duration} min</Badge>
        </CardContent>

        <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
          Created: {new Date(cls.createdAt).toLocaleDateString()}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ClassCard;
