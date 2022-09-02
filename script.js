async function renderProducts(){
    try{
        const res = await axios.get("http://localhost:3000/products")
        const products = res.data
        const tbody = document.querySelector("tbody")
        tbody.innerHTML=""
        products.forEach(product => {
            const tr = document.createElement("tr")
            tr.innerHTML=`
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.desc}</td>
                <td>
                    <button type="button" class="btn warning">E</button>
                    <button type="button" class="btn danger">X</button>
                </td>
            `
            tbody.appendChild(tr)
        });
    }catch(e){}
}

document.addEventListener("DOMContentLoaded",()=>{
    renderProducts()
})

document.getElementById("product-form").addEventListener("submit", async (event)=>{
    event.preventDefault()
    const name = document.querySelector("#name")
    const price = document.querySelector("#price")
    const desc = document.querySelector("#desc")
    try{
        const product = {
            name:name.value,
            price:parseInt(price.value),
            desc:desc.value
        }
        const createdProduct = await axios.post("http://localhost:3000/products",product)
        console.log(createdProduct.data)
        renderProducts()

        //const del = await axios.delete("http://localhost:3000/products/1")
        //console.log(del)
    }catch(er){
        alert("erro")
        console.log(er)
    }
})
