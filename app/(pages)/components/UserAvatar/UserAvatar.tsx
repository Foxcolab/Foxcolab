import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  className?: string;
};

export const UserAvatar = ({
  src,
  className
}: UserAvatarProps) => {
  return (
    <Avatar className={cn(
      "h-8 w-8 md:h-8 md:w-8",
      className
    )}>
      <AvatarImage src={src} />
    {/* <AvatarFallback>CN</AvatarFallback>  */}

    </Avatar>
  )
}