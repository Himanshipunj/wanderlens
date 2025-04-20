import "./globals.css"
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: "WanderLens - Discover Travel Activities",
  description: "Find and save your favorite travel activities with personalized relevance scores",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
