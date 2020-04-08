var data=[];
var currItem;
document.querySelector('.add-btn').addEventListener('click',function(e){
    e.preventDefault();
    var name=document.getElementById('item-name').value;
    var cost=document.getElementById('item-cost').value;
    if(name !== '' && cost!==''){
        console.log("ok");
        if(data.length==0)
        id=0;
        else{
            id=data[data.length - 1].id + 1;
        }
        var item={
            'id':id,
            'name':name,
            'cost':cost
        }
        data.push(item);
        addToList(item);
        updateLocal();
        showCost();
        normalState();
    }
    else{
        alert("Please Fill all the feilds");
    }

});

function showCost(){
    var cost=0;
    data.forEach(function(item){
        cost+=parseInt(item.cost);
    });
    document.querySelector('.total-cost').innerHTML=cost;
}

function addToList(item)
{
    var node=`<li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong> <em>Rs ${item.cost}</em>
            <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
            </a>
            </li>`;
    document.getElementById('item-list').innerHTML+=node;
}

function updateul(updateItem){
    var id=`item-${updateItem.id}`
    document.getElementById(id).innerHTML=`<strong>${updateItem.name}: </strong> <em>Rs ${updateItem.cost}</em>
                                                <a href="#" class="secondary-content">
                                                <i class="edit-item fa fa-pencil"></i>
                                                </a>`;
    
}

function updateLocal(){
    localStorage.setItem('items',JSON.stringify(data));
    console.log("Item-added");
}

function getfromlocal(){
    if(localStorage.getItem('items')!= null){
        var ret=JSON.parse(localStorage.getItem('items'));
        data=ret;
        data.forEach(function(item){
            var node=`<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>Rs ${item.cost}</em>
                <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
                </a>
                </li>`;
        document.getElementById('item-list').innerHTML+=node;
        });
        showCost();
    }
}
function getItem(s){
    var id=s.split('-')[1];
    console.log("id is ",id);
    var ret;
    data.forEach(function(item){
        console.log(item.id);
        if(item.id-id === 0)
        ret=item;
    });
    return ret;
}

function normalState(){
    document.querySelector('.update-btn').style.display='none';
    document.querySelector('.delete-btn').style.display='none';
    document.querySelector('.back-btn').style.display='none';
    document.querySelector('.add-btn').style.display='inline';
    document.querySelector('#item-name').value='';
    document.querySelector('#item-cost').value='';
}

function editState(){
    document.querySelector('.update-btn').style.display='inline';
    document.querySelector('.delete-btn').style.display='inline';
    document.querySelector('.back-btn').style.display='inline';
    document.querySelector('.add-btn').style.display='none';
    var item=getItem(currItem.id);
    console.log(item);
    document.querySelector('#item-name').value=item.name;
    document.querySelector('#item-cost').value=item.cost;

    document.querySelector('.update-btn').addEventListener('click',function(e){
        e.preventDefault();
        var name=document.getElementById('item-name').value;
        var cost=document.getElementById('item-cost').value;
        if(name !== '' && cost!==''){
            var id=currItem.id.split('-')[1];
            var updateItem={
                'id':parseInt(id),
                'name':name,
                'cost':cost
            }
            data.forEach(function(item,index){
                if(item.id-id === 0){
                    data[index]=updateItem;
                }
            });
            updateul(updateItem);
            updateLocal();
            showCost();
            normalState();
        }
        
    });
    
    
    document.querySelector('.delete-btn').addEventListener('click',function(e){
        e.preventDefault();
        var id=parseInt(currItem.id.split('-')[1]);
        data.forEach(function(item,index){
            if(item.id===id){
                data.splice(index,1);
            }
        });
        document.getElementById(currItem.id).remove();
        updateLocal();
        showCost();
        normalState();
    });



    document.querySelector('.back-btn').addEventListener('click',function(e){
        e.preventDefault();
        normalState();
    });

}

document.getElementById('item-list').addEventListener('click',function(e){
    //console.log(e.target);
    if(e.target.classList.contains('edit-item')){
        //console.log(e.target.parentNode.parentNode);
        currItem=e.target.parentNode.parentNode;
        editState();
    }
});

document.querySelector('.clear-btn').addEventListener('click',function(e){
    e.preventDefault();
    data=[];
    updateLocal();
    showCost();
    document.querySelector('#item-list').innerHTML='';
});

window.addEventListener('load',function(){
    getfromlocal();
});
    

