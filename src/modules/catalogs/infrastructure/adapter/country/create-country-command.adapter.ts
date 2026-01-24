import { CreateCountryCommand } from "@/modules/catalogs/application/country/commands/create-country/create-country.command";
import { CreateCountryHandler } from "@/modules/catalogs/application/country/commands/create-country/create-country.handler";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

@CommandHandler(CreateCountryCommand)
export class CreateCountryCommandAdapter implements ICommandHandler<CreateCountryCommand> {
    constructor(private readonly handler: CreateCountryHandler){}
    async execute(command: CreateCountryCommand) : Promise<void> {
        return this.handler.execute(command);
    }
}