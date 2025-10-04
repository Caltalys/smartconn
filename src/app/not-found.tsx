import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
                <h1 className="text-9xl font-bold text-primary">404</h1>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Trang không tồn tại
                </h2>
                <p className="mt-4 text-muted-foreground">
                    Rất tiếc, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
                </p>
                <Link href="/" className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    Quay về trang chủ
                </Link>
            </div>
        </main>
    );
}