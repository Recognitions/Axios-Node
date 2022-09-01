document.getElementById("product-form").addEventListener("submit", async (event)=>{
    event.preventDefault()
    const name = document.querySelector("#name")
    const price = document.querySelector("#price")
    const desc = document.querySelector("#desc")
    try{
        const product = {
            name:name.value,
            price:price.value,
            desc:desc.value
        }
        const createdProduct = await axios.post("http://localhost:3000/products",product)
        console.log(createdProduct.data)
    }catch(er){
        alert("erro")
        console.log(er)
    }
})
