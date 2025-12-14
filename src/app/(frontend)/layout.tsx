import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import '../globals.css'

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </>
  )
}
