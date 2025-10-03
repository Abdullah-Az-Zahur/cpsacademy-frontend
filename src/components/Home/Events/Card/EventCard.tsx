import Image from "next/image";

interface EventCardProps {
  date: string;
  location: string;
  description: string;
  image: string;
}

const EventCard: React.FC<EventCardProps> = ({
  date,
  location,
  description,
  image,
}) => {
  return (
    <div className="relative w-full aspect-[16/9] rounded-2xl  overflow-hidden">
      {/* Background image */}
      <Image
        src={image}
        alt={location}
        fill
        className="object-cover"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text */}
      <div className="absolute bottom-5 left-5 text-white space-y-2 z-10">
        <p className="text-xs md:text-sm font-semibold bg-white/20 px-3 py-1 rounded-full inline-block">
          {date}
        </p>
        <h3 className="text-lg md:text-xl font-bold">{location}</h3>
        <p className="text-sm md:text-base opacity-90 max-w-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
