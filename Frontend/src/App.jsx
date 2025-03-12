import React from 'react'
import LoginPage from './Components/LoginPage'
import Register from './Components/Register'
import { Route,Routes, BrowserRouter } from 'react-router'
import Homepage from './Components/Homepage'
import { Provider } from 'react-redux'
import { store } from './Redux/Store'
import Shop from './Components/Shop'
import Navigation from './Components/HomePageComponents/Navigation'
import CartPage from './Components/CartPage'
import ItemDetailsPage from './Components/ItemDetailsPage'
import Footer from './Components/Footer'
import About from './Components/About'
import Contact from './Components/Contact'
import WishList from './Components/WishList'

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Navigation></Navigation>
          <div className='flex flex-col min-h-screen'>
            <main className='flex-grow'>
              <Routes>
                <Route path='/login' element={<LoginPage></LoginPage>}></Route>
                <Route path='/register' element={<Register></Register>}></Route>
                <Route path='/' element={<Homepage></Homepage>}></Route>
                <Route path='/shop' element={<Shop></Shop>}></Route>
                <Route path='/cart' element={<CartPage></CartPage>}></Route>
                <Route path='/itemDetails' element={<ItemDetailsPage/>}></Route>
                <Route path='/about' element={<About/>}></Route>
                <Route path='/support' element={<Contact></Contact>}></Route>
                <Route path='/WishList' element={<WishList></WishList>}></Route>
              </Routes>
            </main>
          </div>
          <Footer></Footer>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App