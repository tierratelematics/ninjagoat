import Command from "../../../scripts/commands/Command";
import * as Decorators from "../../../scripts/commands/CommandDecorators";
import Transport from "../../../scripts/constants/Transport";
import Authentication from "../../../scripts/constants/Authentication";

class DefaultCommand extends Command {
    public foo:string = "bar";
}

@Decorators.Endpoint("/foo")
class EndpointCommand extends Command {
    public foo:string = "bar";
}

@Decorators.Transport(Transport.HTTP_POST)
class TransportCommand extends Command {
    public foo:string = "bar";
}

@Decorators.Authentication(Authentication.BEARER)
class AuthenticationCommand extends Command {
    public foo:string = "bar";
}

export {DefaultCommand}
export {EndpointCommand}
export {TransportCommand}
export {AuthenticationCommand}