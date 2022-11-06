import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  RequestMade,
  ResponseReceived,
  skillset
} from "../generated/Contract/Contract"
import { ExampleEntity, Skills } from "../generated/schema"
export function handleRequestMade(event: RequestMade): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.requestId = event.params.requestId
  entity.user_address = event.params.user_address

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.hasSetSkills(...)
  // - contract.isVerified(...)
  // - contract.skillName1(...)
  // - contract.skillName2(...)
  // - contract.skillName3(...)
  // - contract.skillName4(...)
  // - contract.skillName5(...)
  // - contract.skillRating1(...)
  // - contract.skillRating2(...)
  // - contract.skillRating3(...)
  // - contract.skillRating4(...)
  // - contract.skillRating5(...)
  // - contract.skillRatingnumber1(...)
  // - contract.skillRatingnumber2(...)
  // - contract.skillRatingnumber3(...)
  // - contract.skillRatingnumber4(...)
  // - contract.skillRatingnumber5(...)
}

export function handleResponseReceived(event: ResponseReceived): void {}

export function handleskillset(event: skillset): void {
  _getOrCreateSkill(event.params.param1, event.params.param0.toHexString())
  _getOrCreateSkill(event.params.param2, event.params.param0.toHexString())
  _getOrCreateSkill(event.params.param3, event.params.param0.toHexString())
  _getOrCreateSkill(event.params.param4, event.params.param0.toHexString())
  _getOrCreateSkill(event.params.param5, event.params.param0.toHexString())
}

export function _getOrCreateSkill(skillName: string, account: string) : Skills {
  let id = skillName;
  let entity = Skills.load(id);
  if (entity == null) {
    entity = new Skills(id)
  }
  entity.account = account;
  entity.skill = skillName;
  
  return entity
}
