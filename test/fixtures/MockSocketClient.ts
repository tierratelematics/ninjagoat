class MockSocketClient implements SocketIOClient.Socket {

    io:SocketIOClient.Manager;
    nsp:string;
    id:string;
    connected:boolean;
    disconnected:boolean;

    open():SocketIOClient.Socket {
        return undefined;
    }

    connect():SocketIOClient.Socket {
        return undefined;
    }

    send(args:any):SocketIOClient.Socket {
        return undefined;
    }

    emit(event:string, args:any):SocketIOClient.Socket {
        return undefined;
    }

    close():SocketIOClient.Socket {
        return undefined;
    }

    disconnect():SocketIOClient.Socket {
        return undefined;
    }

    compress(compress:boolean):SocketIOClient.Socket {
        return undefined;
    }

    on(event:string, fn:Function):SocketIOClient.Emitter {
        return undefined;
    }

    addEventListener(event:string, fn:Function):SocketIOClient.Emitter {
        return undefined;
    }

    once(event:string, fn:Function):SocketIOClient.Emitter {
        return undefined;
    }

    off(event:string, fn?:Function):SocketIOClient.Emitter {
        return undefined;
    }

    removeListener(event:string, fn?:Function):SocketIOClient.Emitter {
        return undefined;
    }

    removeEventListener(event:string, fn?:Function):SocketIOClient.Emitter {
        return undefined;
    }

    removeAllListeners():SocketIOClient.Emitter {
        return undefined;
    }

    listeners(event:string):Function[] {
        return undefined;
    }

    hasListeners(event:string):boolean {
        return undefined;
    }

}

export default MockSocketClient