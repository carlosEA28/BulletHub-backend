export const badRequest = (
    body: Error | object
): { statusCode: 400; body: Error | object } => {
    return {
        statusCode: 400,
        body,
    };
};

export const created = (
    body: object | null
): { statusCode: 201; body: object | null } => {
    return {
        statusCode: 201,
        body,
    };
};

export const serverError = (
    body: Error | string
): { statusCode: 500; body: Error | string } => {
    return {
        statusCode: 500,
        body,
    };
};

export const ok = (
    body: object | string | number
): { statusCode: 200; body: object | string | number } => {
    return {
        statusCode: 200,
        body,
    };
};

export const noContent = (): { statusCode: 204; body: null } => {
    return {
        statusCode: 204,
        body: null,
    };
};

export const unauthorized = (
    body: object | string
): { statusCode: 401; body: object | string } => {
    return {
        statusCode: 401,
        body,
    };
};

export const notFound = (
    body: object | string = { message: "Not Found" }
): { statusCode: 404; body: object | string } => {
    return {
        statusCode: 404,
        body,
    };
};
