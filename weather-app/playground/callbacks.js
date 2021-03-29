var getUser = (id, callback) =>{
    var user = {
        id: id,
        name: 'kanha'
    };

    setTimeout(()=>{
        callback(user);
    },3000);
};

getUser(18, (user)=>{
    console.log(user);
});