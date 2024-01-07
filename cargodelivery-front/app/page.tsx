import NavBar from './Components/navBar'
import OrdersWithProviders from './Orders/page'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NavBar></NavBar>
      <div>
        <OrdersWithProviders>
        
        </OrdersWithProviders>
      </div>
    </main>
  )
}
