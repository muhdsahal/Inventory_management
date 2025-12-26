import './globals.css'

export const metadata = {
  title: 'Inventory Frontend',
  description: 'Simple Next.js frontend for the Inventory API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="container">{children}</main>
      </body>
    </html>
  )
}
