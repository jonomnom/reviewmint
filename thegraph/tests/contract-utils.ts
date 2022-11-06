import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  RequestMade,
  ResponseReceived,
  ReviewAdded,
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

export function createReviewAddedEvent(
  reviewer: Address,
  reviewee: Address,
  skillName: string,
  rating: BigInt,
  review: string
): ReviewAdded {
  let reviewAddedEvent = changetype<ReviewAdded>(newMockEvent())

  reviewAddedEvent.parameters = new Array()

  reviewAddedEvent.parameters.push(
    new ethereum.EventParam("reviewer", ethereum.Value.fromAddress(reviewer))
  )
  reviewAddedEvent.parameters.push(
    new ethereum.EventParam("reviewee", ethereum.Value.fromAddress(reviewee))
  )
  reviewAddedEvent.parameters.push(
    new ethereum.EventParam("skillName", ethereum.Value.fromString(skillName))
  )
  reviewAddedEvent.parameters.push(
    new ethereum.EventParam("rating", ethereum.Value.fromUnsignedBigInt(rating))
  )
  reviewAddedEvent.parameters.push(
    new ethereum.EventParam("review", ethereum.Value.fromString(review))
  )

  return reviewAddedEvent
}

export function createskillsetEvent(
  a: Address,
  p1: string,
  p2: string,
  p3: string,
  p4: string
): skillset {
  let skillsetEvent = changetype<skillset>(newMockEvent())

  skillsetEvent.parameters = new Array()

  skillsetEvent.parameters.push(
    new ethereum.EventParam("a", ethereum.Value.fromAddress(a))
  )
  skillsetEvent.parameters.push(
    new ethereum.EventParam("p1", ethereum.Value.fromString(p1))
  )
  skillsetEvent.parameters.push(
    new ethereum.EventParam("p2", ethereum.Value.fromString(p2))
  )
  skillsetEvent.parameters.push(
    new ethereum.EventParam("p3", ethereum.Value.fromString(p3))
  )
  skillsetEvent.parameters.push(
    new ethereum.EventParam("p4", ethereum.Value.fromString(p4))
  )

  return skillsetEvent
}
