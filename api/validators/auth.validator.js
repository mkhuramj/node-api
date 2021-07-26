const registerSchema = {
    type: "object",
    required: ["firstName", "lastName", "email", "password", "confirmPassword"],
    properties: {
        firstName: {
            type: "string",
            minLength: 3
        },
        lastName: {
            type: "string",
            minLength: 3
        },
        email: {
            type: "string",
            minLength: 7
        },
        password: {
            type: "string",
            minLength: 6
        },
        confirmPassword: {
            type: "string",
            minLength: 6
        }
    },
    additionalProperties: false
}


const loginSchema = {
    type: "object",
    required: ['email', 'password'],
    properties: {
        email: {
            type: "string",
            minLength: 7
        },
        password: {
            type: "string",
            minLength: 6
        }
    }
}


module.exports = {
    register: registerSchema,
    login: loginSchema
}
