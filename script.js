const api = axios.create({
    baseURL: "http://localhost:3000"
})

async function removeProduct(id){
    try{
        await api.delete(`/products/${id}`)
        renderProducts()
    }catch(e){
        alert(e)
    }
}

async function fetchProduct(id){
    try{
        const res = await api.get(`/products/${id}`)
        return res
    }catch(e){alert(e); return false}
}

async function renderProducts(){
    try{
        const res = await api.get("/products")
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
                    <button type="button" class="btn warning" id="E${product.id}">E</button>
                    <button type="button" class="btn danger" id="R${product.id}">X</button>
                </td>
            `
            tbody.appendChild(tr)
            document.querySelector(`#R${product.id}`).addEventListener("click",()=>{
                removeProduct(product.id)
            })
            document.querySelector(`#E${product.id}`).addEventListener("click",async()=>{
                const { data:fetched } = await fetchProduct(product.id)

                document.querySelector("#update form").dataset.id=fetched.id
                document.getElementById("eName").value=fetched.name
                document.getElementById("ePrice").value=fetched.price
                document.getElementById("eDesc").value=fetched.desc
                document.querySelector("#update").style.display="flex"
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
        const createdProduct = await api.post("/products",product)
        await renderProducts()

        window.scrollTo({top: document.body.scrollHeight,behavior:"smooth"})
    }catch(er){
        alert("erro")
        console.log(er)
    }finally{
        name.value=price.value=desc.value=""
    }
})

document.querySelector("#update form").addEventListener("submit",async(event)=>{
    event.preventDefault()
    try{
        const updatedProduct = {
            name:document.getElementById("eName").value,
            price:document.getElementById("ePrice").value,
            desc:document.getElementById("eDesc").value
        }
       const res = await api.put(`/products/${event.target.dataset.id}`,updatedProduct)
       renderProducts()
       document.querySelector("#update").style.display="none"
    }catch(e){alert(e)}
})

document.querySelector("#update form button:last-child").addEventListener("click",(event)=>{
    event.preventDefault()
    const update = document.getElementById("update")
    update.style.display="none"
})