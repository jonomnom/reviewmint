import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  RequestMade,
  ResponseReceived,
  skillset
} from "../generated/Contract/Contract"

export function createRequestMadeEvent(
  requestId: BigInt,
  user_address: string
): RequestMade {
  let requestMadeEvent = changetype<RequestMade>(newMockEvent())

  requestMadeEvent.parameters = new Array()

  requestMadeEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  requestMadeEvent.parameters.push(
    new ethereum.EventParam(
      "user_address",
      ethereum.Value.fromString(user_address)
    )
  )

  return requestMadeEvent
}

export function createResponseReceivedEvent(
  requestId: BigInt,
  ENScount: BigInt
): ResponseReceived {
  let responseReceivedEvent = changetype<ResponseReceived>(newMockEvent())

  responseReceivedEvent.parameters = new Array()

  responseReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  responseReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "ENScount",
      ethereum.Value.fromSignedBigInt(ENScount)
    )
  )

  return responseReceivedEvent
}

export function createskillsetEvent(
  param0: Address,
  param1: string,
  param2: string,
  param3: string,
  param4: string,
  param5: string
): skillset {
  let skillsetEvent = changetype<skillset>(newMockEvent())

  skillsetEvent.parameters = new Array()

  skillsetEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromAddress(param0))
  )
  skillsetEvent.parameters.push(
    new ethereum.EventParam("param1", ethereum.Value.fromString(param1))
  )
  skillsetEvent.parameters.push(
    new ethereum.EventParam("param2", ethereum.Value.fromString(param2))
  )
  skillsetEvent.parameters.push(
    new ethereum.EventParam("param3", ethereum.Value.fromString(param3))
  )
  skillsetEvent.parameters.push(
    new ethereum.EventParam("param4", ethereum.Value.fromString(param4))
  )
  skillsetEvent.parameters.push(
    new ethereum.EventParam("param5", ethereum.Value.fromString(param5))
  )

  return skillsetEvent
}
