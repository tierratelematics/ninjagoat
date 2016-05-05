import Command from "../../../scripts/commands/Command";
import * as Decorators from "../../../scripts/commands/CommandDecorators";
import Transport from "../../../scripts/constants/Transport";
import Authentication from "../../../scripts/constants/Authentication";

class DefaultCommand extends Command {
    public foo:string = "bar";
}

@Decorators.Endpoint("/foo")
@Decorators.Transport(Transport.HTTP_Post)
class EndpointCommand extends Command {
    public foo:string = "bar";
}

@Decorators.Transport(Transport.WebSocket)
class TransportCommand extends Command {
    public foo:string = "bar";
}

@Decorators.Authentication(Authentication.Basic)
class AuthenticationCommand extends Command {
    public foo:string = "bar";
}

export {DefaultCommand}
export {EndpointCommand}
export {TransportCommand}
export {AuthenticationCommand}