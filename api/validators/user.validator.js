const createSchema = {
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

const updateSchema = {
    type: "object",
    required: ["firstName", "lastName", "email"],
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
        }
    },
    additionalProperties: false
}


module.exports = {
    create: createSchema,
    update: updateSchema
}
