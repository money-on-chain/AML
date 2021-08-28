import Main from './main.js'

let main = new Main();

// Listeners
document.querySelector('#validateUser').addEventListener('click', validateUser)
document.querySelector('#mintDoc').addEventListener('click', mintDoc)


function validateUser() {
    document.querySelector('#userOk').style.setProperty('display', 'none');
    document.querySelector('#userFail').style.setProperty('display', 'none');


    let user = document.getElementById('user').value;
    if (!user) return
    main.validateUser(user).then((validate) => {
        console.log('VALIDATEEEE', validate)
        if (validate) {
            document.querySelector('#userOk').style.removeProperty('display');
        } else {
            document.querySelector('#userFail').style.removeProperty('display');
        }
    })
}

function mintDoc() {
    let amount = document.getElementById('valueToMint').value;
    if (!amount) return

    main.mintDoc(amount).then((resultMint) => {
        console.log('main', resultMint)
        // if (validate) {
        //     document.querySelector('#mintOk').style.removeProperty('display');
        // } else {
        //     document.querySelector('#mintFail').style.removeProperty('display');
        // }
    });

}
