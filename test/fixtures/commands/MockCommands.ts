import * as Decorators from "../../../scripts/commands/CommandDecorators";
import * as Authentication from "../../../scripts/constants/Authentication";
import * as Transport from "../../../scripts/constants/Transport";

@Decorators.Type("DefaultCommand")
class DefaultCommand {
    public foo:string = "bar";
}

@Decorators.Type("EndpointCommand")
@Decorators.Endpoint("/foo")
@Decorators.Transport(Transport.HTTP_Post)
class EndpointCommand {
    public foo:string = "bar";
}

@Decorators.Type("TransportCommand")
@Decorators.Transport(Transport.WebSocket)
class TransportCommand {
    public foo:string = "bar";
}

@Decorators.Type("AuthenticationCommand")
@Decorators.Authentication(Authentication.Basic)
class AuthenticationCommand {
    public foo:string = "bar";
}

class UnnamedCommand {
    public foo:string = "bar";
}

export {DefaultCommand}
export {EndpointCommand}
export {TransportCommand}
export {AuthenticationCommand}
export {UnnamedCommand}