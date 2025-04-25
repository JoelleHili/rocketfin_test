import Sidebar from '@/components/Sidebar'
import '../styles/globals.scss'
import Image from 'next/image'
import logo from '../public/logo.png'
import Welcome from '@/components/Welcome'
import Slogan from '@/components/Slogan'

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
      <body className='layout'>
        <div className='layout__header'>
          <Image src={logo} alt="rocketfin" className='layout__header__logo' width={140} height={36} />
          <Slogan/>
          <Welcome/>
        </div>

        <div className='layout__body'>
          <Sidebar />
          <div>{children}</div>
        </div>
      </body>
    </html>
  )
}
