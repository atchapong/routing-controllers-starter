import jwtData from "jsonwebtoken"
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "@config";
import { DataStoredInToken, RequestWithUser } from "@interfaces/auth.interface";

export default async (socket, next) => {
    try {
    if (socket.handshake.headers && socket.handshake.headers.authorization) {
        var parts = socket.handshake.headers.authorization.split(' ');
        var credentials = parts[1];
        const decoded = (await verify(credentials, SECRET_KEY)) as DataStoredInToken;
        socket.request.user = decoded._id
        next()
    } else {
        next(new Error('Authentication error'));
    }
} catch (err) {
    next(err);
}

    // if (socket.user.payload && socket.user.payload.email != undefined) {
    //     next()
    // } else {
    //     next(new Error('invalid token'));
    // }
}