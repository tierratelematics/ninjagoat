import Command from "../../../scripts/commands/Command";
import * as Decorators from "../../../scripts/commands/CommandDecorators";
import * as Authentication from "../../../scripts/constants/Authentication";
import * as Transport from "../../../scripts/constants/Transport";

class DefaultCommand implements Command {
    public foo:string = "bar";
}

@Decorators.Endpoint("/foo")
@Decorators.Transport(Transport.HTTP_Post)
class EndpointCommand implements Command {
    public foo:string = "bar";
}

@Decorators.Transport(Transport.WebSocket)
class TransportCommand implements Command {
    public foo:string = "bar";
}

@Decorators.Authentication(Authentication.Basic)
class AuthenticationCommand implements Command {
    public foo:string = "bar";
}

export {DefaultCommand}
export {EndpointCommand}
export {TransportCommand}
export {AuthenticationCommand}