import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../service/Product';


const PAGE_SIZE = 10;

export default function Page() {

    const [products,setProducts]=useState<{thumbnail:string,title:string,id:string}[]>([]);
    const [loading,setLoading]=useState<boolean>(false);
    const [error,setError]=useState<string>();
    const [currentPage,setCurrentPage]=useState<number>(1);

    useEffect(()=>{
     
        const fetchData = async()=>{
           setLoading(true)
          try{
            let data =    await fetchProducts();
            if(data){
               setProducts(data)
            } 
            else{
        setError("Error while Data")
            }
        }
        finally{
            setLoading(false)
        }

        }

        fetchData();
    },[])


    if(loading){
      <div>Loading......</div>
    }

    else if(error){
       <div>An Error has occured while fetching details</div>
    }


  return (
    <>
           <div className='products-pagination'>
  {/* Previous Button */}
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="pagination-btn"
  >
    Prev
  </button>

  {/* Page Numbers */}
  {
    Array.from({ length: Math.ceil(products.length / PAGE_SIZE) }, (_, i) => (
      <button
        key={i}
        className={`pagination-btn ${i + 1 === currentPage ? "pagination-btn-selected" : ""}`}
        onClick={() => setCurrentPage(i + 1)}
      >
        {i + 1}
      </button>
    ))
  }

  {/* Next Button */}
  <button
    onClick={() =>
      setCurrentPage((prev) =>
        Math.min(prev + 1, Math.ceil(products.length / PAGE_SIZE))
      )
    }
    disabled={currentPage === Math.ceil(products.length / PAGE_SIZE)}
    className="pagination-btn"
  >
    Next
  </button>
</div>

     <div className="product-grid">

      {products.length > 0 ? (
        products.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE).map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
            </div>
          </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
    </>
  )
}