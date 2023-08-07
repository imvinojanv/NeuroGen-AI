import Image from "next/image";

interface EmptyProps {
    label: string;
}

export const Empty = ({
    label,
} : EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center">
        <div className="relative h-72 w-72">
            <Image 
                fill
                src="/empty-img.png"
                alt="Empty"
            />
        </div>
        <p className="text-[#6e6e76] text-sm text-center">
            {label}
        </p>
    </div>
  )
}