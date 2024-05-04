const express = require('express');
const router = express.Router();

module.exports = () => {
    const signUpRouter = new SignUpRouter()
    router.post('/signup', ExpressRouterAdapter.adapt(signUpRouter))
}

class ExpressRouterAdapter {
    static adapt(router) {
        return async (req, res) => {
            const httpRequest = {
                body: req.body
            }
            const httpResponse = await router.route(httpRequest)
            res.status(httpResponse.statusCode).json(httpResponse.body)
        }
    }
}

// CAMADA: Presentation
// signup-router
class SignUpRouter {
    async route(httpRequest) {
        const { email, password, repeatPassword } = httpRequest.body
        const user = new SignUpUseCase().signUp(email, password, repeatPassword)

        return {
            statusCode: 200,
            body: user
        }
    }
}

// CAMADA: Domain
// signup-usecase 
class SignUpUseCase {
    async signUp(email, password, repeatPassword) {
        if (password === repeatPassword) {
            new AddAccountRepository().add(email, password)

            return new SignUpPresenter().signUpSuccess()
        } else {
            return new SignUpPresenter().signUpFail()
        }
    }
}

// CAMADA: Infra
// signup-presenter
class SignUpPresenter {
    async signUpSuccess() {
        return 'Usuário cadastrado com sucesso'
    }

    async signUpFail() {

        return 'Senhas não conferem'
    }
}

// add-account-repo
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

class AddAccountRepository {
    
    async add(email, password) {
        const account = new AccountModel({ email, password })
        await account.save()

        return account
    }

    // Load
    async loadById(id) {
        //TODO: Fazer depois
    }

    async loadByEmail(email) {
        const account = await AccountModel.findOne({ email })

        if (account) {
            return account
        }
        return null
    }

    async loadByEmailAndPassword(email, password) {
        return null
    }


    // Update
    async updatePassword(id, password) {
        //TODO: Fazer depois

        return null
    }
    
    async updateEmail(id, email) {
        //TODO: Fazer depois

        return null
    }

    async updateName(id, name) {
        //TODO: Fazer depois

        return null
    }
}

// // account-model
// class AccountModel {
//     constructor(props) {
//         this.email = props.email
//         this.password = props.password

//         this.name = props.name

//         this.createdAt = props.createdAt
//         this.updatedAt = props.updatedAt
//     this.id = props.id
//     }
//     static async findOne(query) {
//         const account = await Account.findOne(query)

//         if (account) {
//             return new AccountModel(account)
//         }
//         return null
//     }
//     static async find(query) {
//         const accounts = await Account.find(query)

//         if (accounts) {
//             return accounts.map(account => new AccountModel(account))
//         }
//         return null
//     }
//     async save() {
//         const account = await Account.create(this)

//         if (account) {
//             return new AccountModel(account)
//         }
//         return null
//     }
//     async updateName(name) {
//         const account = await Account.updateName(this.id, name)

//         if (account) {
//             return new AccountModel(account)
//         }
//         return null
//     }
//     async updatePassword(password) {
//         const account = await Account.updatePassword(this.id, password)

//         if (account) {
//             return new AccountModel(account)
//         }
//         return null
//     }
//     async delete() {
//         const account = await Account.delete(this.id)

//         if (account) {
//             return new AccountModel(account)
//         }
//         return null
//     }
// }