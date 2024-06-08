const User = require('../Models/user')


//====== HELPERS
async function listAllUsers() {

    const users = await User.findAll();
    return users;
    // User.findAll().then((users) => {

    //     console.log('🚨🚨🚨🚨')
    //     console.log(users)
    //     return users
    // })
    // // return User.findAll({
    // //     where:{
    // //       is_active:'1',
    // //       name:{$like:'%%'}
    // //     },
    // //     limit:10
    // //   }).then(function(users){
    // //     console.log(users);
    // //     res.send({error:false,message:'users list',data:users});
    // //   }).catch(function(err){
    // //     console.log('Oops! something went wrong, : ', err);
    // //   });
}


//====== VIEW COMPONENTS
function admView(req, res) {
    // res.redirect('/adm');
    let body = createListAllUsers()
    console.log(body)
    res.render('adm', { body });
    // res.render('login')
}

//====== VIEW COMPONENTS
async function createListAllUsers() {
    const users = await listAllUsers()
    // // .then(users => console.log(users))
    // // .catch(error => console.error(error));
    // // const users = await listAllUsers().map(el => el.get({ plain: true }))
    // const users = await User.findAll({}).map(el => el.get({ plain: true }))
    // // const users = User.findAll().then((users) => {
    //     User.findAll({
    //         where: {
    //           nodeid: node.nodeid
    //         },
    //         raw: true,
    //         nest: true,
    //       })
    //       .success(function (sensors) {
    //         var nodedata = JSON.parse(JSON.stringify(node)); // this is my trick
    //         nodedata.sensors = sensors;
    //         nodesensors.push(nodedata);
    //         response.json(nodesensors);
    // });
    //     console.log('🚨🚨🚨🚨')
    //     console.log(users)
    //     return users
    // })

    // let rows = ['']


    // let rows = users.every(user => {
    //     `
    //     <div class="row">
    //         <!-- <div class="text-center col-2 mt-5 mb-5"> </div> Helps Centralize with Bootstrap -->
            
    //         <div class="text-center col-4">
    //                 <p>Abrilina Catanhedo Silverio</p>
    //         </div>

    //         <div class="text-center col-4">
    //                 <p>${ user.email }</p>
    //         </div>

    //         <div class="text-center col-3">
    //                 <p>${ user.senha }</p>
    //         </div>

    //         <div class="text-center col-1">
    //             <button type="button" class="btn btn-danger">DEL</button>
    //         </div>

    //         <!-- <div class="text-center col-2 mt-5 mb-5"> </div> Helps Centralize with Bootstrap -->
    //     </div>`
    // })





    // for (let index = 0; index < users.length; index++) {
    //     // const user = users[index];
    //     console.log('🚨🚨🚨🚨')
    //     console.log('All users:', JSON.stringify(users, null, 2));
    //     const user = users[index];
    //     rows.push(`
    //     <div class="row">
    //         <!-- <div class="text-center col-2 mt-5 mb-5"> </div> Helps Centralize with Bootstrap -->
            
    //         <div class="text-center col-4">
    //                 <p>Abrilina Catanhedo Silverio</p>
    //         </div>

    //         <div class="text-center col-4">
    //                 <p>${ user.email }</p>
    //         </div>

    //         <div class="text-center col-3">
    //                 <p>${ user.senha }</p>
    //         </div>

    //         <div class="text-center col-1">
    //             <button type="button" class="btn btn-danger">DEL</button>
    //         </div>

    //         <!-- <div class="text-center col-2 mt-5 mb-5"> </div> Helps Centralize with Bootstrap -->
    //     </div>
    // `)
    // }

    // let rows = users.map(user => {
    let rows = []
    // });
    console.log('🚨🚨🚨🚨')
    console.log(users[0].email)
    console.log('🚨🚨🚨🚨')
    const size = users.length
    for (let index = 0; index < size; index++) {
        const element = users[index];
        console.log(`✅ ${ element.email }`)
        rows.push(element)
    }
    // users.array.forEach(element => {
    //     console.log(`✅ ${ element.email }`)
    // });



    // console.log(typeof users);
    // let rows = users.get({ plain: true });

    // console.log(rows)
    // console.log(users[0].dataValues.email)
    
    // users.then(function(result) {
    //     return result
    //   });
    return rows.join('\n')
}









module.exports = {
    admView,
    createListAllUsers
}
