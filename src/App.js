import Home from "./components/Home";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import data from './data-demo.json'
import InvoiceDetails from "./components/InvoiceDetails";
import { InvoiceContext } from "./InvoiceContext";
import InvoiceForm from "./components/InvoiceForm";
import { useState } from "react";

function App() {
const [displayForm, setDisplayForm] = useState(false)
const [invoiceArray, setInvoiceArray] = useState([...data])
// const grandTotal = invoiceArray.items?.reduce((sum, item) => sum + item.total, 0)



  const contextValues = {invoiceArray, setInvoiceArray, displayForm, setDisplayForm}
  return (
    <InvoiceContext.Provider value={contextValues}>
      <Router>
        <div className="relative">
          <Nav />
          {/* <InvoiceForm /> */}
          {/* <InvoiceDetails prop={inv} /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            {invoiceArray?.map((invoice, index) =>{
              return( <Route key={index} path={`/invoice-${index}`} element={<InvoiceDetails prop={invoice} id={index} />} />)
            })}
          </Routes>
        </div>
      </Router>
    </InvoiceContext.Provider>
  )
    
}

export default App;
