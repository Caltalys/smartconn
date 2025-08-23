import Image from "next/image"
import Link from "next/link"

const Logo = () => {
    return (
        <Link href="/" className="flex items-center">
            <Image
                src="/logo.svg"
                alt="SmartConn Logo"
                width={120}
                height={30}
                priority
            />
        </Link>
    )
}

export default Logo