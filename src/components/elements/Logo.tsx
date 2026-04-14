import Image from "next/image"
import { Link } from "@/i18n/navigation"

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