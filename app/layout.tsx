import Sidebar from '@/components/Sidebar'
import '../styles/globals.scss'

export const metadata = {
  title: 'RocketFin Test',
  description: 'A Test To Show My Worth!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <div className='layout__body'>
        <Sidebar />
        <body>{children}</body>
      </div>
    </html>
  )
}
