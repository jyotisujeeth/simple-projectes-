class Expense{
    static add(obj){
        let li=document.createElement('li');
        li.id=`${obj.id}`;
        li.innerHTML=`${obj.amount} for ${obj.type} : ${obj.detail} <span><input type="submit" class="deleteLi" value="Delete"><input type="submit" class="editLi" value="Edit"></span>`;
        expList.appendChild(li);
    }

    static async remove(e){
        e.target.parentElement.parentElement.remove();
        let id=e.target.parentElement.parentElement.id;
        await Server.remove(id);
    }
    
    static async edit(e){
        let id=e.target.parentElement.parentElement.id;
        let data= await Server.getAgainstId(id);
        await Expense.remove(e);
        return data;
    }
};

class Server{
    static async add(obj){
        try{
            let response= await axios.post('http://localhost:8080/expense-api',obj)
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
    static async remove(id){
        try{
            let response=await axios.delete(`http://localhost:8080/expense-api/${id}`);
            return response.data;
        }
        catch(err){
            console.log(err);
        }
    }

    static async get(){
        try{
            let response=await axios.get('http://localhost:8080/expense-api');
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
    static async getAgainstId(id){
        try{
            let response=await axios.get(`http://localhost:8080/expense-api/${id}`);
            return response.data;
        }
        catch(err){
            console.log(err);
        }
    }
};

let formIp= document.querySelector('.formIp');
let amountIp=document.querySelector('#amountIp');
let selectIp=document.querySelector('#selectIp');
let detailIp=document.querySelector('#detailIp');
let expList=document.querySelector('.expList');

initListioners();

function initListioners(){
    document.addEventListener('DOMContentLoaded',getExpense)
    formIp.addEventListener('submit',onFormSubmit);
    expList.addEventListener('click',removeExpense);
    expList.addEventListener('click',editExpense);
}

async function getExpense(){
    const response=await Server.get();
    response.forEach((obj)=>{
        Expense.add(obj);
    })
}

async function onFormSubmit(e){
    e.preventDefault();
    let obj={
        amount:amountIp.value,
        type:selectIp.value,
        detail:detailIp.value
    };

    let response=await Server.add(obj);
    Expense.add(response); 

    amountIp.value='';
    detailIp.value='';
}

async function removeExpense(e){
    if(e.target.classList.contains('deleteLi')){
        Expense.remove(e);
    }
}

async function editExpense(e){
    if(e.target.classList.contains('editLi')){
        let detail= await Expense.edit(e);
        amountIp.value=detail.amount;
        selectIp.value=detail.type;
        detailIp.value=detail.detail;
    }
}