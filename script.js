async function removeProduct(id){
    try{
        const res = axios.delete(`http://localhost:3000/products/${id}`)        
    }catch(e){
        alert(e)
    }
}

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
                    <button type="button" class="btn danger" id="R${product.id}">X</button>
                </td>
            `
            tbody.appendChild(tr)
            document.querySelector(`#R${product.id}`).addEventListener("click",()=>{
                removeProduct(product.id)
                renderProducts()
            })

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
        await renderProducts()

        window.scrollTo({top: document.body.scrollHeight,behavior:"smooth"})
        //const del = await axios.delete("http://localhost:3000/products/1")
        //console.log(del)
    }catch(er){
        alert("erro")
        console.log(er)
    }finally{
        name.value=price.value=desc.value=""
    }
})
