import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton" // Assuming shadcn/ui Skeleton is installed

export default function SkeletonCard() {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="p-0 relative">
        <Skeleton className="aspect-[16/10] w-full" />
      </CardHeader>
      <CardContent className="p-5 flex-grow">
        <Skeleton className="h-4 w-1/3 mb-2" /> {/* Category Badge */}
        <Skeleton className="h-6 w-3/4 mb-1" /> {/* Title */}
        <Skeleton className="h-4 w-full mt-2" /> {/* Description line 1 */}
        <Skeleton className="h-4 w-5/6 mt-1" /> {/* Description line 2 */}
      </CardContent>
      <CardFooter className="p-5 border-t">
        <div className="flex justify-between items-center w-full">
          <Skeleton className="h-8 w-1/4" /> {/* Price */}
          <Skeleton className="h-8 w-1/3" /> {/* Button */}
        </div>
      </CardFooter>
    </Card>
  )
}
