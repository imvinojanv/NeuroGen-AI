import Image from "next/image"


export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
        <div className="w-10 h-10 relative animate-spin">
            <Image
                src="/logo.png"
                fill
                alt="logo"
            />
        </div>
        <p className="text-sm text-[#6e6e76]">
            NeuroGen is thinking...
        </p>
    </div>
  )
}
